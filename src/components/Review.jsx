import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
// import { IoIosArrowUp } from 'react-icons/io';
// import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GoPencil } from 'react-icons/go';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import reviewApi from 'api/reviewApi';

const Review = () => {
  const [gradeStar, setGradeStar] = useState(0);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      const { data: reviewData } = await reviewApi.get();
      setReviews(reviewData);
    };

    loadReviews();
  }, []);

  console.log(reviews);

  //이건 Star라는 컴포넌트
  // 생성된 Star 컴포넌트가 FaStar 컴포넌트를 만들어낸다
  //생성된 별 아이콘을 클릭했을때 handleStarIconClick가 실행되고 그 클릭된 별아이콘의 인덱스값으로 gradeStar가 set됨
  const Star = ({ selected = false, handleStarIconClick }) => {
    return <FaStar color={selected ? 'gold' : 'grey'} onClick={handleStarIconClick} />;
  };

  const handleDeleteReview = () => {
    if (window.confirm('리뷰를 삭제하시겠습니끼?')) {
    } else {
      alert('삭제취소');
    }
  };

  const handleModalClose = () => {
    if (isOptionMenuOpen) {
      setIsOptionMenuOpen(false);
    }
  };

  const MakeStar = ({ grade }) => {
    const starArray = [...Array(5)].fill(false);
    for (let i = 0; i < grade; i++) {
      starArray[i] = true;
    }
    const stars = starArray.map((i) => <FaStar color={starArray[i - 1] ? 'gold' : 'grey'} />);
    return stars;
  };

  return (
    <StReviewTapContainer>
      <StReviewFormContainer>
        <StReviewTextArea placeholder="리뷰를 작성해주세요." />
        <StDropdownFormButtonWrap>
          <StGradeDropdown>
            <span style={{ marginRight: '3px' }}>평점</span>
            <StStarContainer>
              {/* Star라는 컴포넌트 5개가 만들어짐 */}
              {/* selected 프롭스는 gradeStar가 index보다 크면  true가 됨 */}
              {/* handleStarIconClick 함수 프롭스도 넘겨줌 */}
              {[1, 2, 3, 4, 5].map((index) => {
                return (
                  <Star key={index} selected={gradeStar >= index} handleStarIconClick={() => setGradeStar(index)} />
                );
              })}
              {/* <FaStar color={selected ? 'gold' : 'grey'} onClick={handleStarIconClick} />; */}
            </StStarContainer>
          </StGradeDropdown>

          <StReviewFormBottom>등록</StReviewFormBottom>
        </StDropdownFormButtonWrap>
      </StReviewFormContainer>

      {/* 리뷰댓글 */}
      {reviews.map((item) => {
        return (
          <StReviewContainer onClick={handleModalClose}>
            <StReviewInfoWrap>
              <StReviewWriterProfileImage>르</StReviewWriterProfileImage>
              <StReviewProfileWrap>
                <div>
                  <div style={{ display: 'flex', marginBottom: '3px' }}>
                    <StReviewWriterNicnkname>{item.nickname}</StReviewWriterNicnkname>
                    <StReviewGrade>
                      {/* todo: item.grade 만큼 배열을 만들고 그배열길이 만큼 노란별 만들고, 5-배열길이 만큼 회색별생성 */}
                      <MakeStar grade={item.grade} />
                    </StReviewGrade>
                  </div>
                  <StReviewCreationDate>{item.createdAt}</StReviewCreationDate>
                </div>

                {/* 점점점 메뉴 버튼 */}
                <StHiOutlineDotsVertical onClick={() => setIsOptionMenuOpen(true)} />
              </StReviewProfileWrap>
            </StReviewInfoWrap>
            <StOptionsMenuModal $isOptionMenuOpen={isOptionMenuOpen}>
              <li style={{ display: 'flex', padding: '10px' }}>
                <GoPencil style={{ marginRight: '3px' }} />
                수정
              </li>
              <li style={{ display: 'flex', padding: '10px' }} onClick={handleDeleteReview}>
                <FaRegTrashAlt style={{ marginRight: '3px' }} />
                삭제
              </li>
            </StOptionsMenuModal>
            <StReviewContent>{item.content} </StReviewContent>
          </StReviewContainer>
        );
      })}
    </StReviewTapContainer>
  );
};

export const StStarIcon = styled(FaStar)`
  border: 1px solid ${colors.starColor};
`;

export const StReviewTapContainer = styled.div`
  width: 335px;
  background-color: seashell; //임시
  margin: 0 auto;
  color: ${colors.subColor};
  padding-bottom: 20px;
  position: relative;
`;

export const StReviewFormContainer = styled.div`
  width: 100%;
  border: 1px solid green;
  margin-bottom: 20px;
  position: relative;
`;

export const StReviewTextArea = styled.textarea`
  width: 100%;
  height: 92px;
  border-radius: 10px;
  padding: 10px;
`;

export const StDropdownFormButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StGradeDropdown = styled.div`
  display: flex;
  font-size: 14px;
`;

export const StReviewFormBottom = styled.div`
  width: 60px;
  height: 30px;
  background-color: ${colors.mainColor};
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
`;

export const StReviewContainer = styled.div`
  min-height: 140px;
  width: 100%;
  display: flex;
  justify-content: center;
  //리뷰 하나면 보터 탑바텀 둘다, 하나이상이면 탑만
  border-top: 1px solid ${colors.subColor};
  border-bottom: 1px solid ${colors.subColor}; //조건부 렌더링 필
  flex-direction: column;
  position: relative;
`;

export const StReviewInfoWrap = styled.div`
  /* width: 95%; */
  display: flex;
  margin-bottom: 10px;
  align-items: center;
`;

export const StReviewWriterProfileImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c8c4f5; //TOOD: 랜덤생성
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
`;

export const StReviewProfileWrap = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StReviewWriterNicnkname = styled.span`
  font-size: 16px;
  margin-right: 5px;
`;

export const StHiOutlineDotsVertical = styled(HiOutlineDotsVertical)`
  width: 22px;
  height: 22px;
  cursor: pointer;
`;

export const StOptionsMenuModal = styled.ul`
  z-index: 999;
  width: 65px;
  height: 65px;
  font-size: 12px;

  display: ${(props) => (props.$isOptionMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 25px;
  align-items: center;
  justify-content: center;
  right: 22px;
  background-color: white;
  box-shadow: 2px 1px 6.6px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
`;

// export const StModalBackground = styled.div`
//   background-color: transparent;
//   z-index: 999;
//   width: 335px;
//   height: 100%;
//   margin-top: 800px;
//   position: fixed;
//   display: ${(props) => (props.$isOptionMenuOpen ? 'block' : 'none')};
// `;

export const StGradeModal = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 5px;
  font-size: 12px;

  position: absolute;
  width: 105px;
  height: 104px;
  z-index: 999;
  top: 110px;
  left: 25px;

  background: white;
  box-shadow: 2px 1px 6.6px rgba(0, 0, 0, 0.13);
  border-radius: 10px;
`;

export const StReviewGrade = styled.div``;

export const StReviewCreationDate = styled.span`
  font-size: 13px;
  margin-left: 1px;
  color: ${colors.mainTextColor};
`;

export const StReviewContent = styled.div`
  line-height: 23px;
  font-size: 14px;
`;

export const StStarContainer = styled.div`
  display: flex;
`;

export default Review;

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
// import { IoIosArrowUp } from 'react-icons/io';
// import { IoIosArrowDown } from 'react-icons/io';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GoPencil } from 'react-icons/go';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

const Review = () => {
  const [gradeStar, setGradeStar] = useState(0);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const modalBg = useRef();

  //이건 Star라는 컴포넌트
  // 생성된 Star 컴포넌트가 FaStar 컴포넌트를 만들어낸다
  //생성된 별 아이콘을 클릭했을때 handleStarIconClick가 실행되고 그 클릭된 별아이콘의 인덱스값으로 gradeStar가 set됨
  const Star = ({ selected = false, handleStarIconClick = (f) => f }) => {
    return <FaStar color={selected ? 'gold' : 'grey'} onClick={handleStarIconClick} />;
  };

  const handleOptionMenuModalClose = (e) => {
    //currenteveent = 리뷰전체컨테이너
    //target = 클릭한 요소
    console.log('리뷰컨테이너 ref의 current', modalBg.current, '클릭이벤트 target', e.target, e.currentTarget);
    if (modalBg.current === e.target) {
      console.log('first2');
      setIsOptionMenuOpen(false);
    }
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
      <StReviewContainer>
        <StModalBackground onClick={handleOptionMenuModalClose} ref={modalBg} $isOptionMenuOpen={isOptionMenuOpen} />
        <StReviewInfoWrap>
          <StReviewWriterProfileImage>르</StReviewWriterProfileImage>
          <StReviewProfileWrap>
            <div>
              <div style={{ display: 'flex', marginBottom: '3px' }}>
                <StReviewWriterNicnkname>르탄이..</StReviewWriterNicnkname>
                <StReviewGrade>
                  <FaStar />
                </StReviewGrade>
                {/* 별 개수에 따라 회색별 조건부렌더링? */}
              </div>
              <StReviewCreationDate>24.02.23</StReviewCreationDate>
            </div>

            {/* 점점점 메뉴 버튼 */}
            <StHiOutlineDotsVertical onClick={() => setIsOptionMenuOpen(true)} />
          </StReviewProfileWrap>
        </StReviewInfoWrap>
        <StOptionsMenuModal $isOptionMenuOpen={isOptionMenuOpen}>
          <li style={{ display: 'flex' }}>
            <GoPencil style={{ marginRight: '3px' }} />
            수정
          </li>
          <li style={{ display: 'flex' }}>
            <FaRegTrashAlt style={{ marginRight: '3px' }} />
            삭제
          </li>
        </StOptionsMenuModal>
        <StReviewContent>
          신테마가 대전에 생겨서 와봤는데 재밌네요! 직원분들도 친절하시고 설명도 너무 좋았어요~
        </StReviewContent>
      </StReviewContainer>
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
  padding: 10px;
  display: ${(props) => (props.$isOptionMenuOpen ? 'flex' : 'none')};
  flex-direction: column;
  gap: 15px;
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

export const StModalBackground = styled.div`
  background-color: transparent;
  z-index: 999;
  width: 335px;
  height: 100%;
  margin-top: 800px;
  position: fixed;
  display: ${(props) => (props.$isOptionMenuOpen ? 'block' : 'none')};
`;

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

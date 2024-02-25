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
import { AiOutlineExclamationCircle } from 'react-icons/ai';

const Review = () => {
  const [gradeStar, setGradeStar] = useState(0);
  const [isOptionMenuOpen, setIsOptionMenuOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewContent, setReviewContent] = useState('');
  const textArea = useRef();
  const [isGradeInvalid, setIsGradeinvalid] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [modifiedReviewContent, setModifiedReviewContent] = useState();

  //#region
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const day = week[new Date().getDay()];

  const creationDate = [year, month, date].join('.') + ' ' + day;
  //#endregion

  useEffect(() => {
    const loadReviews = async () => {
      const { data: reviewData } = await reviewApi.get();
      setReviews(reviewData);
    };

    loadReviews();
  }, []);

  //이건 Star라는 컴포넌트
  // 생성된 Star 컴포넌트가 FaStar 컴포넌트를 만들어낸다
  //생성된 별 아이콘을 클릭했을때 handleStarIconClick가 실행되고 그 클릭된 별아이콘의 인덱스값으로 gradeStar가 set됨
  const Star = ({ selected = false, handleStarIconClick }) => {
    return <FaStar color={selected ? 'gold' : 'grey'} onClick={handleStarIconClick} />;
  };

  const handleStarIconClick = (idx) => {
    setGradeStar(idx);
    setIsGradeinvalid(false);
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
    // 별 5개 생성
    const stars = starArray.map((value, idx) => <FaStar key={idx} color={value ? 'gold' : 'grey'} />);
    return stars;
  };

  const handleReviewContent = (e) => {
    setReviewContent(e.target.value);
  };

  // 리뷰 등록 ----------------------------------
  const handleAddReviewButtonClick = async () => {
    if (!reviewContent.trim()) {
      alert('리뷰를 작성해주세요.');
      textArea.current.focus();
      return;
    }
    if (gradeStar === 0) {
      alert('별점을 선택해주세요.');
      setIsGradeinvalid(true);
      return;
    }

    const newRivew = {
      id: crypto.randomUUID(),
      userId: '1', //스토어에서 받아온 아이디, 닉네임
      nickname: '오리',
      content: reviewContent,
      grade: gradeStar,
      createdAt: creationDate
    };

    try {
      await reviewApi.post('', newRivew);
      alert('리뷰가 등록되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  // 리뷰 삭제 ----------------------------------
  const handleDeleteReviewButtonClick = async (id) => {
    if (window.confirm('리뷰를 삭제하시겠습니끼?')) {
      try {
        await reviewApi.delete(`/${id}`);
        alert('리뷰가 삭제되었습니다.');
      } catch (error) {}
    } else {
    }
  };

  const [reviewId, setReviewId] = useState('');
  const [modifiedGradeStar, setModifiedGradeStar] = useState(0);

  // 리뷰 수정 클릭 ----------------------------------
  const handleModifyReviewButtonClick = async (userId, reviewId, content, grade) => {
    textArea.current.focus();
    setIsModifying(true);
    setReviewContent(content);
    setModifiedReviewContent(content);
    setReviewId(reviewId);
    setGradeStar(grade);
    setModifiedGradeStar(grade);
  };

  // 리뷰 수정 완료
  const handleCompleteButtonClick = async () => {
    if (reviewContent === modifiedReviewContent && gradeStar === modifiedGradeStar) {
      alert('수정 된 내용이 없습니다.');
      return;
    }
    setModifiedReviewContent(reviewContent);
    const newContent = { content: reviewContent, grade: +gradeStar };

    try {
      await reviewApi.patch(`/${reviewId}`, newContent);
      alert('수정이 완료되었습니다.');
      setIsModifying(false);
      setReviewContent('');
      setGradeStar(0);
    } catch (error) {
      alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      console.log(error);
    }
  };

  // 리뷰 수정 취소
  const handleCancelButtonClick = async () => {
    if (window.confirm('수정을 취소하시겠습니까?')) {
      setReviewContent('');
      setIsModifying(false);
    }
    return;
  };

  const randomBrightColor = () => {
    const colorR = Math.floor(Math.random() * 128 + 128).toString(16);
    const colorG = Math.floor(Math.random() * 128 + 128).toString(16);
    const colorB = Math.floor(Math.random() * 128 + 128).toString(16);
    return `#${colorR + colorG + colorB}`;
  };

  return (
    <StReviewTapContainer>
      <StReviewFormContainer>
        <StReviewTextArea
          ref={textArea}
          value={reviewContent}
          onChange={handleReviewContent}
          placeholder="리뷰를 작성해주세요."
          maxLength={250}
          spellCheck={false}
        />
        <StFormButtonWrap>
          <StGradeWrap>
            <span style={{ marginRight: '3px' }}>평점</span>
            <StStarContainer style={{ marginRight: '3px' }}>
              {/* Star라는 컴포넌트 5개가 만들어짐 */}
              {/* selected 프롭스는 gradeStar가 index보다 크면  true가 됨 */}
              {/* handleStarIconClick 함수 프롭스도 넘겨줌 */}
              {[1, 2, 3, 4, 5].map((idx) => {
                return (
                  <Star key={idx} selected={gradeStar >= idx} handleStarIconClick={() => handleStarIconClick(idx)} />
                );
              })}
              {/* <FaStar color={selected ? 'gold' : 'grey'} onClick={handleStarIconClick} />; */}
            </StStarContainer>
            {isGradeInvalid && !isModifying && <AiOutlineExclamationCircle color={'red'} />}
          </StGradeWrap>
          <div style={{ display: 'flex', gap: '3px' }}>
            {!isModifying ? (
              <>
                <StReviewFormBottom onClick={handleAddReviewButtonClick}>등록</StReviewFormBottom>
              </>
            ) : (
              <>
                <StReviewFormBottom onClick={handleCompleteButtonClick}>완료</StReviewFormBottom>
                <StReviewFormBottom onClick={() => handleCancelButtonClick()}>취소</StReviewFormBottom>
              </>
            )}
          </div>
        </StFormButtonWrap>
      </StReviewFormContainer>

      {/* 리뷰댓글 */}
      {reviews?.map((item, idx) => {
        const randomColor = randomBrightColor();
        return (
          <StReviewContainer key={item.id} $reviewLength={reviews.length} onClick={handleModalClose}>
            <StReviewInfoWrap>
              <StReviewWriterProfileImage $randomColor={randomColor}>{item.nickname[0]}</StReviewWriterProfileImage>
              <StReviewProfileWrap>
                <div>
                  <div style={{ display: 'flex', marginBottom: '3px' }}>
                    <StReviewWriterNicnkname>{item.nickname}</StReviewWriterNicnkname>
                    <StReviewGrade key={item.id}>
                      {/* 별점 */}
                      <MakeStar grade={item.grade} />
                    </StReviewGrade>
                  </div>
                  <StReviewCreationDate>{item.createdAt}</StReviewCreationDate>
                </div>

                {/* 점점점 메뉴 버튼 */}
                {/* //리덕스에서 받아온 유저 아이디와 인자로받아온 userId가 같아야만 메뉴 출력 */}
                <StHiOutlineDotsVertical onClick={() => setIsOptionMenuOpen(true)} />
              </StReviewProfileWrap>
            </StReviewInfoWrap>
            <StOptionsMenuModal $isOptionMenuOpen={isOptionMenuOpen}>
              {/* 수정 */}
              <li
                onClick={() => handleModifyReviewButtonClick(item.userId, item.id, item.content, item.grade)}
                style={{ display: 'flex', padding: '10px' }}
              >
                <GoPencil style={{ marginRight: '3px' }} />
                수정
              </li>

              {/* 삭제 */}
              <li onClick={() => handleDeleteReviewButtonClick(item.id)} style={{ display: 'flex', padding: '10px' }}>
                <FaRegTrashAlt style={{ marginRight: '3px' }} />
                삭제
              </li>
            </StOptionsMenuModal>

            {/* 리뷰 내용 */}
            <StReviewContent>{item.content} </StReviewContent>
          </StReviewContainer>
        );
      })}
      <div style={{ margin: '0', height: '1px', backgroundColor: colors.subColor }}></div>
    </StReviewTapContainer>
  );
};

export const StStarIcon = styled(FaStar)`
  border: 1px solid ${colors.starColor};
`;

export const StReviewTapContainer = styled.div`
  width: 335px;
  background-color: white; //임시
  margin: 0 auto;
  color: ${colors.subColor};
  padding-bottom: 20px;
  position: relative;
  height: 430px; /* 높이를 설정하여 컴포넌트가 스크롤 가능하도록 함 */
  overflow-y: auto; /* 세로 스크롤을 활성화함 */
`;

export const StReviewFormContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  position: relative;
`;

export const StReviewTextArea = styled.textarea`
  width: 100%;
  height: 92px;
  border-radius: 10px;
  padding: 10px;
  resize: none;
`;

export const StFormButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StGradeWrap = styled.div`
  display: flex;
  font-size: 14px;
  height: fit-content;
  padding: 2px;
  border-radius: 5px;
`;

export const StReviewFormBottom = styled.div`
  width: 57px;
  height: 30px;
  background-color: ${colors.mainColor};
  color: white;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  transition: all 0.2s;
  margin-top: 3px;

  &:hover {
    background-color: #f54f26;
  }
`;

export const StReviewContainer = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${colors.subColor};
  border-bottom: ${(props) => (props.$reviewLength === 1 ? `1px solid ${colors.subColor}` : 'none')};
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
  /* background-color: ${(props) => props.$randomColor}; //TOOD: 랜덤생성 */
  background-color: #c4a6dd; //TOOD: 랜덤생성
  display: flex;
  line-height: 37px;
  justify-content: center;
  flex-shrink: 0;
  color: #494949;
  font-size: 15px;
  border: 1px solid ${colors.mainTextColor};
`;

export const StReviewProfileWrap = styled.div`
  margin-left: 7px;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const StReviewWriterNicnkname = styled.span`
  font-size: 14px;
  margin-right: 5px;
  font-weight: bold;
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

export const StReviewGrade = styled.div`
  font-size: 13px;
`;

export const StReviewCreationDate = styled.span`
  font-size: 13px;
  margin-left: 1px;
  color: ${colors.mainTextColor};
`;

export const StReviewContent = styled.div`
  line-height: 23px;
  font-size: 14px;
  padding: 0 5px;
`;

export const StStarContainer = styled.div`
  display: flex;
`;

export default Review;

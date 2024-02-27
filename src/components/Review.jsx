import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { GoPencil } from 'react-icons/go';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { instance, getReviews, addReview, modifyReview } from 'api/reviewApi';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, setReview } from '../redux/modules/reviewSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const Review = ({ selectedId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const reviews = useSelector((state) => state.reviewSlice.reviews);
  const userInfo = useSelector((state) => state.authSlice);
  const { isLoading, isError, data: reviews } = useQuery('reviews', getReviews);

  const textArea = useRef();
  const modalRef = useRef();
  const [gradeStar, setGradeStar] = useState(0);
  const [modifiedGradeStar, setModifiedGradeStar] = useState(0);
  const [reviewContent, setReviewContent] = useState('');
  const [modifiedReviewContent, setModifiedReviewContent] = useState();
  const [isGradeInvalid, setIsGradeinvalid] = useState(false);
  const [isModifying, setIsModifying] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const [clickedReviewId, setClickedReviewId] = useState(null);

  useEffect(() => {
    // const loadReviews = async () => {
    //   const { data: reviewData } = await instance.get('?_sort=-dateForOrder');
    dispatch(setReview(reviews));
    // };

    // loadReviews();
  }, [dispatch]);

  // 리액트 쿼리 관련 코드
  const queryClient = useQueryClient();
  const mutation = useMutation(addReview, {
    onSuccess: () => {
      //무엇을 불러왔던 것을 초기화할것인가 => useQuery에 이름으로 부여한 쿼리 키
      queryClient.invalidateQueries('reviews');
    }
  });

  const updateMutation = useMutation(modifyReview, {
    onSuccess: () => {
      queryClient.invalidateQueries('reviews');
      console.log('수정 성공');
    }
  });

  if (isLoading) {
    // 로딩중 짤 추가
    console.log('로딩중');
    return <div style={{ fontSize: '100px' }}>로딩중</div>;
  }

  if (isError) {
    alert('오류가 발생하였습니다. 잠시 후 다시 시도해주세요.');
    return;
  }

  const modificationCompleted = () => {
    setIsModifying(false);
    setReviewContent('');
    setGradeStar(0);
  };

  const handleCheckLogin = () => {
    if (!userInfo.userId) {
      if (window.confirm(`로그인 후 이용 가능합니다. \n로그인 페이지로 이동하시겠습니까?`)) {
        navigate('/login');
        return;
      } else {
        textArea.current.style.outline = 'none';
        return;
      }
    }
  };

  const setDate = (date) => {
    return date < 10 ? '0' + date : date.toString();
  };

  const validateAccess = (userId) => {
    if (userId === userInfo.userId) return true;
  };

  //이건 Star라는 컴포넌트
  // 생성된 Star 컴포넌트가 FaStar 컴포넌트를 만들어낸다
  //생성된 별 아이콘을 클릭했을때 handleStarIconClick가 실행되고 그 클릭된 별아이콘의 인덱스값으로 gradeStar가 set됨
  const EvaluateStar = ({ selected = false, handleStarIconClick }) => {
    return <FaStar size={16} color={selected ? colors.starColor : 'grey'} onClick={handleStarIconClick} />;
  };

  const handleStarIconClick = (idx) => {
    setGradeStar(idx);
    setIsGradeinvalid(false);
  };

  const MakeStar = ({ grade }) => {
    const starArray = [...Array(5)].fill(false);
    for (let i = 0; i < grade; i++) {
      starArray[i] = true;
    }
    // 별 5개 생성
    const stars = starArray.map((value, idx) => <FaStar key={idx} color={value ? colors.starColor : 'grey'} />);
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

    //#region
    const year = new Date().getFullYear();
    const month = setDate(new Date().getMonth() + 1);
    const date = setDate(new Date().getDate());
    const week = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const day = week[new Date().getDay()];
    const creationDate = [year, month, date].join('.') + ' ' + day;

    const dateForOrder = new Date().toISOString();
    //#endregion

    const randomBrightColor = () => {
      const colorR = Math.floor(Math.random() * 128 + 128).toString(16);
      const colorG = Math.floor(Math.random() * 128 + 128).toString(16);
      const colorB = Math.floor(Math.random() * 128 + 128).toString(16);
      return `#${colorR + colorG + colorB}`;
    };
    const profileAvatarColor = randomBrightColor();

    const newReview = {
      id: crypto.randomUUID(),
      userId: userInfo.userId,
      cafeId: selectedId,
      nickname: userInfo.nickname,
      content: reviewContent,
      grade: gradeStar,
      createdAt: creationDate,
      dateForOrder,
      profileAvatarColor
    };

    console.log(newReview);

    try {
      // await instance.post('', newReview);
      // dispatch(addReview(newReview));
      mutation.mutate(newReview);

      setReviewContent('');
      setGradeStar(0);
    } catch (error) {
      alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');

      console.log(error);
    }
  };

  // 리뷰 삭제 ----------------------------------
  const handleDeleteReviewButtonClick = async (reviewId, userId) => {
    if (!validateAccess(userId)) {
      alert('권한이 없습니다.');
      return;
    }
    if (window.confirm('리뷰를 삭제하시겠습니끼?')) {
      try {
        modificationCompleted();
        await instance.delete(`/${reviewId}`);
        dispatch(deleteReview(reviewId));
      } catch (error) {
        alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');

        console.log(error);
      }
    } else {
    }
  };

  // 리뷰 수정 클릭 ----------------------------------
  const handleModifyReviewButtonClick = async (userId, reviewId, content, grade) => {
    if (!validateAccess(userId)) {
      alert('권한이 없습니다.');
      return;
    }
    textArea.current.focus();
    setIsModifying(true);
    setReviewId(reviewId);
    setReviewContent(content);
    setModifiedReviewContent(content);
    setGradeStar(grade);
    setModifiedGradeStar(grade);
  };

  // 리뷰 수정 완료
  const handleCompleteButtonClick = async () => {
    if (reviewContent === modifiedReviewContent && gradeStar === modifiedGradeStar) {
      alert('수정 사항이 없습니다.');
      return;
    }
    setModifiedReviewContent(reviewContent);
    const newContent = { content: reviewContent, grade: gradeStar };
    console.log(newContent);

    try {
      // await instance.patch(`/${reviewId}`, newContent);
      // dispatch(modifyReview({ reviewId, newContent }));
      updateMutation.mutate({ reviewId, newContent });

      alert('수정이 완료되었습니다.');
      modificationCompleted();
    } catch (error) {
      alert('오류가 발생했습니다. 잠시후 다시 시도해주세요.');
      console.log(error);
    }
  };

  // 리뷰 수정 취소
  const handleCancelButtonClick = async () => {
    if (reviewContent === modifiedReviewContent && gradeStar === modifiedGradeStar) {
      modificationCompleted();
      return;
    }
    if (window.confirm('수정을 취소하시겠습니까?')) {
      modificationCompleted();
    }
    return;
  };

  const handleOptionButtonClick = (id) => {
    setClickedReviewId(id);
  };

  const handleModalClose = () => {
    if (modalRef.current) setClickedReviewId(null);
  };

  const filteredReviews = reviews?.filter((item) => item.cafeId === selectedId);

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
          onClick={handleCheckLogin}
          readOnly={!userInfo.userId}
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
                  <EvaluateStar
                    key={idx}
                    selected={gradeStar >= idx}
                    handleStarIconClick={() => handleStarIconClick(idx)}
                  />
                );
              })}
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
      {filteredReviews?.length === 0 && (
        <div style={{ fontSize: '14px', textAlign: 'center' }}>
          작성된 리뷰가 없습니다.
          <br />
          <br /> 첫 번째 리뷰를 남겨보세요!
        </div>
      )}
      {/* reviews.filter((item) => item.cafeId === reviews.cafeId) */}
      {/* 아니면 get으로 가져올때 search쿼리로 그 카페 리뷰만 가져오기 */}
      {filteredReviews.map((item, idx) => {
        return (
          <StReviewContainer key={item.id} onClick={handleModalClose} $reviewLength={reviews.length}>
            <StReviewInfoWrap>
              <StReviewWriterProfileImage style={{ backgroundColor: item.profileAvatarColor }}>
                {item.nickname[0]}
              </StReviewWriterProfileImage>

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

                {<StHiOutlineDotsVertical onClick={() => handleOptionButtonClick(item.id)} />}
              </StReviewProfileWrap>
            </StReviewInfoWrap>

            {/* 모달!!!!!!!!!!!!!--------- */}
            {clickedReviewId === item.id && (
              <StOptionsMenuModal ref={modalRef}>
                {/* 수정 */}
                <StListItem
                  onClick={() => handleModifyReviewButtonClick(item.userId, item.id, item.content, item.grade)}
                >
                  <GoPencil style={{ marginRight: '3px' }} />
                  수정
                </StListItem>

                {/* 삭제 */}
                <StListItem onClick={() => handleDeleteReviewButtonClick(item.id, item.userId)}>
                  <FaRegTrashAlt style={{ marginRight: '3px' }} />
                  삭제
                </StListItem>
              </StOptionsMenuModal>
            )}

            <StReviewContent>{item.content} </StReviewContent>
          </StReviewContainer>
        );
      })}
      <StBottomLine $reviewLength={filteredReviews.length} />
    </StReviewTapContainer>
  );
};

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
  align-items: center;
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
    background-color: ${colors.buttonHoverColor};
  }
`;

export const StReviewContainer = styled.div`
  padding: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${colors.subColor};
  /* border-bottom: ${(props) => (props.$reviewLength === 1 ? `1px solid ${colors.subColor}` : 'none')}; */
  flex-direction: column;
  position: relative;
`;

export const StReviewContent = styled.div`
  line-height: 23px;
  font-size: 14px;
  padding: 0 5px;
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
  display: flex;
  line-height: 37px;
  justify-content: center;
  flex-shrink: 0;
  color: #494949;
  font-size: 15px;
  border: 1px solid ${colors.mainTextColor};
  background-color: ${(props) => (props.$randomColor ? props.$randomColor : 'none')};
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
  height: 70px;
  font-size: 12px;

  display: flex;
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

export const StListItem = styled.li`
  display: flex;
  padding: 10px;
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

export const StStarContainer = styled.div`
  display: flex;
`;

export const StStarIcon = styled(FaStar)`
  border: 1px solid ${colors.starColor};
`;

export const StBottomLine = styled.div`
  display: ${(props) => (props.$reviewLength === 0 ? 'none' : 'block')};
  height: 1px;
  background-color: ${colors.subColor};
`;

export default Review;

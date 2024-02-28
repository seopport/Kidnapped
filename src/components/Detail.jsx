import { MdLocationOn } from 'react-icons/md';
import { MdLocalPhone } from 'react-icons/md';
import { RiGlobalLine } from 'react-icons/ri';
import styled from 'styled-components';
import React, { useDebugValue, useEffect, useState } from 'react';
import Review from './Review';
import { FaBookmark } from 'react-icons/fa';
import colors from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../redux/modules/userSlice';
import axios from 'axios';
import { addScrap, deleteScrap } from '../redux/modules/scrapSlice';
import { Link } from 'react-router-dom';

const Detail = ({ markers, selectedId }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authSlice);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [serverScrapId, SetServerScrapId] = useState(null); // 스크랩 서버에서 받은 고유 아이디
  const [serverUserId, SetServerUserId] = useState(null); // 유저 서버에서 받은 고유 아이디

  // 스크랩 토글 ---------------------------------
  const handleBookmarkClick = () => {
    setIsBookmarked((prevIsBookmarked) => {
      console.log(!prevIsBookmarked);
      return !prevIsBookmarked;
    });
  };

  useEffect(() => {
    if (isBookmarked) {
      addScrapAndUser();
    } else {
      if (serverScrapId) {
        // serverId가 존재할 때만 삭제 요청 보내기
        deleteScrapAndUser();
      }
    }
  }, [isBookmarked]);

  // 유저 추가 스크랩 추가----------------------------------
  const addScrapAndUser = async () => {
    try {
      // 유저 추가
      const userResponse = await axios.post('http://localhost:4000/users', { userId });
      dispatch(addUser({ userId }));

      // 서버에서 생성된 고유한 유저 ID 가져오기
      const serverUserId = userResponse.data.id;
      SetServerUserId(serverUserId);
      console.log(serverUserId);

      // 스크랩 추가
      const newScrap = {
        userId: userId,
        scrapId: selectedId
      };
      const scrapResponse = await axios.post('http://localhost:4000/scraps', newScrap);
      dispatch(addScrap(newScrap));

      // 서버에서 생성된 고유한 스크랩 ID 가져오기
      const serverScrapId = scrapResponse.data.id;
      SetServerScrapId(serverScrapId);
      console.log(serverScrapId);
    } catch (error) {
      alert('오류가 발생했습니다');
      console.log(error);
    }
  };

  // 유저 삭제 스크랩 삭제----------------------------------
  const deleteScrapAndUser = async () => {
    // 유저 삭제
    try {
      await axios.delete(`http://localhost:4000/users/${serverUserId}`);
      dispatch(deleteUser(userId));
      // 스크랩 삭제
      await axios.delete(`http://localhost:4000/scraps/${serverScrapId}`);
      dispatch(deleteScrap());
    } catch (error) {
      console.log('error', error);
    }
  };

  const selectedMarker = markers.find((marker) => marker.id === selectedId);

  const [toggleMenu, setToggleMenu] = useState(true);

  const toggleMenuHandler = (param) => {
    setToggleMenu(param);
  };

  return (
    <>
      <FaBookmark onClick={handleBookmarkClick} color={isBookmarked ? `${colors.starColor}` : 'white'}></FaBookmark>
      <StInfoContainer>
        <StImageBox>
          <img src="https://www.datanet.co.kr/news/photo/201706/111912_40939_1141.jpg" alt="방탈출 카페 사진" />
        </StImageBox>
        {/* {selectedMarker && <div>{selectedMarker.id}</div>} */}
        <StPlaceName> {selectedMarker.placeName}</StPlaceName>
        <ButtonBox>
          <button onClick={() => toggleMenuHandler(true)}>정보</button>
          <button onClick={() => toggleMenuHandler(false)}>리뷰</button>
        </ButtonBox>
        <>
          {toggleMenu ? (
            <>
              <StDetailInfoBox>
                <MdLocationOn />
                {selectedMarker.roadAddress}
              </StDetailInfoBox>
              <StDetailInfoBox>
                <MdLocalPhone />
                {selectedMarker.phoneNumber}
              </StDetailInfoBox>
              <StDetailInfoBox>
                <RiGlobalLine />
                <StLink to={selectedMarker.placeUrl}> {selectedMarker.placeUrl}</StLink>
              </StDetailInfoBox>
            </>
          ) : (
            <Review />
          )}
        </>
      </StInfoContainer>
    </>
  );
};
export default Detail;

const StInfoContainer = styled.div`
  align-items: center;
  background-color: white;
  height: 100%;
  padding-top: 10px;
`;

const StImageBox = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  & img {
    border-radius: 10px;
    width: 97%;
    height: 100%;
    object-fit: cover;
  }
`;
const StPlaceName = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  & button {
    background-color: white;
    text-decoration: none;
    border: none;
    cursor: pointer;
    color: #4f4f4f;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
  }
`;
const StDetailInfoBox = styled.div`
  margin-top: 15px;
  margin-left: 30px;
  color: #8b8b8b;
`;
const StLink = styled(Link)`
  color: #175bb3;
`;

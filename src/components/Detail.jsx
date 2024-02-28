import { MdLocationOn } from 'react-icons/md';
import { MdLocalPhone } from 'react-icons/md';
import { RiGlobalLine } from 'react-icons/ri';
import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import Review from './Review';
import { FaBookmark } from 'react-icons/fa';
import colors from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addScrap, deleteScrap } from '../redux/modules/scrapSlice';
import CalculateGrade from './common/CalculateGrade';
import { Link } from 'react-router-dom';


const Detail = ({ markers, selectedId }) => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authSlice);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [serverScrapId, setServerScrapId] = useState(null); // 스크랩 서버에서 받은 고유 아이디

  // 스크랩 토글 유지
  useEffect(() => {
    const checkScrapStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/scraps`);
        // 현재 사용자 아이디가 들어있는 데이터
        const userScrapList = response.data.filter((item) => item.userId === userId);

        // {scrapId : id} 객체 생성
        const scrapIdToServerIdMap = {};
        userScrapList.forEach((item) => {
          scrapIdToServerIdMap[item.scrapId] = item.id;
        })
        // scrapId === selectedId 인 id 가져오기
        if (scrapIdToServerIdMap[selectedId]) {
          const serverScrapId = scrapIdToServerIdMap[selectedId];
          setServerScrapId(serverScrapId);
          setIsBookmarked(true)
        } else {
          setIsBookmarked(false)
        }
      } catch (error) {
        console.error('Error checking scrap status:', error);
      }
    };
    checkScrapStatus();
  }, [selectedId.userId]);

  // 스크랩 토글 ---------------------------------
  const handleBookmarkClick = async () => {
    try {
      if (isBookmarked) {
        await deleteScraps()
      } else {
        await addScraps()
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.log("error", error)
    }
  };

  // 스크랩 추가----------------------------------
  const addScraps = async () => {
    try {
      const newScrap = {
        userId: userId,
        scrapId: selectedId
      };
      const scrapResponse = await axios.post('http://localhost:4000/scraps', newScrap);
      dispatch(addScrap(newScrap))
      const serverScrapId = scrapResponse.data.id;
      setServerScrapId(serverScrapId)

    } catch (error) {
      alert('오류가 발생했습니다');
      console.log(error);
    }
  };

  // 스크랩 삭제----------------------------------
  const deleteScraps = async () => {
    try {
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
                <CalculateGrade cafeId={selectedId} />
              </StDetailInfoBox>
            </>
          ) : (
            <Review selectedId={selectedId} />
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

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
      }
      const scrapResponse = await axios.post('http://localhost:4000/scraps', newScrap);
      dispatch(addScrap(newScrap))
      const serverScrapId = scrapResponse.data.id;
      setServerScrapId(serverScrapId)

    } catch (error) {
      alert("오류가 발생했습니다")
      console.log(error)
    }
  }

  // 스크랩 삭제----------------------------------
  const deleteScraps = async () => {
    try {
      await axios.delete(`http://localhost:4000/scraps/${serverScrapId}`);
      dispatch(deleteScrap());
    } catch (error) {
      console.log("error", error)
    }
  }

  const selectedMarker = markers.find((marker) => marker.id === selectedId);

  const [toggleMenu, setToggleMenu] = useState(true);

  const toggleMenuHandler = (param) => {
    setToggleMenu(param);
  };

  return (
    <>
      <FaBookmark onClick={handleBookmarkClick} color={isBookmarked ? `${colors.starColor}` : "white"}></FaBookmark>
      {selectedMarker && <div>{selectedMarker.id}</div>}
      {selectedMarker.placeName}
      <button onClick={() => toggleMenuHandler(true)}>정보</button>
      <button onClick={() => toggleMenuHandler(false)}>리뷰</button>
      {toggleMenu ? (
        <>
          <div>
            <MdLocationOn />
            {selectedMarker.roadAddress}
          </div>
          <div>
            <MdLocalPhone />
            {selectedMarker.phoneNumber}
          </div>
          <div>
            <RiGlobalLine />
            {selectedMarker.placeUrl}
          </div>
        </>
      ) : (
        <Review />
      )}
    </>
  );
};
export default Detail;

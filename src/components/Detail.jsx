import React, { useDebugValue, useEffect, useState } from 'react';
import Review from './Review';
import { FaBookmark } from 'react-icons/fa';
import colors from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { scrapApi } from 'api/scrapApi';
import { addScrap, deleteScrap } from '../redux/modules/scrapSlice';
import axios from 'axios';

const Detail = ({ markers, selectedId }) => {
  const dispatch = useDispatch();
  const scraps = useSelector((state) => state.scrapSlice.scraps)
  const { userId } = useSelector((state) => state.authSlice);

  const [isBookmarked, setIsBookmarked] = useState(false);

  // 스크랩 토글 ---------------------------------

  const handleBookmarkClick = () => {
    setIsBookmarked(prevIsBookmarked => {
      console.log(!prevIsBookmarked);
      return !prevIsBookmarked;
    });
  };

  useEffect(() => {
    if (isBookmarked) {
      addScrapList();
    } else {
      deletedScrapList();
    }
  }, [isBookmarked]);

  // 스크랩 추가 ----------------------------------
  const addScrapList = async () => {
    const newScrapList = {
      userId: userId,
      scrapLists: [selectedId]
    }
    try {
      await axios.post('http://localhost:4000/scraps', newScrapList);
      dispatch(addScrap(newScrapList))
      console.log(newScrapList);
    } catch (error) {
      console.log("error", error)
    }
  };

  // 스크랩 삭제 ------------------------------------ TODO: 오류 수정해야 함
  const deletedScrapList = async () => {
    try {
      await axios.delete(`http://localhost:4000/scraps/${selectedId}`)
      dispatch(deleteScrap(selectedId))
      console.log(selectedId);
    } catch (error) {
      console.log("error", error)
    }
  }

  const selectedMarker = markers.find((marker) => marker.id === selectedId);
  return (
    <>
      <FaBookmark onClick={handleBookmarkClick} color={isBookmarked ? `${colors.starColor}` : "white"}></FaBookmark>
      {selectedMarker && <div>{selectedMarker.id}</div>}

      <Review />
    </>
  );
};
export default Detail;

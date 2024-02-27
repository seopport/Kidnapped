import React, { useDebugValue, useState } from 'react';
import Review from './Review';
import { FaBookmark } from 'react-icons/fa';
import colors from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { scrapApi } from 'api/scrapApi';
import { addScrap } from '../redux/modules/scrapSlice';
import axios from 'axios';

const Detail = ({ markers, selectedId }) => {
  const dispatch = useDispatch();
  const scraps = useSelector((state) => state.scrapSlice.scraps)
  const { userId } = useSelector((state) => state.authSlice);

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    console.log(userId)
    addScrapList()
  };

  const addScrapList = async () => {
    const scrapList = {
      userId: userId,
      scrapLists: [selectedId]
    }
    try {
      await axios.post('http://localhost:4000/scraps ', scrapList);
      dispatch(addScrap(scrapList))
      console.log(scrapList);
    } catch (error) {
      console.log("error", error)
    }
  };

  const selectedMarker = markers.find((marker) => marker.id === selectedId);
  return (
    <>
      <FaBookmark onClick={handleBookmarkClick} color={isBookmarked ? `${colors.starColor}` : 'white'}></FaBookmark>
      {selectedMarker && <div>{selectedMarker.id}</div>}

      <Review />
    </>
  );
};
export default Detail;

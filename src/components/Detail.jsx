import React, { useState } from 'react';
import Review from './Review';
import { FaBookmark } from 'react-icons/fa';
import colors from 'styles/theme';
import { useSelector } from 'react-redux';
import { scrapApi } from 'api/scrapApi';

const Detail = ({ markers, selectedId }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { userId } = useSelector((state) => state.authSlice);
  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
    console.log(userId)
    addScrapList()
  };

  const addScrapList = async () => {
    try {
      const response = await scrapApi.post(`${userId}`);
      console.log(response);
      return response;
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

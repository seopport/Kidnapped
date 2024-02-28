import React, { useDebugValue, useEffect, useState } from 'react';
import Review from './Review';
import { FaBookmark } from 'react-icons/fa';
import colors from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../redux/modules/userSlice';
import axios from 'axios';
import { addScrap, deleteScrap } from '../redux/modules/scrapSlice';

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
      addUsers();
      addScraps();
    } else {
      deleteUsers();
      deleteScraps(selectedId);
    }
  }, [isBookmarked, selectedId]);

  // 유저 추가 ----------------------------------
  const addUsers = async () => {
    const newUSer = {
      userId: userId,
    }
    try {
      await axios.post('http://localhost:4000/users', newUSer);
      dispatch(addUser(newUSer))
      console.log(newUSer);
    } catch (error) {
      console.log("error", error)
    }
  };
  // 유저 삭제 ----------------------------------
  const deleteUsers = async () => {
    try {
      await axios.delete(`http://localhost:4000/users/${userId}`);
      dispatch(deleteUser(userId))
    } catch (error) {
      console.log("error", error)
    }
  };

  // 스크랩 추가 ----------------------------------
  const addScraps = async () => {
    const newScrap = {
      userId: userId,
      scrapId: selectedId
    }
    try {
      await axios.post('http://localhost:4000/scraps', newScrap);
      dispatch(addScrap(newScrap))
      console.log(newScrap);
    } catch (error) {
      console.log("error", error)
    }
  };

  // 스크랩 삭제 -----------------------------------
  const deleteScraps = async (selectedId) => {
    try {
      await axios.delete(`http://localhost:4000/scraps/${selectedId}`);
      dispatch(deleteScrap(selectedId));
      console.log(selectedId);
    } catch (error) {
      console.log('error', error);
    }
  };

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

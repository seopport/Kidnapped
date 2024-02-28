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
  const { userId } = useSelector((state) => state.authSlice);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [serverScrapId, SetServerScrapId] = useState(null); // 스크랩 서버에서 받은 고유 아이디
  const [serverUserId, SetServerUserId] = useState(null); // 유저 서버에서 받은 고유 아이디

  // 스크랩 토글 ---------------------------------
  const handleBookmarkClick = () => {
    setIsBookmarked(prevIsBookmarked => {
      console.log(!prevIsBookmarked);
      return !prevIsBookmarked;
    });
  };

  useEffect(() => {
    if (isBookmarked) {
      addScrapAndUser()
    } else {
      if (serverScrapId) { // serverId가 존재할 때만 삭제 요청 보내기
        deleteScrapAndUser();
      }
    }
  }, [isBookmarked]);

  // 유저 추가 스크랩 추가----------------------------------
  const addScrapAndUser = async () => {
    try {
      // 유저 추가
      const userResponse = await axios.post('http://localhost:4000/users', { userId });
      dispatch(addUser({ userId }))

      // 서버에서 생성된 고유한 유저 ID 가져오기
      const serverUserId = userResponse.data.id;
      SetServerUserId(serverUserId)
      console.log(serverUserId)

      // 스크랩 추가
      const newScrap = {
        userId: userId,
        scrapId: selectedId
      }
      const scrapResponse = await axios.post('http://localhost:4000/scraps', newScrap);
      dispatch(addScrap(newScrap))

      // 서버에서 생성된 고유한 스크랩 ID 가져오기
      const serverScrapId = scrapResponse.data.id;
      SetServerScrapId(serverScrapId);
      console.log(serverScrapId)

    } catch (error) {
      alert("오류가 발생했습니다")
      console.log(error)
    }
  }

  // 유저 삭제 스크랩 삭제----------------------------------
  const deleteScrapAndUser = async () => {
    // 유저 삭제
    try {
      await axios.delete(`http://localhost:4000/users/${serverUserId}`);
      dispatch(deleteUser(userId))
      // 스크랩 삭제
      await axios.delete(`http://localhost:4000/scraps/${serverScrapId}`);
      dispatch(deleteScrap());
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

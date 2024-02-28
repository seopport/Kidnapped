import { MdLocationOn } from 'react-icons/md';
import { MdLocalPhone } from 'react-icons/md';
import { RiGlobalLine } from 'react-icons/ri';
import styled, { css } from 'styled-components';
import React, { useDebugValue, useEffect, useState } from 'react';
import Review from './Review';
import { FaBookmark } from 'react-icons/fa';
import colors from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addScrap, deleteScrap } from '../redux/modules/scrapSlice';
import CalculateGrade from './common/CalculateGrade';
import { Link, useNavigate } from 'react-router-dom';
import { HiChevronLeft } from 'react-icons/hi2';

const Detail = ({ markers, selectedId }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authSlice);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [serverScrapId, setServerScrapId] = useState(null); // 스크랩 서버에서 받은 고유 아이디
  const [serverUserId, setServerUserId] = useState(null); // 유저 서버에서 받은 고유 아이디
  const [toggleMenu, setToggleMenu] = useState('info');

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
        });
        // scrapId === selectedId 인 id 가져오기
        if (scrapIdToServerIdMap[selectedId]) {
          const serverScrapId = scrapIdToServerIdMap[selectedId];
          setServerScrapId(serverScrapId);
          setIsBookmarked(true);
        } else {
          setIsBookmarked(false);
        }
      } catch (error) {
        console.error('Error checking scrap status:', error);
      }
    };
    checkScrapStatus();
  }, [selectedId, userId]);

  // 스크랩 토글 ---------------------------------
  const handleBookmarkClick = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      alert('스크랩 기능은 로그인 후 이용하실 수 있습니다.');
      return;
    }
    try {
      if (isBookmarked) {
        await deleteScraps();
      } else {
        await addScraps();
      }
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.log('error', error);
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
      dispatch(addScrap(newScrap));
      const serverScrapId = scrapResponse.data.id;
      setServerScrapId(serverScrapId);
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

  const toggleMenuHandler = (param) => {
    setToggleMenu(param);
  };

  return (
    <>
      <StInfoContainer>
        <StCloseButton
          onClick={() => {
            navigate('/detail');
          }}
        >
          <HiChevronLeft />
        </StCloseButton>
        <StBookMark>
          <FaBookmark onClick={handleBookmarkClick} color={isBookmarked ? `${colors.starColor}` : 'white'}></FaBookmark>
        </StBookMark>
        <StImageBox>
          <img src="https://www.datanet.co.kr/news/photo/201706/111912_40939_1141.jpg" alt="방탈출 카페 사진" />
        </StImageBox>

        {/* {selectedMarker && <div>{selectedMarker.id}</div>} */}
        <StPlaceName> {selectedMarker.placeName}</StPlaceName>
        <StButtonBox>
          <StInfoButton toggleMenu={toggleMenu} onClick={() => toggleMenuHandler('info')}>
            <p>정보</p>
            <StHrInfo toggleMenu={toggleMenu} />
          </StInfoButton>
          <StReviewButton toggleMenu={toggleMenu} onClick={() => toggleMenuHandler('review')}>
            <p>리뷰</p>
            <StHrReview toggleMenu={toggleMenu} />
          </StReviewButton>
        </StButtonBox>

        <>
          {toggleMenu === 'info' ? (
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
              <StDetailInfoBox>
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
const StBookMark = styled.div`
  position: absolute;
  right: 40px;
  font-size: 30px;
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

const StCloseButton = styled.div`
  position: absolute;
  left: 17px;
  font-size: 36px;
  color: white;
`;
const StButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 20px;
`;
const StInfoButton = styled.div`
  cursor: pointer;
  color: ${(props) => (props.toggleMenu === 'info' ? colors.subColor : colors.mainTextColor)};
  font-weight: ${(props) => (props.toggleMenu === 'info' ? 'bold' : '')};
  padding: 15px;
  width: 100px;
  & p {
    text-align: center;
  }
`;
const StReviewButton = styled.div`
  cursor: pointer;
  color: ${(props) => (props.toggleMenu === 'info' ? colors.mainTextColor : colors.subColor)};
  font-weight: ${(props) => (props.toggleMenu === 'info' ? '' : 'bold')};
  padding: 15px;
  width: 100px;
  & p {
    text-align: center;
  }
`;
const StHrInfo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  border-bottom: 3px solid ${(props) => (props.toggleMenu === 'info' ? '#4F4F4F' : '#8B8B8B')};
`;
const StHrReview = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  border-bottom: 3px solid ${(props) => (props.toggleMenu === 'info' ? '#8B8B8B' : '#4F4F4F')};
`;

const StDetailInfoBox = styled.div`
  margin-top: 15px;
  margin-left: 30px;
  color: #8b8b8b;
`;
const StLink = styled(Link)`
  color: #175bb3;
`;

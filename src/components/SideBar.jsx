import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import colors from 'styles/theme';
import { IoSearch } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import Detail from './Detail';
import left from 'assets/left.png';
import right from 'assets/right.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useQuery } from 'react-query';
import { getReviews } from 'api/reviewApi';
import { FaStar } from 'react-icons/fa';

const SideBar = ({ markers, setMarkers, mapPagination, setMapPagination, map }) => {
  const { userId } = useSelector((state) => state.authSlice);
  const { kakao } = window;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [userScrapList, setUserScrapList] = useState([]);

  const { data: reviews } = useQuery('reviews', getReviews);
  // 리뷰를 다 바ㅏㄷ아옴
  // 리뷰에서 map돌면서 각 카페 아이디와 일치하는 grade 배열 생성
  // 그 카페 아이디배열의
  reviews?.filter((item) => item.cafeId === '377197835');

  // 현재 사용자가 스크랩한 방탈출 카페 아이디를 가져오는 함수
  const getScrapList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/scraps');
      const scrapId = response.data.map((item) => item.scrapId); // ['124356', '377197835', '1732671994']
      console.log(scrapId);

      const userScrapList = response.data.filter((item) => item.userId === userId).map((item) => item.scrapId);

      setUserScrapList(userScrapList);
      console.log(userScrapList); //['377197835', '1732671994']
    } catch (error) {
      console.log(error);
    }
  };

  const [toggle, setToggle] = useState(true);

  const toggleHandler = () => {
    setToggle(!toggle);
  };

  // 클릭 시 선택한 카드의 id 값 받아오기
  const handleCardItemClick = (id) => {
    const selectedMarker = markers.find((marker) => marker.id === id);

    if (selectedMarker && map) {
      // 선택한 마커의 위치로 지도를 이동
      const { lat, lng } = selectedMarker.position;

      map.setCenter(new kakao.maps.LatLng(lat, lng));
      map.setLevel(3); // 줌 레벨 : 3
      map.setCenter(new kakao.maps.LatLng(selectedMarker.position.lat, selectedMarker.position.lng)); // 마커 중심 좌표로 이동
    }
    setSelectedId(id);
    console.log(userId);
  };

  // 키보드 enter 시 검색
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      requestSearch();
      setSearchTerm('');
    }
  };

  const [buttonsNumber, setButtonsNumber] = useState([1, 2, 3]);
  // const buttonsNumber = [1, 2, 3];

  // 페이지 번호 클릭 핸들러
  const handlePageChange = (pageNumber) => {
    mapPagination.gotoPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked((prevIsBookmarked) => {
      console.log(!prevIsBookmarked);
      return !prevIsBookmarked;
    });
    if (!isBookmarked) {
      getScrapList();
    }
  };

  // 검색 함수
  const requestSearch = () => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${searchTerm} 방탈출`, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          const id = data[i].id; // 장소 ID
          const placeName = data[i].place_name; // 장소명
          const categoryName = data[i].category_name; // 카테고리 이름
          const phoneNumber = data[i].phone; // 전화번호
          const jibunAddress = data[i].address_name; // 전체 지번 주소
          const roadAddress = data[i].road_address_name; // 전체 도로명 주소
          const placeUrl = data[i].place_url; // 장소 상세페이지 URL
          const x = data[i].x; // X 좌표 혹은 경도(longitude)
          const y = data[i].y; // Y 좌표 혹은 위도(latitude)

          setMapPagination(pagination);

          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            id,
            placeName,
            roadAddress,
            phoneNumber,
            placeUrl
          });
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
        setSelectedId(null);
        setSearchTerm('');

        // 검색 결과에 따라 버튼 개수 변경
        const total = pagination.last;
        const buttonNumber = Array.from({ length: total }, (_, index) => index + 1);
        setButtonsNumber(buttonNumber);
      }
    });
  };

  const CalculateGrade = ({ cafeId }) => {
    // map return부분에서 받아온 각 cafeId와 리뷰데이터에서 cafeId가 일치하는 부분의 별점 배열을 생성한다.
    const cafeGrades = reviews?.filter((item) => item.cafeId === cafeId).map((item) => item.grade);

    // 별점 배열의 평균 구하기
    const gradeAverage =
      cafeGrades.reduce((acc, cur) => {
        return acc + cur;
      }, 0) / cafeGrades.length;

    // 소수점 반올림
    const roundedGradeAverage = gradeAverage.toFixed(1);

    // 리뷰가 없으면 gradeAverage = Nan = false
    return gradeAverage ? (
      <StGradeWrap>
        <FaStar color={colors.starColor} style={{ marginRight: '5px' }} />
        {roundedGradeAverage}
      </StGradeWrap>
    ) : (
      <StGradeWrap style={{ fontSize: '12px' }}>등록된 평점이 없습니다. 😕</StGradeWrap>
    );
  };

  return (
    <StSideBar toggle={toggle}>
      <StContainer>
        <StSearchWrapper>
          <StSearchForm onSubmit={(e) => e.preventDefault()}>
            <input
              onSubmit="return false"
              type="text"
              placeholder="지역 검색"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              onKeyDown={handleKeyDown}
            ></input>
            <StSearchButton onClick={requestSearch}>
              <IoSearch size={25} color={colors.subColor} />
            </StSearchButton>
          </StSearchForm>
          <StBookmarkButton onClick={handleBookmarkClick}>
            <FaBookmark size={30} color={isBookmarked ? `${colors.starColor}` : 'white'} />
          </StBookmarkButton>
        </StSearchWrapper>
        <StMainCardWrapper>
          {selectedId ? (
            <Detail markers={markers} selectedId={selectedId} />
          ) : isBookmarked ? (
            <div>북마크 항목을 보여줘 {userScrapList}</div>
          ) : (
            markers.map((item) => (
              <React.Fragment key={item.id}>
                <StMainCardItem onClick={() => handleCardItemClick(item.id)}>
                  <StMainCardInfoAndImage>
                    <StMainCardInfo>
                      <h1>{item.placeName}</h1>
                      <p>{item.roadAddress}</p>
                      <p>{item.phoneNumber}</p>
                      {/* 평점 */}
                      <CalculateGrade cafeId={item.id} />
                    </StMainCardInfo>
                    <StImageWrapper>
                      <img
                        src="https://www.datanet.co.kr/news/photo/201706/111912_40939_1141.jpg"
                        alt="방탈출 카페 사진"
                      />
                    </StImageWrapper>
                  </StMainCardInfoAndImage>
                </StMainCardItem>
              </React.Fragment>
            ))
          )}
        </StMainCardWrapper>
        {!selectedId && (
          <StButtonBox>
            {buttonsNumber.map((buttonNumber) => (
              <StPageButton
                index={buttonNumber}
                onClick={() => handlePageChange(buttonNumber)}
                $currentPage={currentPage}
              >
                {buttonNumber}
              </StPageButton>
            ))}
          </StButtonBox>
        )}
        {/* <Review /> 임시 주석처리  */}
      </StContainer>
      <StToggleButton onClick={toggleHandler} toggle={toggle} />
    </StSideBar>
  );
};

export default SideBar;

const StSideBar = styled.div`
  position: absolute;
  top: 68px;
  left: 0;
  width: 400px;
  height: 100vh;
  background-color: ${colors.subColor};
  z-index: 2;
  transition-duration: 500ms;
  // 토글 슬라이드 애니메이션

  ${(props) => {
    if (props.toggle) {
      return css`
        transform: translateX(0%);
      `;
    } else {
      return css`
        transform: translateX(-100%);
      `;
    }
  }}
`;

const StContainer = styled.div`
  position: relative;
  padding: 20px 16px;
  height: calc(100% - 40px);
`;

const StToggleButton = styled.button`
  position: absolute;
  top: 50%;
  left: 100%;
  width: 24px;
  height: 80px;
  transform: translateY(-50%);
  z-index: 10;
  overflow: hidden;
  display: inline-block;
  font-size: 1px;
  line-height: 1px;

  ${(props) => {
    if (props.toggle) {
      return css`
        background-image: url(${left});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
      `;
    } else {
      return css`
        background-image: url(${right});
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
      `;
    }
  }}
`;

const StSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  height: 47px;
  margin-bottom: 20px;
  flex: 1;
`;
const StSearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: white;
  border-radius: 100px;
  padding: 0 16px;
  flex: 1;

  & input {
    flex: 1;
    border: none;
    font-size: 20px;
    height: 100%;
    outline: none;
    background-color: transparent;
  }

  & ::placeholder {
    font-size: 20px;
    color: ${colors.mainTextColor};
  }
`;

const StSearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
const StBookmarkButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const StMainCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  /* max-height: calc(100vh - 68px - 47px); */
  height: 40rem;
  max-height: calc(100vh - 68px - 47px);
`;

const StMainCardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 143px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

const StMainCardInfoAndImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
  gap: 20px;
`;

const StMainCardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  & h1 {
    font-weight: 700;
    font-size: 16px;
    color: ${colors.subColor};
  }
  & p {
    font-size: 12px;
    color: ${colors.mainTextColor};
  }
`;

const StImageWrapper = styled.div`
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StButtonBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const StPageButton = styled.button`
  background: ${colors.mainColor};
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;

  ${(props) => {
    if (props.$currentPage === props.index) {
      return css`
        background: ${colors.starColor};
      `;
    }
    return css`
      background: ${colors.mainColor};
    `;
  }}

  &:hover {
    background: ${colors.starColor};
  }
`;

export const StGradeWrap = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  color: ${colors.mainTextColor};
  margin-top: auto;
`;

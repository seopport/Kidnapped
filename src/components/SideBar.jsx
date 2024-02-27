import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import colors from 'styles/theme';
import { IoSearch } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import Review from './Review';
import Detail from './Detail';

const SideBar = ({ markers, setMarkers, mapPagination }) => {
  const { kakao } = window;
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // 클릭 시 선택한 카드의 id 값 받아오기
  const handleCardItemClick = (id) => {
    setSelectedId(id);
  };

  // 키보드 enter 시 검색
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      requestSearch();
      setSearchTerm('');
    }
  };

  const buttonsNumber = [1, 2, 3];

  // 페이지 번호 클릭 핸들러
  const handlePageChange = (pageNumber) => {
    mapPagination.gotoPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  // 검색 함수
  const requestSearch = () => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(`${searchTerm} 방탈출`, (data, status, _pagination) => {
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
      }
    });
  };

  return (
    <StSideBar>
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
          ) : (
            markers.map((item) => {
              return (
                <StMainCardItem onClick={() => handleCardItemClick(item.id)}>
                  <StMainCardInfoAndImage>
                    <StMainCardInfo>
                      <h1>{item.placeName}</h1>
                      <p>{item.roadAddress}</p>
                      <p>{item.phoneNumber}</p>
                    </StMainCardInfo>
                    <StImageWrapper>
                      <img
                        src="https://www.datanet.co.kr/news/photo/201706/111912_40939_1141.jpg"
                        alt="방탈출 카페 사진"
                      ></img>
                    </StImageWrapper>
                  </StMainCardInfoAndImage>
                </StMainCardItem>
              );
            })
          )}
        </StMainCardWrapper>
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
        {/* <Review /> 임시 주석처리  */}
      </StContainer>
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
`;

const StContainer = styled.div`
  padding: 20px 16px;
  height: calc(100% - 40px);
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
  gap: 20px;
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

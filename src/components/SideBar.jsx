import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
import { IoSearch } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import Review from './Review';

const SideBar = ({ markers, setMarkers }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 키보드 enter 시 검색
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  }

  // 지역 검색시 필터링 함수
  const handleSearch = () => {
    if (!searchTerm) {
      alert("검색어를 입력하세요");
      return;
    }
    const filtered = markers.filter((marker) => {
      console.log(marker.roadAddress.includes(searchTerm))
      return marker.roadAddress.includes(searchTerm);
    });
    setMarkers(filtered);
    setSearchTerm("")
  }

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <StSideBar>
      <StContainer>
        <StSearchWrapper>
          <StSearchForm onSubmit={(e) => e.preventDefault()}>
            <input onSubmit='return false'
              type="text"
              placeholder="지역 검색"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
              onKeyDown={handleKeyDown}></input>
            <StSearchButton onClick={handleSearch}>
              <IoSearch size={25} />
            </StSearchButton>
          </StSearchForm>
          <StBookmarkButton onClick={handleBookmarkClick}>
            <FaBookmark size={30} color={isBookmarked ? `${colors.starColor}` : "white"} />
          </StBookmarkButton>
        </StSearchWrapper>
        <StMainCardWrapper>
          {
            markers.map((item) => {
              return (
                <StMainCardItem>
                  <StMainCardInfoAndImage>
                    <StMainCardInfo>
                      <h1>{item.placeName}</h1>
                      <p>{item.roadAddress}</p>
                      <p>{item.phoneNumber}</p>
                    </StMainCardInfo>
                    <StImageWrapper>
                      <img src='https://www.datanet.co.kr/news/photo/201706/111912_40939_1141.jpg' alt='방탈출 카페 사진'></img>
                    </StImageWrapper>
                  </StMainCardInfoAndImage>
                </StMainCardItem>
              )
            })
          }
        </StMainCardWrapper>
        <Review />
      </StContainer>
    </StSideBar>
  );
};

export default SideBar;

export const StSideBar = styled.div`
  position: absolute;
  top: 68px;
  left: 0;
  width: 400px;
  height: 100vh;
  background-color: ${colors.subColor};
  z-index: 2;
`;

export const StContainer = styled.div`
  display: felx;
  padding: 20px 16px;
  height: calc(100% - 40px);
`;

export const StSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  height: 47px;
  margin-bottom: 20px;
  flex: 1;
`;
export const StSearchForm = styled.form`
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
`;

export const StSearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
export const StBookmarkButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
export const StMainCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  max-height: calc(100vh - 68px - 47px);
`;

export const StMainCardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 143px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
`;

export const StMainCardInfoAndImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
  gap: 20px;
`

export const StMainCardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
    & h1{
    font-weight: 700;
    font-size: 16px;
    color: ${colors.subColor};
    }
    & p {
    font-size: 12px;
    color: ${colors.mainTextColor}
    }
`
export const StImageWrapper = styled.div`
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  `
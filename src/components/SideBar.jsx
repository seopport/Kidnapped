import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
import { IoSearch } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import Review from './Review';
import { useSearchParams } from 'react-router-dom';

const SideBar = ({ markers, setMarkers }) => {
  const { kakao } = window;
  const [searchTerm, setSearchTerm] = useState("")
  const handleSearch = () => {
    const ps = new kakao.maps.services.Places();

    if (!searchTerm) {
      return
    }

    ps.keywordSearch(searchTerm, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
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
            placeName,
            roadAddress,
            phoneNumber,
            placeUrl
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);
      }
    });

  }

  return (
    <StSideBar>
      <StContainer>
        <StSearchWrapper>
          <StSearchForm onSubmit={(e) => e.preventDefault()}>
            <input onSubmit='return false' type="text" placeholder="지역 검색" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm}></input>
            <StSearchButton onClick={handleSearch}>
              <IoSearch size={25} />
            </StSearchButton>
          </StSearchForm>
          <StBookmarkButton>
            <FaBookmark size={30} color={'white'} />
          </StBookmarkButton>
        </StSearchWrapper>
        <StMainCardContainer>
          {
            markers.map((item) => {
              return (
                <StMainCardItem>
                  <StMainCardInfo>
                    <h1>{item.placeName}</h1>
                    <p>{item.roadAddress}</p>
                    <p>평점</p>
                  </StMainCardInfo>
                  <StImageWrapper>
                    <img src='https://s3.ap-northeast-2.amazonaws.com/univ-careet/FileData/Article/480/593da055-3b4e-49a6-92f9-49bd1375a4ab.png' alt='방탈출 카페 사진'></img>
                  </StImageWrapper>
                </StMainCardItem>
              )
            })
          }
        </StMainCardContainer>
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
`;
export const StMainCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StMainCardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 143px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: white;
  gap: 20px;
`;

export const StMainCardInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 10px;
`
export const StImageWrapper = styled.div`
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  background-color: red;
`;
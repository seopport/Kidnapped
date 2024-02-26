import styled from 'styled-components';
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

// import fakeData from 'data/fakeData.json';
const { kakao } = window;

const Location = ({ markers, setMarkers }) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [positions, setPositions] = useState([]);
  const [map, setMap] = useState();

  const [state, setState] = useState({
    center: {
      lat: 37.5824,
      lng: 127.0017
    },
    errMsg: null,
    isLoading: true
  });
  useEffect(() => {
    if (!map) return;

    // 장소 검색 객체를 생성
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch('방탈출', (data, status, _pagination) => {
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

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);
      }
    });
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어온다.
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude // 경도
            },
            isLoading: false
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
        }
      );
    } else {
      //HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요.',
        isLoading: false
      }));
    }
    setPositions(positions);
  }, [map]);

  const handleMarkerClick = (index) => {
    setSelectedMarkerIndex(index);
  };
  const handleCloseButtonClick = () => {
    setSelectedMarkerIndex(null);
  };

  return (
    <StMapContiner>
      <StMapSize // 지도를 표시할 Container
        id="map"
        center={state.center} // 지도의 중심좌표
        level={7} // 지도의 확대 레벨
        onCreate={setMap}
      >
        {/* 지도에 컨트롤 올리기 */}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />

        {/* 마커 생성 후 지도에 표시 */}
        <MarkerClusterer averageCenter={true} minLevel={6}>
          {markers.map((marker, index) => (
            <MapMarker
              key={`marker-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => handleMarkerClick(index)}
            >
              {/* 해당 마커에 대한 오버레이 */}
              {index === selectedMarkerIndex && (
                <CustomOverlay>
                  <StCloseButton onClick={handleCloseButtonClick}>x</StCloseButton>
                  <StPlaceName>{marker.placeName}</StPlaceName>
                  <StRoadAddress>{marker.roadAddress}</StRoadAddress>
                  <StPhoneNumber>{marker.phoneNumber}</StPhoneNumber>
                  <StPlaceUrl>{marker.placeUrl}</StPlaceUrl>
                </CustomOverlay>
              )}
            </MapMarker>
          ))}
        </MarkerClusterer>
      </StMapSize>
    </StMapContiner>
  );
};

const StMapContiner = styled.div`
  height: 100vh;
`;

const StMapSize = styled(Map)`
  width: 100%;
  height: 100%;
`;

const CustomOverlay = styled.div`
  background-color: white;
  padding: 26px;
  border-radius: 9px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const StPlaceName = styled.p`
  font-size: 15px;
  font-weight: bold;
`;
const StRoadAddress = styled.p`
  font-size: 11px;
  margin-top: 5px;
`;
const StPhoneNumber = styled.p``;
const StPlaceUrl = styled.p``;
const StCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 20px;
  color: #007bff;
`;

export default Location;

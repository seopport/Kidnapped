import styled from 'styled-components';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

// import fakeData from 'data/fakeData.json';
const { kakao } = window;

const Location = () => {
  const [state, setState] = useState({
    center: {
      lat: 37.4882,
      lng: 127.0648
    },
    errMsg: null,
    isLoading: true
  });
  useEffect(() => {
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
  }, []);

  return (
    <StMapContiner>
      <StMapSize // 지도를 표시할 Container
        id="map"
        center={state.center} // 지도의 중심좌표
        level={6} // 지도의 확대 레벨
      >
        {/* 지도에 컨트롤 올리기 */}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />

        {/* 마커 생성 후 지도에 표시 */}
        <MapMarker // 마커 생성
          position={{
            // 마커가 표시될 위치
            lat: 37.55507,
            lng: 126.9707
          }}
          removable={true} // 마커를 닫을 수 있도록 설정
        >
          <StInfoWindow>
            <p>카페이름</p>
          </StInfoWindow>
        </MapMarker>
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
const StInfoWindow = styled.div`
  padding: 5px;
`;

export default Location;

import styled from 'styled-components';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useState } from 'react';
const { kakao } = window;

const Location = () => {
  const [position, setPosition] = useState({
    lat: 33.450701,
    lng: 126.570667
  });

  return (
    <StMapContiner>
      <StMapSize // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667
        }}
        // 지도의 확대 레벨
        level={3}
      >
        {/* 지도에 컨트롤 올리기 */}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />

        {/* 인포윈도우 생성 후 지도에 표시 */}
        <MapMarker // 인포윈도우 생성
          position={{
            // 인포윈도우가 표시될 위치
            lat: 33.450701,
            lng: 126.570667
          }}
          removable={true} // 인포윈도우를 닫을 수 있도록 설정
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
  width: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    font-size: 20px;
    font-weight: bold;
  }
`;

export default Location;

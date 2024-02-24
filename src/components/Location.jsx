import styled from 'styled-components';
import { Map, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
const { kakao } = window;

const Location = () => {
  return (
    <StMapContiner>
      <StMapSize // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667
        }}
        level={3} // 지도의 확대 레벨
      >
        {/* 지도에 컨트롤 올리기 */}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
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

export default Location;

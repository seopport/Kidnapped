import styled from 'styled-components';
import { useEffect } from 'react';
const { kakao } = window;

const Location = () => {
  useEffect(() => {
    var container = document.getElementById('map'); // 지도를 표시할 div
    var options = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488), // 지도의 중심좌표
      level: 3 // 지도의 확대 레벨
    };
    var map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  }, []);

  return (
    <div>
      <StLocationContainer id="map"></StLocationContainer>
    </div>
  );
};

const StLocationContainer = styled.div`
  width: 500px;
  height: 400px;
`;

export default Location;

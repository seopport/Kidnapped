import styled from 'styled-components';
import { Map, MapMarker, MapTypeControl, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

// import fakeData from 'data/fakeData.json';
const { kakao } = window;

const Location = () => {
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
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
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch('방탈출', (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x
            },
            content: data[i].place_name
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
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
  }, [map]);

  return (
    <StMapContiner>
      <StMapSize // 지도를 표시할 Container
        id="map"
        center={state.center} // 지도의 중심좌표
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
      >
        {/* 지도에 컨트롤 올리기 */}
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />

        {/* 마커 생성 후 지도에 표시 */}
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
          </MapMarker>
        ))}
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

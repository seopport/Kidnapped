import styled from 'styled-components';
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';

// import fakeData from 'data/fakeData.json';
const { kakao } = window;

const Location = () => {
  const [positions, setPositions] = useState([]);
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
          const placeName = data[i].place_name; // 장소 ID
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
            content: `
            ${placeName}
            ${roadAddress}
            ${jibunAddress}
            ${phoneNumber}
            `
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
        <MarkerClusterer
          averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
          minLevel={6} // 클러스터 할 최소 지도 레벨
        >
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
            >
              <div style={{ color: '#000' }}>{marker.content}</div>
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

export default Location;

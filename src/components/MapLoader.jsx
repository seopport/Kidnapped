import styled from 'styled-components';
import { Map, MapMarker, MapTypeControl, MarkerClusterer, ZoomControl } from 'react-kakao-maps-sdk';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const { kakao } = window;

const Location = ({ markers, setMarkers, setMapPagination, map, setMap }) => {
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [positions, setPositions] = useState([]);

  const [state, setState] = useState({
    center: {
      lat: 36.5824,
      lng: 127.0017
    },
    errMsg: null,
    isLoading: true
  });

  const searchPlaces = (position) => {
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(
      '방탈출',
      (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];

          for (var i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x
              },
              placeName: data[i].place_name,
              roadAddress: data[i].road_address_name,
              phoneNumber: data[i].phone,
              placeUrl: data[i].place_url,
              id: data[i].id
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);
          setMapPagination(pagination);
        }
      },
      {
        location: new kakao.maps.LatLng(position.lat, position.lng),
        radius: 10000
      }
    );
  };

  useEffect(() => {
    if (!map) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            isLoading: false
          }));
          searchPlaces({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false
          }));
          const defaultPosition = { lat: 37.5665, lng: 126.978 };
          searchPlaces(defaultPosition);
        }
      );
    } else {
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요.',
        isLoading: false
      }));
      const defaultPosition = { lat: 37.5665, lng: 126.978 };
      searchPlaces(defaultPosition);
    }
    setPositions(positions);
  }, [map]);

  const handleMarkerClick = (index) => {
    setSelectedMarkerIndex(index);
    const selectedMarker = markers[index];
    if (selectedMarker && map) {
      map.setCenter(new kakao.maps.LatLng(selectedMarker.position.lat, selectedMarker.position.lng));
    }
  };

  const handleCloseButtonClick = () => {
    setSelectedMarkerIndex(null);
  };

  return (
    <StMapContiner>
      <StMapSize id="map" center={state.center} level={12} onCreate={setMap}>
        <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
        <MarkerClusterer averageCenter={true} minLevel={6}>
          {markers.map((marker, index) => (
            <MapMarker
              key={`marker-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => handleMarkerClick(index)}
            >
              {index === selectedMarkerIndex && (
                <CustomOverlay>
                  <StCloseButton onClick={handleCloseButtonClick}>x</StCloseButton>
                  <StPlaceName>{marker.placeName}</StPlaceName>
                  <StRoadAddress>{marker.roadAddress}</StRoadAddress>
                  <StPhoneNumber> {marker.phoneNumber}</StPhoneNumber>
                  <StPlaceUrl>
                    <StLink to={marker.placeUrl}>{marker.placeUrl}</StLink>
                  </StPlaceUrl>
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
  padding: 22px;
  border-radius: 9px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const StPlaceName = styled.p`
  font-size: 15px;
  font-weight: bold;
`;
const StRoadAddress = styled.p`
  font-size: 11px;
  margin-top: 9px;
`;
const StPhoneNumber = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;
const StPlaceUrl = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;
const StLink = styled(Link)`
  color: #175bb3;
  text-decoration: underline;
`;
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

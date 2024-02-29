import Header from 'components/Header';
import SideBar from 'components/SideBar';
import React, { useState } from 'react';
import styled from 'styled-components';
import MapLoader from 'components/MapLoader';

const HomePage = () => {
  const [markers, setMarkers] = useState([]);
  const [mapPagination, setMapPagination] = useState(null);

  const [map, setMap] = useState();

  return (
    <div>
      <StContainer>
        <Header />
        <SideBar
          markers={markers}
          setMarkers={setMarkers}
          mapPagination={mapPagination}
          setMapPagination={setMapPagination}
          map={map}
        />
        <MapLoader
          markers={markers}
          setMarkers={setMarkers}
          setMapPagination={setMapPagination}
          map={map}
          setMap={setMap}
        />
      </StContainer>
    </div>
  );
};
export default HomePage;

export const StContainer = styled.main`
  position: relative;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  overflow: hidden;
`;

import Header from 'components/Header';
import SideBar from 'components/SideBar';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapLoader from 'components/MapLoader';
import colors from 'styles/theme';

const HomePage = () => {
  const [markers, setMarkers] = useState([]);
  return (
    <div>
      <StContainer>
        <Header />
        <SideBar markers={markers} setMarkers={setMarkers} />
        <MapLoader markers={markers} setMarkers={setMarkers} />
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
 
`;


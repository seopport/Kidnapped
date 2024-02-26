import Header from 'components/Header';
import SideBar from 'components/SideBar';
import React from 'react';
import styled from 'styled-components';
import MapLoader from 'components/MapLoader';
import colors from 'styles/theme';

const HomePage = () => {
  return (
    <div>
      <StContainer>
        <Header />
        <SideBar />
        <MapLoader />
        <StMap />
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
// TODO: 추후 Map 구현 후 style만 적용후 제거 -> Map Component 추가후 수정하시면 됩니다 :)
export const StMap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;
  z-index: 1;
`;

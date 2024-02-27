import React, { useState } from 'react';
import Review from './Review';
import { MdLocationOn } from 'react-icons/md';
import { MdLocalPhone } from 'react-icons/md';
import { RiGlobalLine } from 'react-icons/ri';
import styled from 'styled-components';

const Detail = ({ markers, selectedId }) => {
  const selectedMarker = markers.find((marker) => marker.id === selectedId);

  const [toggleMenu, setToggleMenu] = useState(true);

  const toggleMenuHandler = (param) => {
    setToggleMenu(param);
  };

  return (
    <>
      {selectedMarker && <div>{selectedMarker.id}</div>}
      {selectedMarker.placeName}
      <button onClick={() => toggleMenuHandler(true)}>정보</button>
      <button onClick={() => toggleMenuHandler(false)}>리뷰</button>
      {toggleMenu ? (
        <>
          <div>
            <MdLocationOn />
            {selectedMarker.roadAddress}
          </div>
          <div>
            <MdLocalPhone />
            {selectedMarker.phoneNumber}
          </div>
          <div>
            <RiGlobalLine />
            {selectedMarker.placeUrl}
          </div>
        </>
      ) : (
        <Review />
      )}
    </>
  );
};
export default Detail;

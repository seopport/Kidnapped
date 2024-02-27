import React, { useState } from 'react';
import Review from './Review';

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
          <div>{selectedMarker.roadAddress}</div>
          <div>{selectedMarker.phoneNumber}</div>
          <div>{selectedMarker.placeUrl}</div>
        </>
      ) : (
        <Review />
      )}
    </>
  );
};
export default Detail;

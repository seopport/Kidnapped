import React from 'react';
import Review from './Review';

const Detail = ({ markers, selectedId }) => {
  const selectedMarker = markers.find((marker) => marker.id === selectedId);
  return (
    <>
      {selectedMarker && <div>{selectedMarker.id}</div>}

      <Review />
    </>
  );
};
export default Detail;

import React from 'react';
import { BeatLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: 'center', margin: '40px' }}>
      <BeatLoader color="#36d7b7" />
      <p style={{ marginTop: '10px' }}>로딩 중..</p>
    </div>
  );
};

export default LoadingSpinner;

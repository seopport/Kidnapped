import React, { useState } from 'react';
import Information from './Information';
import Review from './Review';

const Detail = () => {
  const [information, setInformation] = useState([]);
  const [review, setReview] = useState([]);

  // 1. 가라 데이터로 컴포넌트 꾸미기

  // 2. 정보, 리뷰 토글버튼
  const [toggleMenu, setToggleMenu] = useState(true);

  const toggleMenuHandler = (param) => {
    setToggleMenu(param);
  };

  return (
    <>
      <div>이미지영역, 방탈출카페이름</div>
      <div>
        <div>
          <button onClick={() => toggleMenuHandler(true)}>정보</button>
          <button onClick={() => toggleMenuHandler(false)}>리뷰</button>
        </div>
        {toggleMenu ? <Information /> : <Review />}
      </div>
    </>
  );
};
export default Detail;

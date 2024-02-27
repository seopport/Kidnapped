import React from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
import { StLayoutBox } from 'components/common/Layout';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLogin = false;
  const nickName = '르탄이';

  const handleTitleClick = () => {
    navigate('/home', { replace: true });
    window.location.reload();
  };

  return (
    <StHeader>
      <StHeaderTitle onClick={handleTitleClick} >너 납치된 거야</StHeaderTitle>
      <StLayoutBox>
        <StHeaderNickName>{isLogin && `환영합니다 ${nickName}님`}</StHeaderNickName>
        <StHeaderButton onClick={() => { }}>{isLogin ? 'Login' : 'Logout'}</StHeaderButton>
      </StLayoutBox>
    </StHeader>
  );
};

export default Header;

export const StHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  position: relative;
  width: 100vw;
  height: 68px;
  background: ${colors.mainColor};
  z-index: 3;
  overflow: hidden;
`;
export const StHeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #ffffff;
  cursor: pointer;
`;
export const StHeaderNickName = styled.h3`
  font-weight: 400;
  font-size: 24px;
  color: #ffffff;
`;

export const StHeaderButton = styled.button`
  font-size: 24px;
  line-height: 29px;
  text-align: right;
  color: white;
  opacity: 0.8;
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

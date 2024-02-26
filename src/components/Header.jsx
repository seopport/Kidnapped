import React from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
import { StLayoutBox } from 'components/common/Layout';

const Header = () => {
  const isLogin = false;
  const nickName = '르탄이';
  return (
    <StHeader>
      <StHeaderTitle>너 납치된 거야</StHeaderTitle>
      <StLayoutBox>
        <StHeaderNickName>{isLogin && `환영합니다 ${nickName}님`}</StHeaderNickName>
        <StHeaderButton onClick={() => {}}>{isLogin ? 'Login' : 'Logout'}</StHeaderButton>
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
`;
export const StHeaderTitle = styled.h1`
  font-weight: 700;
  font-size: 32px;
  line-height: 39px;
  color: #ffffff;
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
  overflow: visible;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }
`;

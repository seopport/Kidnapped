import React from 'react';
import styled from 'styled-components';
import colors from 'styles/theme';
import { StLayoutBox } from 'components/common/Layout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/modules/authSlice';
import '../assets/font.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, nickname } = useSelector((state) => state.authSlice);

  const handleTitleClick = () => {
    navigate('/home', { replace: true });
    window.location.reload();
  };

  const handleLoginLogoutClick = () => {
    if (isLogin === true) {
      dispatch(logout());
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <StHeader>
      <StHeaderTitle onClick={handleTitleClick}>너 납치된 거야</StHeaderTitle>
      <StLayoutBox width="100%" height="100%" align="baseline" gap="16px" justify="flex-end">
        <StHeaderNickName>{isLogin && `환영합니다 ${nickname}님😊`}</StHeaderNickName>
        <StHeaderButton onClick={handleLoginLogoutClick}>{isLogin ? 'Logout' : 'Login'}</StHeaderButton>
      </StLayoutBox>
    </StHeader>
  );
};

export default Header;

export const StHeader = styled.header`
  font-family: 'JalnanGothic';
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
  font-weight: 500;
  font-size: 32px;
  color: #ffffff;
  cursor: pointer;
  width: 100%;
  align-items: baseline;
`;
export const StHeaderNickName = styled.h3`
  font-family: 'SUITE-Regular';
  font-weight: lighter;
  font-size: 20px;
  color: #ffffff;
`;

export const StHeaderButton = styled.button`
  font-family: 'SUITE-Regular';
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

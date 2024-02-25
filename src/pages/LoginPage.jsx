import React from 'react';
import styled from 'styled-components';

const LoginPage = () => {
  return (
    <StLayoutImage>
      <StLayoutContainer>
        <StHomeLink>Home</StHomeLink>
        <StLoginPageTitle>"너 납치된 거야"</StLoginPageTitle>
        <StLoginBox>
          <StLoginForm>
            <StFormTitle>Kidnapped</StFormTitle>
            <StFormSubTitle>로그인</StFormSubTitle>
            <StLoginInput placeholder="아이디" />
            <StLoginInput placeholder="비밀번호" />
            <StLoginButton>로그인</StLoginButton>
            <StToggleBox>
              <span>회원이 아니신가요?</span>
              <span>회원가입</span>
            </StToggleBox>
          </StLoginForm>
        </StLoginBox>
      </StLayoutContainer>
    </StLayoutImage>
  );
};

export default LoginPage;

const StLayoutImage = styled.div`
  background-image: url('/public/Loginimage.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const StLayoutContainer = styled.div`
  padding: 45px;
`;

const StLoginBox = styled.div`
  border: 1px solid green;
  border-radius: 30px;
  width: 600px;
  height: 650px;
  margin-top: 15px;
  padding: 30px;
`;

const StHomeLink = styled.a`
  font-size: 25px;
`;

const StLoginPageTitle = styled.h1`
  font-size: 28px;
  font-weight: bolder;
  margin-top: 55px;
`;

const StLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StFormTitle = styled.h2`
  font-size: 40px;
  font-weight: bolder;
  margin: 60px 0;
`;

const StFormSubTitle = styled.h3`
  font-size: 25px;
  font-weight: bolder;
  margin-top: 50px;
  margin-bottom: 15px;
`;

const StLoginInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  border: none;
  background-color: #f2f2f2;
  margin-bottom: 10px;
`;

const StLoginButton = styled.button`
  width: 100%;
  height: 40px;
  margin-top: 70px;
  border: none;
  color: white;
  background-color: #171e2e;
  cursor: pointer;
`;

const StToggleBox = styled.div`
  margin-top: 15px;
  & span:first-child {
    color: gray;
    margin-right: 10px;
  }
  & span:last-child {
    color: #171e2e;
    text-decoration: underline;
    cursor: pointer;
  }
`;

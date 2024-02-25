import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/modules/authSlice';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import useForm from 'hooks/useForm';
import { authApi } from 'api';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formState, onChangeHandler, resetForm } = useForm({
    id: '',
    password: '',
    nickname: ''
  });

  const { id, password, nickname } = formState;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      //로그인 처리
      try {
        const { data } = await authApi.post('/login', {
          id,
          password
        });
        const { accessToken, nickname, avatar, userId } = data;
        if (data.success) {
          dispatch(login({ accessToken, nickname, avatar, userId }));
          toast.success('로그인 성공!');
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    } else {
      // 회원가입 처리
      try {
        const { data } = await authApi.post('/register', {
          id,
          password,
          nickname
        });
        if (data.success) {
          setIsLoginMode(true);
          resetForm();
          toast.success('회원가입 성공!');
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }
    }
  };

  return (
    <StLayoutImage>
      <StLayoutContainer>
        <StHomeLink>Home</StHomeLink>
        <StLoginPageTitle>"너 납치된 거야"</StLoginPageTitle>
        <StLoginBox>
          <StLoginForm onSubmit={onSubmitHandler}>
            <StFormTitle>Kidnapped</StFormTitle>
            <StFormSubTitle>{isLoginMode ? '로그인' : '회원가입'}</StFormSubTitle>
            <StLoginInput name="id" value={id} onChange={onChangeHandler} placeholder="아이디" />
            <StLoginInput name="password" value={password} onChange={onChangeHandler} placeholder="비밀번호" />
            {!isLoginMode && (
              <StLoginInput
                name="nickname"
                value={nickname}
                onChange={onChangeHandler}
                placeholder="닉네임 (2자 이상)"
                minLength={2}
              />
            )}
            <StLoginButton>{isLoginMode ? '로그인' : '회원가입'}</StLoginButton>
            <StToggleBox>
              <span>{isLoginMode ? '회원이 아니신가요?' : '이미 회원이신가요?'}</span>
              <span onClick={() => setIsLoginMode((prev) => !prev)}>{isLoginMode ? '회원가입' : '로그인'}</span>
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
    user-select: none;
    cursor: pointer;
    &:hover {
      color: purple;
    }
  }
`;

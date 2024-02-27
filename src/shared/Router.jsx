import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import Detail from 'components/Detail';
import { useState } from 'react';

const Router = () => {
  //const isLogin = useSelector((state) => state.authSlice.isLogin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

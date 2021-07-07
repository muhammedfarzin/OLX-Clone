import React from 'react';
import Login from '../Components/Login/Login';
import LoadingPage from './LoadingPage';

function LoginPage() {
  return (
    <div>
      <LoadingPage/>
      <Login />
    </div>
  );
}

export default LoginPage;

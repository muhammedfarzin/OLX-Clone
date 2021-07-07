import React from 'react';

import Signup from '../Components/Signup/Signup';
import LoadingPage from './LoadingPage';

function SignupPage() {
  return (
    <div>
      <LoadingPage/>
      <Signup />
    </div>
  );
}

export default SignupPage;

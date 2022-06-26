import { useState } from 'react';
import Signin from './Signin';
import Signup from './Signup';

const AuthTop = () => {
  const [signup, setSignup] = useState(false);
  const changePage = () => {
    setSignup(!signup);
  };

  return (
    <>
      ログイン画面予定地
      {signup ? <Signup changePage={changePage} /> : <Signin changePage={changePage} />}
    </>
  );
};

export default AuthTop;

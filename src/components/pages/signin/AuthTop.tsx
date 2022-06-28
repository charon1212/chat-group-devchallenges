import { Button, Paper, TextField, Typography, useTheme } from '@mui/material';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../app/firebase/firebase';
import { useTextField } from '../../hooks/useTextField';

const AuthTop = () => {
  const [email, setEmail, propEmail] = useTextField();
  const [password, setPassword, propPassword] = useTextField();
  const theme = useTheme();
  const navigate = useNavigate();

  const onSignin = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          navigate('/');
        } else {
          alert('サインインに失敗しました。');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(JSON.stringify({ errorCode, errorMessage }));
      });
  };
  const onSignup = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          navigate('/');
        } else {
          alert('サインアップに失敗しました。');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(JSON.stringify({ errorCode, errorMessage }));
      });
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
        <Paper sx={{ margin: theme.spacing(10, 2, 2), padding: theme.spacing(5) }} elevation={20}>
          <Typography variant='h4'>Chat Group</Typography>
          <div style={{ margin: theme.spacing(4), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <TextField {...propEmail} label='e-mail' />
            <TextField {...propPassword} label='password' type='password' />
            <div style={{ textAlign: 'right' }}>
              <Button onClick={onSignin}>Signin</Button>
              <Button onClick={onSignup}>Signup</Button>
            </div>
          </div>
          <Typography>(created by charon1212)</Typography>
        </Paper>
      </div>
    </>
  );
};

export default AuthTop;

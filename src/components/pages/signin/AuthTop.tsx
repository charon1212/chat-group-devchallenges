import { Button, Paper, TextField, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { signin } from '../../../domain/firebase/signin';
import { useSignUpConfirm } from '../../dialogs/useSignUpConfirm';
import { useTextField } from '../../hooks/useTextField';
import TestUser from './TestUser';

const AuthTop = () => {
  const [email, setEmail, propEmail] = useTextField();
  const [password, setPassword, propPassword] = useTextField();
  const theme = useTheme();
  const navigate = useNavigate();

  const onSignin = () => {
    signin({ email, password }, () => {
      navigate('/');
    });
  };
  const { openSignUpConfirmDialog, SignUpConfirmDialog } = useSignUpConfirm();

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
              <Button
                onClick={() => {
                  openSignUpConfirmDialog(email, password);
                }}
              >
                Signup
              </Button>
            </div>
          </div>
          <Typography>(created by charon1212)</Typography>
          <TestUser setMail={setEmail} setPassword={setPassword} />
        </Paper>
      </div>
      {SignUpConfirmDialog}
    </>
  );
};

export default AuthTop;

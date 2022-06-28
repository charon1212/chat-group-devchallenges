import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../app/firebase/firebase';

export const useSignUpConfirm = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const openSignUpConfirmDialog = (email: string, password: string) => {
    setOpen(true);
    setEmail(email);
    setPassword(password);
  };

  const onSignup = () => {
    return createUserWithEmailAndPassword(auth, email, password)
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

  const SignUpConfirmDialog = (
    <>
      <Dialog open={open}>
        <DialogTitle>Confirm Sign up</DialogTitle>
        <DialogContent>
          Please confirm "{email}" is your email.
          <br />
          Are you sure you want to sign up?
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onSignup().then(() => {
                setOpen(false);
              });
            }}
          >
            OK
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              setEmail('');
              setPassword('');
            }}
          >
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return { openSignUpConfirmDialog, SignUpConfirmDialog };
};

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../domain/firebase/signup';

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
    signup({ email, password }, () => {
      navigate('/');
      setOpen(false);
      setEmail('');
      setPassword('');
    });
  };
  const closeDialog = () => {
    setOpen(false);
    setEmail('');
    setPassword('');
  };

  const SignUpConfirmDialog = (
    <>
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>Confirm Sign up</DialogTitle>
        <DialogContent>
          Please confirm "{email}" is your email.
          <br />
          Are you sure you want to sign up?
        </DialogContent>
        <DialogActions>
          <Button onClick={onSignup}>OK</Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return { openSignUpConfirmDialog, SignUpConfirmDialog };
};

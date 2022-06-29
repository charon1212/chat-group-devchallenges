import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSlice';
import { useTextField } from '../hooks/useTextField';
import AvatarEdit from './AvatarEdit';

export const useUserProfileDialog = () => {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName, propDisplayName] = useTextField('');
  const [avatarImage, setAvatarImage] = useState<File | undefined>(undefined);
  const theme = useTheme();

  const user = useAppSelector(selectUser);

  const openUserProfileDialog = () => {
    setDisplayName(user.displayName);
    setAvatarImage(undefined);
    setOpen(true);
  };
  const UserProfileDialog = (
    <>
      <Dialog open={open}>
        <DialogTitle>Edit User Profile</DialogTitle>
        <DialogContent>
          <table>
            <tr>
              <td style={{ padding: theme.spacing(1) }}>
                <Typography>Display Name</Typography>
              </td>
              <td style={{ padding: theme.spacing(1) }}>
                <TextField label='Display Name' {...propDisplayName} />
              </td>
            </tr>
            <tr>
              <td style={{ padding: theme.spacing(1) }}>
                <Typography>Avatar Image</Typography>
              </td>
              <td style={{ padding: theme.spacing(1) }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <AvatarEdit initialImageUrl='' setter={setAvatarImage} />
                </div>
              </td>
            </tr>
          </table>
        </DialogContent>
        <DialogActions>
          <Button>OK</Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return { openUserProfileDialog, UserProfileDialog };
};

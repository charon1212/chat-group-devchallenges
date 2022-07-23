import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, useTheme } from '@mui/material';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../../lib/firebase/firebase';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myFirestoreKitUser } from '../../lib/firebase/firestore/FirestoreUser';
import { User } from '../../domain/type/User';
import { selectUser, updateProfile } from '../../features/user/userSlice';
import { useTextField } from '../hooks/useTextField';
import AvatarEdit from './AvatarEdit';
import { useYesNoDialog } from './useYesNoDialog';

export const useUserProfileDialog = () => {
  const [open, setOpen] = useState(false);
  const [displayName, setDisplayName, propDisplayName] = useTextField('');
  const [avatarImage, setAvatarImage] = useState<File | undefined>(undefined);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const { openYesNoDialog, yesNoDialog } = useYesNoDialog({
    title: 'Confirm update user profile.',
    message: 'Are you sure you want to edit user profile?',
    onClickYes: async (closeDialog) => {
      const uploadAvatarImageUrl = await uploadFileFirestoreStorage(avatarImage, `AvatarImage-${user.uid}`);
      const newUser: User = {
        uid: user.uid,
        displayName: displayName || user.displayName,
        photoUrl: uploadAvatarImageUrl || user.photoUrl,
        accessibleChannel: user.accessibleChannel,
      };
      await myFirestoreKitUser.set({}, user.uid, newUser);
      dispatch(updateProfile(newUser));
      closeDialog();
      setOpen(false);
    },
    onClickNo: (closeDialog) => {
      closeDialog();
    },
  });

  const openUserProfileDialog = () => {
    setDisplayName(user.displayName);
    setAvatarImage(undefined);
    setOpen(true);
  };

  const UserProfileDialog = (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
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
          <Button
            onClick={() => {
              openYesNoDialog();
            }}
          >
            OK
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {yesNoDialog}
    </>
  );

  return { openUserProfileDialog, UserProfileDialog };
};

const uploadFileFirestoreStorage = async (file: File | undefined, fileName: string) => {
  if (!file) return undefined;
  const snapshot = await uploadBytes(ref(storage, fileName), file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
};

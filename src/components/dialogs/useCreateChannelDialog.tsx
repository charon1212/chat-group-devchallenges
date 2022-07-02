import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { myFirestoreKitChannel } from '../../domain/firestore/FirestoreChannel';
import { myFirestoreKitChannelAuthority } from '../../domain/firestore/FirestoreChannelAuthority';
import { Channel } from '../../domain/type/Channel';
import { ChannelAuthority } from '../../domain/type/ChannelAuthority';
import { selectUser } from '../../features/user/userSlice';
import { useTextField } from '../hooks/useTextField';

export const useCreateChannelDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle, propTitle] = useTextField('');
  const [description, setDescription, propDescription] = useTextField('');
  const theme = useTheme();
  const user = useAppSelector(selectUser);

  const openCreateChannelDialog = () => {
    setOpen(true);
    setTitle('');
    setDescription('');
  };
  const onCreate = async () => {
    const newChannel: Channel = { title, description, uid: '', isDefault: false };
    const channelRef = await myFirestoreKitChannel.add({}, newChannel);
    const createChannel: Channel = { ...newChannel, uid: channelRef.id };
    const newChannelAuth: ChannelAuthority = { user, channel: createChannel, uid: '', type: 'admin' };
    await myFirestoreKitChannelAuthority.add({ channel: createChannel }, newChannelAuth);
    setOpen(false);
  };

  const createChannelDialog = (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>New Channel</DialogTitle>
        <DialogContent sx={{ width: theme.spacing(60) }}>
          <div style={{ margin: theme.spacing(1) }}>
            <TextField {...propTitle} label='name' fullWidth />
          </div>
          <div style={{ margin: theme.spacing(1) }}>
            <TextField {...propDescription} label='description' fullWidth multiline rows={4} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
  return { openCreateChannelDialog, createChannelDialog };
};

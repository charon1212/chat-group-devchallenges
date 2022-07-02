import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myFirestoreKitChannel } from '../../domain/firestore/FirestoreChannel';
import { Channel } from '../../domain/type/Channel';
import { selectChannel, updateChannel } from '../../features/channel/channelSlice';
import { useTextField } from '../hooks/useTextField';

export const useEditChannelDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle, propTitle] = useTextField('');
  const [description, setDescription, propDescription] = useTextField('');
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const channel = useAppSelector(selectChannel);

  const openEditChannelDialog = () => {
    setOpen(true);
    setTitle(channel.title);
    setDescription(channel.description);
  };
  const onEdit = async () => {
    const newChannel: Channel = { ...channel, title, description };
    await myFirestoreKitChannel.set({}, channel.uid, newChannel);
    dispatch(updateChannel(newChannel));
    setOpen(false);
  };

  const editChannelDialog = (
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
          <Button variant='contained' onClick={onEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
  return { openCreateChannelDialog: openEditChannelDialog, createChannelDialog: editChannelDialog };
};

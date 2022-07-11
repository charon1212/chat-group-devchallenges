import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { myFirestoreKitChannel } from '../../domain/firestore/FirestoreChannel';
import { Channel } from '../../domain/type/Channel';
import { ChannelAuthority, ChannelAuthType } from '../../domain/type/ChannelAuthority';
import { selectChannel, updateChannelAuthority, updateChannel } from '../../features/channel/channelSlice';
import { useTextField } from '../hooks/useTextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { myFirestoreKitChannelAuthority } from '../../domain/firestore/FirestoreChannelAuthority';
import { useSelectUserDialog } from './useSelectUserDialog';
import { myFirestoreKitUser } from '../../domain/firestore/FirestoreUser';
import { selectUser, updateProfile } from '../../features/user/userSlice';

export const useEditChannelDialog = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle, propTitle] = useTextField('');
  const [description, setDescription, propDescription] = useTextField('');
  const [authList, setAuthList] = useState<ChannelAuthority[]>([]);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const channel = useAppSelector(selectChannel);
  const user = useAppSelector(selectUser);

  const openEditChannelDialog = () => {
    setOpen(true);
    setTitle(channel.title);
    setDescription(channel.description);
    setAuthList([...channel.channelAuthList]);
  };
  const onEdit = async () => {
    const newChannel: Channel = { ...channel, title, description };
    await myFirestoreKitChannel.set({}, channel.uid, newChannel);
    dispatch(updateChannel(newChannel));
    await updateChannelAuthList(channel, channel.channelAuthList, authList);
    dispatch(updateChannelAuthority(authList));
    if (!authList.some((a) => a.user.uid === user.uid)) {
      dispatch(updateProfile({ ...user, accessibleChannel: user.accessibleChannel.filter((c) => c !== channel.uid) }));
    }
    setOpen(false);
  };
  const onChangeAuthTypeHandler = (i: number) => {
    return (authType: ChannelAuthType) => {
      const newAuth = { ...authList[i], type: authType };
      const newAuthList = [...authList];
      newAuthList[i] = newAuth;
      setAuthList(newAuthList);
    };
  };
  const onDeleteAuth = (i: number) => {
    return () => {
      setAuthList(authList.filter((_, j) => j !== i));
    };
  };
  const { openSelectUserDialog, selectUserDialog } = useSelectUserDialog({
    onSelect: (user) => {
      const newAuth: ChannelAuthority = { channel, user, uid: '', type: 'readonly' };
      setAuthList([...authList, newAuth]);
    },
  });
  const onClickAddMemberButton = async () => {
    const userList = await myFirestoreKitUser.find({});
    const filteredUserList = userList.filter((user) => !authList.some((auth) => auth.user.uid === user.uid));
    openSelectUserDialog(filteredUserList);
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
          <div style={{ margin: theme.spacing(2) }}>
            <TitleDivider title='Channel info' />
          </div>
          <div style={{ margin: theme.spacing(1) }}>
            <TextField {...propTitle} label='name' fullWidth />
          </div>
          <div style={{ margin: theme.spacing(1) }}>
            <TextField {...propDescription} label='description' fullWidth multiline rows={4} />
          </div>
          <div style={{ margin: theme.spacing(2) }}>
            <TitleDivider title='Channel members' />
          </div>
          <div style={{ margin: theme.spacing(1) }}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>User Name</TableCell>
                  <TableCell>Authority</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authList.map(({ user, type }, i) => (
                  <TableRow key={i}>
                    <TableCell>{user.displayName}</TableCell>
                    <TableCell>
                      <SelectAuthority value={type} onChange={onChangeAuthTypeHandler(i)} />
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={onDeleteAuth(i)}>
                        <DeleteIcon fontSize='small' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant='contained' onClick={onClickAddMemberButton}>
              Add Member
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={onEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {selectUserDialog}
    </>
  );
  return { openEditChannelDialog, editChannelDialog };
};

const TitleDivider = (props: { title: string }) => {
  const { title } = props;
  const theme = useTheme();
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: theme.spacing(4) }}>
          <Divider />
        </div>
        <div style={{ margin: theme.spacing(0, 2, 0) }}>{title}</div>
        <div style={{ width: theme.spacing(4) }}>
          <Divider />
        </div>
      </div>
    </>
  );
};

const channelAuthTypeList: ChannelAuthType[] = ['admin', 'readwrite', 'readonly'];
const SelectAuthority = (props: { value: ChannelAuthType; onChange?: (value: ChannelAuthType) => unknown }) => {
  const { value, onChange } = props;
  return (
    <>
      <FormControl size='small'>
        <Select
          value={value}
          onChange={(e) => {
            if (onChange) onChange(e.target.value as ChannelAuthType);
          }}
        >
          {channelAuthTypeList.map((v,i) => (
            <MenuItem value={v} key={i}>{v}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

const updateChannelAuthList = async (channel: Channel, beforeAuthList: ChannelAuthority[], afterAuthList: ChannelAuthority[]) => {
  const addChannelAuthList = afterAuthList.filter(({ uid }) => !uid);
  const modifyChannelAuthList = afterAuthList.filter(({ uid }) => uid);
  const deleteChannelAuthList = beforeAuthList.filter(({ uid }) => !afterAuthList.some((a) => a.uid === uid));
  await Promise.all([
    ...addChannelAuthList.map((channelAuth) =>
      myFirestoreKitChannelAuthority.add({ channel }, channelAuth).then((docRef) => {
        channelAuth.uid = docRef.id;
      })
    ),
    ...modifyChannelAuthList.map((channelAuth) => myFirestoreKitChannelAuthority.set({ channel }, channelAuth.uid, channelAuth)),
    ...deleteChannelAuthList.map((channelAuth) => myFirestoreKitChannelAuthority.delete({ channel }, channelAuth.uid)),
    ...addChannelAuthList.map(async (channelAuth) => {
      const user = await myFirestoreKitUser.get({}, channelAuth.user.uid);
      if (user) myFirestoreKitUser.set({}, user.uid, { ...user, accessibleChannel: [...user.accessibleChannel, channel.uid] });
    }),
    ...deleteChannelAuthList.map(async (channelAuth) => {
      const user = await myFirestoreKitUser.get({}, channelAuth.user.uid);
      if (user) myFirestoreKitUser.set({}, user.uid, { ...user, accessibleChannel: user.accessibleChannel.filter((uid) => uid !== channel.uid) });
    }),
  ]);
};

import { Add } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography, FormControl, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { myFirestoreKitChannel } from '../../../domain/firestore/FirestoreChannel';
import { myFirestoreKitChannelAuthority } from '../../../domain/firestore/FirestoreChannelAuthority';
import { myFirestoreKitUser } from '../../../domain/firestore/FirestoreUser';
import { Channel } from '../../../domain/type/Channel';
import { changeChannel } from '../../../features/channel/channelSlice';
import { selectUser } from '../../../features/user/userSlice';
import { useCreateChannelDialog } from '../../dialogs/useCreateChannelDialog';
import { useSearchField } from '../../hooks/useSearchField';

const ChannelList = () => {
  const theme = useTheme();

  const { searchWord, searchFieldElement } = useSearchField();
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const { openCreateChannelDialog, createChannelDialog } = useCreateChannelDialog();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscription = myFirestoreKitChannel.listenCollection({}, (list) => {
      setChannelList(list.filter((c) => user.accessibleChannel.includes(c.uid)));
    });
    return () => {
      unsubscription();
    };
  }, [user.accessibleChannel]);

  const selectChannel = async (channel: Channel) => {
    const channelAuthorityList = await myFirestoreKitChannelAuthority.find({ channel });
    await Promise.all(
      channelAuthorityList.map((member) => {
        return myFirestoreKitUser.get({}, member.user.uid).then((data) => {
          if (data) member.user = data;
        });
      })
    );
    dispatch(changeChannel({ channel, channelAuthList: channelAuthorityList }));
  };

  return (
    <>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ margin: theme.spacing(2, 2, 0) }}>
            <Typography variant='h5'>Channels</Typography>
          </div>
          <div>
            <IconButton
              onClick={() => {
                openCreateChannelDialog();
              }}
            >
              <Add color='primary' fontSize='large' />
            </IconButton>
          </div>
        </div>
        <div>
          <FormControl fullWidth>{searchFieldElement}</FormControl>
        </div>
        <div style={{ overflowY: 'scroll' }}>
          <List>
            {channelList.map((channel, i) => (
              <ListItem key={i}>
                <ListItemButton
                  onClick={() => {
                    selectChannel(channel);
                  }}
                >
                  <ListItemText primary={channel.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      {createChannelDialog}
    </>
  );
};

export default ChannelList;

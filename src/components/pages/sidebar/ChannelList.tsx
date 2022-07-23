import { Add } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography, FormControl, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { myFirestoreKitChannel } from '../../../lib/firebase/firestore/FirestoreChannel';
import { myFirestoreKitChannelAuthority } from '../../../lib/firebase/firestore/FirestoreChannelAuthority';
import { myFirestoreKitUser } from '../../../lib/firebase/firestore/FirestoreUser';
import { Channel } from '../../../domain/type/Channel';
import { changeChannel } from '../../../lib/redux/slice/channelSlice';
import { selectUser } from '../../../lib/redux/slice/userSlice';
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
  const searchedChannelList = !searchWord ? channelList : channelList.filter(({ title }) => title.includes(searchWord));

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
            {searchedChannelList.map((channel, i) => (
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

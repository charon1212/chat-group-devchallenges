import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import { myFirestoreKitChat } from '../../../domain/firestore/FirestoreChat';
import { myFirestoreKitUser } from '../../../domain/firestore/FirestoreUser';
import { Chat } from '../../../domain/type/Chat';
import { selectChannel } from '../../../features/channel/channelSlice';
import { useScrollAt } from '../../hooks/useScrollAt';

const ChatFrame = () => {
  const theme = useTheme();
  const { ref } = useScrollAt();
  const channel = useAppSelector(selectChannel);
  const [chatList, setChatList] = useState<Chat[]>([]);
  useEffect(() => {
    myFirestoreKitChat.listenCollection({ channel }, async (list) => {
      await Promise.all(
        list.map(async (v) => {
          v.user = (await myFirestoreKitUser.get({}, v.user.uid))!;
        })
      );
      setChatList(list.sort((a, b) => a.dateMilliseconds - b.dateMilliseconds));
    });
  }, [channel]);

  return (
    <>
      <div style={{ height: 'auto', overflowY: 'hidden' }}>
        <div style={{ margin: theme.spacing(1, 3, 1, 1), overflowY: 'scroll', maxHeight: '100%' }}>
          <List>
            {chatList.map((chat) => (
              <ChatBox chat={chat} />
            ))}
            <DateDivider />
            <div ref={ref} />
          </List>
        </div>
      </div>
    </>
  );
};

type PropsChatBox = { chat: Chat };
const ChatBox = (props: PropsChatBox) => {
  const { chat } = props;
  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='avatar-image' src={chat.user.photoUrl} />
        </ListItemAvatar>
        <ListItemText primary={chat.user.displayName} secondary={chat.chatContent} />
      </ListItem>
    </>
  );
};

const DateDivider = () => {
  return (
    <>
      <table>
        <colgroup>
          <col style={{ width: '50%' }} />
          <col />
          <col style={{ width: '50%' }} />
        </colgroup>
        <tbody>
          <tr>
            <td>
              <Divider />
            </td>
            <td>
              <div style={{ marginLeft: '20px', marginRight: '20px' }}>2020/05/01</div>
            </td>
            <td>
              <Divider />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ChatFrame;

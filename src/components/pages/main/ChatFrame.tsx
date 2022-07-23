import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { myFirestoreKitChat } from '../../../lib/firebase/firestore/FirestoreChat';
import { myFirestoreKitUser } from '../../../lib/firebase/firestore/FirestoreUser';
import { Chat } from '../../../domain/type/Chat';
import { selectChannel } from '../../../lib/redux/slice/channelSlice';
import { useScrollAt } from '../../hooks/useScrollAt';

const ChatFrame = () => {
  const theme = useTheme();
  const channel = useAppSelector(selectChannel);
  const [chatList, setChatList] = useState<(Chat & { dateObj: DateObj })[]>([]);
  useEffect(() => {
    myFirestoreKitChat.listenCollection({ channel }, async (list) => {
      await Promise.all(
        list.map(async (v) => {
          v.user = (await myFirestoreKitUser.get({}, v.user.uid))!;
        })
      );
      setChatList(list.sort((a, b) => a.dateMilliseconds - b.dateMilliseconds).map((v) => ({ ...v, dateObj: getDateObj(v.dateMilliseconds) })));
    });
  }, [channel]);
  const { ref } = useScrollAt(chatList);

  return (
    <>
      <div style={{ height: 'auto', overflowY: 'hidden', flexGrow: 2 }}>
        <div style={{ margin: theme.spacing(1, 3, 1, 1), overflowY: 'scroll', height: '100%' }}>
          <List>
            {chatList.map((chat, i) => {
              const postChat = chatList[i + 1];
              const setDivider = !postChat || !sameDay(postChat.dateObj, chat.dateObj);
              return (
                <React.Fragment key={i}>
                  <ChatBox chat={chat} />
                  {setDivider ? <DateDivider dateObj={chat.dateObj} /> : ''}
                </React.Fragment>
              );
            })}
            <div ref={ref} />
          </List>
        </div>
      </div>
    </>
  );
};

type PropsChatBox = { chat: Chat & { dateObj: DateObj } };
const ChatBox = (props: PropsChatBox) => {
  const { chat } = props;
  const { hour, minute, second } = chat.dateObj;
  const dateString = `${hour}:${minute}:${second}`;
  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='avatar-image' src={chat.user.photoUrl} />
        </ListItemAvatar>
        <ListItemText primary={`${chat.user.displayName}`} secondary={`${chat.chatContent} - ${dateString}`} />
      </ListItem>
    </>
  );
};

type PropsDivider = { dateObj: DateObj };
const DateDivider = (props: PropsDivider) => {
  const { dateObj } = props;
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
              <div style={{ marginLeft: '20px', marginRight: '20px' }}>{`${dateObj.year}/${dateObj.month}/${dateObj.day}`}</div>
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

const sameDay = (d1: DateObj, d2: DateObj) => d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;

type DateObj = ReturnType<typeof getDateObj>;
const getDateObj = (m: number) => {
  const d = new Date(m);
  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
    second: d.getSeconds(),
    milliSeconds: d.getMilliseconds(),
  };
};

export default ChatFrame;

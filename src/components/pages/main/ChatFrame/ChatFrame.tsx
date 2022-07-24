import { List, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks/hooks';
import { myFirestoreKitChat } from '../../../../lib/firebase/firestore/FirestoreChat';
import { myFirestoreKitUser } from '../../../../lib/firebase/firestore/FirestoreUser';
import { Chat } from '../../../../domain/type/Chat';
import { selectChannel } from '../../../../lib/redux/slice/channelSlice';
import { useScrollAt } from '../../../hooks/useScrollAt';
import DateDivider from './DateDivider';
import { DateObj, getDateObj } from './DateObj';
import ChatBox from './ChatBox';

/**
 * チャット表示部品。
 */
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
                  {setDivider ? <DateDivider dateString={`${chat.dateObj.year}/${chat.dateObj.month}/${chat.dateObj.day}`} /> : ''}
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

const sameDay = (d1: DateObj, d2: DateObj) => d1.year === d2.year && d1.month === d2.month && d1.day === d2.day;

export default ChatFrame;

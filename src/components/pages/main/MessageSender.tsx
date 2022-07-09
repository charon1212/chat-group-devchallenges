import { Button, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppSelector } from '../../../app/hooks';
import { selectChannel } from '../../../features/channel/channelSlice';
import { useTextField } from '../../hooks/useTextField';
import { myFirestoreKitChat } from '../../../domain/firestore/FirestoreChat';
import { Chat } from '../../../domain/type/Chat';
import { selectUser } from '../../../features/user/userSlice';

const MessageSender = () => {
  const [message, setMessage, propMessage] = useTextField();
  const channel = useAppSelector(selectChannel);
  const user = useAppSelector(selectUser);
  const currentUserChannelAuth = channel.channelAuthList.find((auth) => auth.user.uid === user.uid)?.type;
  const haveAuthoritySendMessage = currentUserChannelAuth === 'admin' || currentUserChannelAuth === 'readwrite';

  const sendMessage = async () => {
    if (!haveAuthoritySendMessage) {
      alert('Not allowed to post message.');
      return;
    }
    const nowMilliseconds = Date.now();
    const newChat: Chat = { channel, user, uid: '', chatContent: message, dateMilliseconds: nowMilliseconds };
    await myFirestoreKitChat.add({ channel }, newChat);
    setMessage('');
  };
  const messageInputKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <div>
        <FormControl fullWidth>
          <OutlinedInput
            {...propMessage}
            onKeyDown={messageInputKeyDown}
            disabled={!haveAuthoritySendMessage}
            endAdornment={
              <InputAdornment position='end'>
                <Button>
                  <IconButton onClick={sendMessage}>
                    <SendIcon />
                  </IconButton>
                </Button>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </>
  );
};

export default MessageSender;

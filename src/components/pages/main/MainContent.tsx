import { useAppSelector } from '../../../app/hooks';
import { selectChannel } from '../../../lib/redux/slice/channelSlice';
import ChannelTitle from './ChannelTitle';
import ChatFrame from './ChatFrame';
import MessageSender from './MessageSender';

const MainContent = () => {
  const channel = useAppSelector(selectChannel);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#282828'}}>
        {channel.uid ? (
          <>
            <ChannelTitle />
            <ChatFrame />
            <MessageSender />
          </>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default MainContent;

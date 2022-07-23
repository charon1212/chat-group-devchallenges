import { useAppSelector } from '../../hooks/hooks';
import { selectChannel } from '../../../lib/redux/slice/channelSlice';
import ChannelTitle from './ChannelTitle/ChannelTitle';
import ChatFrame from './ChatFrame/ChatFrame';
import MessageSender from './MessageSender/MessageSender';

/**
 * メイン画面のメイン領域を描画する部品。
 */
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

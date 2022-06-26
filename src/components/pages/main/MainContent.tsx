import ChannelTitle from './ChannelTitle';
import ChatFrame from './ChatFrame';
import MessageSender from './MessageSender';

const MainContent = () => {

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#282828' }}>
        <ChannelTitle />
        <ChatFrame />
        <MessageSender />
      </div>
    </>
  );
};

export default MainContent;

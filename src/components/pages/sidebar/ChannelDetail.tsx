import { useTheme } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectChannel } from '../../../features/channel/channelSlice';
import MemberList from './MemberList';

const ChannelDetail = () => {
  const theme = useTheme();
  const channel = useAppSelector(selectChannel);

  return (
    <>
      <div style={{ margin: theme.spacing(1) }}>
        <div style={{ margin: theme.spacing(2) }}>
          <h3>{channel.title}</h3>
          {channel.description}
        </div>
        <MemberList />
      </div>
    </>
  );
};

export default ChannelDetail;

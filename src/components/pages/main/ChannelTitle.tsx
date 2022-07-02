import { useTheme } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectChannel } from '../../../features/channel/channelSlice';

const ChannelTitle = () => {
  const channel = useAppSelector(selectChannel);
  const theme = useTheme();

  return (
    <>
      <div style={{ margin: theme.spacing(0, 0, 0, 4), boxShadow: '0px 1px 10px 0px #000', border: '1px solid #000' }}>
        <h3>{channel.title}</h3>
      </div>
    </>
  );
};

export default ChannelTitle;

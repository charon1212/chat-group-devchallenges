import { useTheme } from '@mui/material';
import ChannelDetail from './ChannelDetail';
import UserProfile from './UserProfile';

const SideBar = () => {
  const theme = useTheme();

  return (
    <>
      <div
        style={{
          width: theme.spacing(40),
          backgroundColor: '#080808',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        <div style={{ margin: theme.spacing(2) }}>
          <h3>{' ＜ '} All channels </h3>
        </div>
        <ChannelDetail />
        <div style={{ marginTop: 'auto', backgroundColor: 'black' }}>
          <UserProfile />
        </div>
      </div>
    </>
  );
};

export default SideBar;

import { Link, Typography, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectChannel } from '../../../lib/redux/slice/channelSlice';
import ChannelList from './ChannelList/ChannelList';
import ChannelDetail from './ChannelDetail/ChannelDetail';
import UserProfile from './UserProfile/UserProfile';

const SideBar = () => {
  const theme = useTheme();

  const channel = useAppSelector(selectChannel);
  const [selectChannelUid, setSelectChannelUid] = useState('');
  useEffect(() => {
    setSelectChannelUid(channel.uid);
  }, [channel]);
  const linkOnClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    setSelectChannelUid('');
  };

  return (
    <>
      <div
        style={{
          width: theme.spacing(40),
          backgroundColor: '#080808',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          padding: theme.spacing(1),
        }}
      >
        <div style={{height: 'auto', overflowY: 'hidden'}}>
          {selectChannelUid ? (
            <>
              <div style={{ margin: theme.spacing(2), display: 'flex', alignItems: 'center' }}>
                <div>
                  <Link href='#' onClick={linkOnClick}>
                    {' ＜　'}
                  </Link>
                </div>
                <div>
                  <Typography variant='h5'>All channels</Typography>
                </div>
              </div>
              <ChannelDetail />
            </>
          ) : (
            <>
              <ChannelList />
            </>
          )}
        </div>
        <div style={{ marginTop: 'auto', backgroundColor: 'black', flexShrink: 0 }}>
          <UserProfile />
        </div>
      </div>
    </>
  );
};

export default SideBar;

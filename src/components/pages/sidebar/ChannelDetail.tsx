import { useTheme } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../app/hooks';
import { selectChannel } from '../../../features/channel/channelSlice';
import MemberList from './MemberList';

const ChannelDetail = () => {
  const theme = useTheme();
  const channel = useAppSelector(selectChannel);
  const linesDescription = channel.description.split('\n');

  return (
    <>
      <div style={{ margin: theme.spacing(1) }}>
        <div style={{ margin: theme.spacing(2) }}>
          <h3>{channel.title}</h3>
          {linesDescription.map((v, i) => (
            <React.Fragment key={i}>
              {v}
              <br />
            </React.Fragment>
          ))}
        </div>
        <MemberList />
      </div>
    </>
  );
};

export default ChannelDetail;

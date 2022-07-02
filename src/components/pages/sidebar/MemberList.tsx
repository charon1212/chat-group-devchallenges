import { Avatar, Typography, useTheme } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { ChannelAuthType } from '../../../domain/type/ChannelAuthority';
import { User } from '../../../domain/type/User';
import { selectChannel } from '../../../features/channel/channelSlice';

const MemberList = () => {
  const theme = useTheme();
  const channel = useAppSelector(selectChannel);
  return (
    <>
      <div style={{ margin: theme.spacing(2) }}>
        <h3>MEMBERS</h3>
        {channel.members.map(({ user, authType }) => (
          <ListItemUser user={user} authType={authType} />
        ))}
      </div>
    </>
  );
};

type PropListItemUser = { user: User; authType: ChannelAuthType };
const ListItemUser = (props: PropListItemUser) => {
  const { user, authType } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
      <Avatar alt='test' src={user.photoUrl} />
      <div>
        <Typography style={{ marginLeft: '20px' }}>{user.displayName}</Typography>
        {authType === 'admin' ? <Typography style={{ marginLeft: '40px', color: 'grey' }}>★admin</Typography> : ''}
        {authType === 'readonly' ? <Typography style={{ marginLeft: '40px', color: 'grey' }}>(read-only)</Typography> : ''}
      </div>
    </div>
  );
};

export default MemberList;

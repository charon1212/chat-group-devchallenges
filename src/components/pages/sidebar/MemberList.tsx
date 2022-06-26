import { Avatar, Typography, useTheme } from '@mui/material';
import { ChannelAuthType } from '../../../domain/type/ChannelAuthority';
import { User } from '../../../domain/type/User';
import { useFetchChannelAuthority } from '../../hooks/useFetchChannelAuthority';

const MemberList = () => {
  const theme = useTheme();
  const authList = useFetchChannelAuthority();
  return (
    <>
      <div style={{ margin: theme.spacing(2) }}>
        <h3>MEMBERS</h3>
        {authList.map((auth) => (
          <ListItemUser user={auth.user} authType={auth.type} />
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
        {authType === 'admin' ? <Typography style={{ marginLeft: '40px', color: 'grey' }}>★管理者</Typography> : ''}
        {authType === 'readonly' ? <Typography style={{ marginLeft: '40px', color: 'grey' }}>(閲覧のみ)</Typography> : ''}
      </div>
    </div>
  );
};

export default MemberList;

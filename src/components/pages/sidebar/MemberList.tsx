import { Avatar, Typography, useTheme } from '@mui/material';

const MemberList = () => {
  const theme = useTheme();
  return (
    <>
      <div style={{ margin: theme.spacing(2) }}>
        <h3>MEMBERS</h3>
        <ListItemUser name='Test User 1' />
        <ListItemUser name='Test User 2' />
        <ListItemUser name='Test User 3' />
      </div>
    </>
  );
};

const ListItemUser = (props: { name: string }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
      <Avatar alt='test' src='https://image.flaticon.com/icons/png/512/147/147144.png' />
      <Typography style={{ marginLeft: '20px' }}>{props.name}</Typography>
    </div>
  );
};

export default MemberList;

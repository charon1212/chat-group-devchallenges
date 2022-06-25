import { Avatar, Divider, Link, ListItemIcon, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';

type Props = {};
const SideBar = (props: Props) => {
  const {} = props;
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
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
        }}
      >
        <div style={{ margin: theme.spacing(2) }}>
          <h3>{' ＜ '} All channels </h3>
        </div>
        <div style={{ margin: theme.spacing(2) }}>
          <h3>FRONT-END DEVELOPERS</h3>
          Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non
        </div>
        <div style={{ margin: theme.spacing(2) }}>
          <h3>MEMBERS</h3>
          <ListItemUser name='Test User 1' />
          <ListItemUser name='Test User 2' />
          <ListItemUser name='Test User 3' />
        </div>
        <div style={{ marginTop: 'auto', backgroundColor: 'black' }}>
          <div style={{ margin: theme.spacing(2) }}>
            <Link href='#' onClick={linkClickHandler}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <Avatar alt='test' src='https://image.flaticon.com/icons/png/512/147/147144.png' />
                <Typography style={{ marginLeft: '20px' }}>ログインユーザーの表示名</Typography>
                {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </div>
            </Link>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              onClose={() => {
                setAnchorEl(null);
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                My Profile
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ForumIcon />
                </ListItemIcon>
                Tweeter
              </MenuItem>
              <Divider variant='inset' component='li' />
              <MenuItem>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                Sign Out
              </MenuItem>
            </Menu>
          </div>
        </div>
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

export default SideBar;

import { Avatar, Divider, Link, ListItemIcon, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../../app/firebase/firebase';

const UserProfile = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const signout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(JSON.stringify({ errorCode, errorMessage }));
      });
  };

  return (
    <>
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
          <MenuItem onClick={signout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default UserProfile;

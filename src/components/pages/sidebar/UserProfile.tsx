import { Avatar, Divider, Link, ListItemIcon, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useState } from 'react';
import { useUserProfileDialog } from '../../dialogs/useUserProfileDialog';
import { signout } from '../../../lib/firebase/auth/signout';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../lib/redux/slice/userSlice';
import { resetChannel } from '../../../lib/redux/slice/channelSlice';

const UserProfile = () => {
  const theme = useTheme();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const { openUserProfileDialog, UserProfileDialog } = useUserProfileDialog();

  return (
    <>
      <div style={{ margin: theme.spacing(2) }}>
        <Link href='#' onClick={linkClickHandler}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <Avatar alt='avatar image' src={user.photoUrl} />
            <Typography style={{ marginLeft: '20px' }}>{user.displayName}</Typography>
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
          <MenuItem
            onClick={() => {
              openUserProfileDialog();
            }}
          >
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
          <MenuItem
            onClick={() => {
              signout(() => {
                dispatch(resetChannel());
              });
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </div>
      {UserProfileDialog}
    </>
  );
};

export default UserProfile;

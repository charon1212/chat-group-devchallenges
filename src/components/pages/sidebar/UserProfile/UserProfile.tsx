import { Avatar, Link, Typography, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumIcon from '@mui/icons-material/Forum';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUserProfileDialog } from './useUserProfileDialog';
import { signout } from '../../../../lib/firebase/auth/signout';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { selectUser } from '../../../../lib/redux/slice/userSlice';
import { resetChannel } from '../../../../lib/redux/slice/channelSlice';
import { usePopupMenu } from './usePopupMenu';

/**
 * サイドバー下部のログインユーザー表示部品。
 */
const UserProfile = () => {
  const theme = useTheme();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const menuItems = [
    {
      menuText: 'My Profile',
      icon: <AccountCircleIcon />,
      onClick: () => {
        openUserProfileDialog();
      },
    },
    {
      menuText: 'Tweeter',
      icon: <ForumIcon />,
      onClick: () => {},
      divideBelow: true,
    },
    {
      menuText: 'Sign Out',
      icon: <ExitToAppIcon />,
      onClick: () => {
        signout(() => {
          dispatch(resetChannel());
        });
      },
    },
  ];
  const [, setAnchorEl, menuIsOpen, PopupMenu] = usePopupMenu({ menuItems });
  const { openUserProfileDialog, UserProfileDialog } = useUserProfileDialog();

  const linkClickHandler = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };
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
            {menuIsOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        </Link>
        {PopupMenu}
      </div>
      {UserProfileDialog}
    </>
  );
};

export default UserProfile;

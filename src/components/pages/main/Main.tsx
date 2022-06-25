import {
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ForumIcon from '@material-ui/icons/Forum';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import React, { createRef, useEffect } from 'react';
import SideBar from './SideBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflowY: 'hidden',
  },
  drawerBase: {
    width: theme.spacing(40),
    backgroundColor: '#080808',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  drawerContent: {
    margin: theme.spacing(2),
  },
  profileBase: {
    marginTop: 'auto',
    backgroundColor: 'black',
  },
  profileBase2: {
    margin: theme.spacing(2),
  },
  contentBase: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#282828',
  },
  contentTitleBase: {
    boxShadow: '0px 1px 10px 0px #000',
    border: '1px solid #000',
  },
  messageAreaBase: {
    height: 'auto',
    overflowY: 'hidden',
  },
  messageArea: {
    margin: theme.spacing(1, 3, 1, 1),
    overflowY: 'scroll',
    maxHeight: '100%',
  },
  inputAreaBase: {},
  divider: {
    margin: theme.spacing(1, 0, 1),
  },
}));

const Main: React.FC = () => {
  const c = useStyles();

  return (
    <>
      <div className={c.root}>
        <SideBar />
        <div className={c.contentBase}>
          <div className={c.contentTitleBase}>
            <h3>FRONT-END DEVELOPERS</h3>
          </div>
          <div className={c.messageAreaBase}>
            <div className={c.messageArea}>
              <List>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                  (index) => {
                    return (
                      <SampleListItem index={index} scroll={index === 15} />
                    );
                  }
                )}
                <table>
                  <colgroup>
                    <col style={{ width: '50%' }} />
                    <col />
                    <col style={{ width: '50%' }} />
                  </colgroup>
                  <tbody>
                    <tr>
                      <td>
                        <Divider />
                      </td>
                      <td>
                        <div
                          style={{ marginLeft: '20px', marginRight: '20px' }}
                        >
                          2020/05/01
                        </div>
                      </td>
                      <td>
                        <Divider />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </List>
            </div>
          </div>
          <div className={c.inputAreaBase}>
            {' '}
            <FormControl fullWidth>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position='end'>
                    <Button>
                      <IconButton>
                        <SendIcon />
                      </IconButton>
                    </Button>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </div>
      </div>
    </>
  );
};

const SampleListItem = (props: { index: number; scroll?: boolean }) => {
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    if (props.scroll) {
      console.log('hoge');
      ref.current?.scrollIntoView({
        block: 'end',
      });
    }
  });
  return (
    <ListItem alignItems='flex-start'>
      <ListItemAvatar ref={ref}>
        <Avatar
          alt='test'
          src='https://image.flaticon.com/icons/png/512/147/147144.png'
        />
      </ListItemAvatar>
      <ListItemText
        primary='Title'
        secondary={'sample hogehoge' + props.index}
      />
    </ListItem>
  );
};

export default Main;

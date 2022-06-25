import {
  Avatar,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  OutlinedInput,
  useTheme,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React, { createRef, useEffect } from 'react';
import SideBar from './SideBar';

const Main: React.FC = () => {

  const theme = useTheme();

  return (
    <>
      <div style={{ display: 'flex', height: '100vh', overflowY: 'hidden' }}>
        <SideBar />
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', backgroundColor: '#282828' }}>
          <div style={{ boxShadow: '0px 1px 10px 0px #000', border: '1px solid #000' }}>
            <h3>FRONT-END DEVELOPERS</h3>
          </div>
          <div style={{ height: 'auto', overflowY: 'hidden' }}>
            <div style={{ margin: theme.spacing(1, 3, 1, 1), overflowY: 'scroll', maxHeight: '100%' }}>
              <List>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => {
                  return <SampleListItem index={index} scroll={index === 15} />;
                })}
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
                        <div style={{ marginLeft: '20px', marginRight: '20px' }}>2020/05/01</div>
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
          <div>
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
        <Avatar alt='test' src='https://image.flaticon.com/icons/png/512/147/147144.png' />
      </ListItemAvatar>
      <ListItemText primary='Title' secondary={'sample hogehoge' + props.index} />
    </ListItem>
  );
};

export default Main;

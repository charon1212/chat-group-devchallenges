import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material';
import { createRef, useEffect } from 'react';
import { useScrollAt } from '../../hooks/useScrollAt';

type Props = {};
const ChatFrame = (props: Props) => {
  const theme = useTheme();
  const {} = props;
  const { ref } = useScrollAt();

  return (
    <>
      <div style={{ height: 'auto', overflowY: 'hidden' }}>
        <div style={{ margin: theme.spacing(1, 3, 1, 1), overflowY: 'scroll', maxHeight: '100%' }}>
          <List>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((index) => {
              return <ChatBox index={`${index}`} />;
            })}
            <DateDivider />
            <div ref={ref} />
          </List>
        </div>
      </div>
    </>
  );
};

type PropsChatBox = { index: string };
const ChatBox = (props: PropsChatBox) => {
  const { index } = props;
  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='test' src='https://image.flaticon.com/icons/png/512/147/147144.png' />
        </ListItemAvatar>
        <ListItemText primary='Title' secondary={'sample hogehoge' + index} />
      </ListItem>
    </>
  );
};

const DateDivider = () => {
  return (
    <>
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
    </>
  );
};

const SampleListItem = (props: { index: number; scroll?: boolean }) => {
  const ref = createRef<HTMLDivElement>();
  useEffect(() => {
    if (props.scroll) {
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

export default ChatFrame;

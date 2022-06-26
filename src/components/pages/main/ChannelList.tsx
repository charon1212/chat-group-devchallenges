import { Add, Search } from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
  FormControl,
  useTheme,
  InputAdornment,
} from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { changeChannel } from '../../../features/channel/channelSlice';

type Props = {};
const ChannelList = (props: Props) => {
  const {} = props;
  const theme = useTheme();

  const sampleChannelArray = [1, 2, 3, 4, 5];

  const dispatch = useAppDispatch();
  const onClickChannel = (i: string) => {
    dispatch(
      changeChannel({
        uid: `uid-${i}`,
        title: `title${i}`,
        description: `description${i}`,
        isDefault: false,
      })
    );
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ margin: theme.spacing(2, 2, 0) }}>
            <Typography variant='h5'>Channels</Typography>
          </div>
          <div>
            <IconButton>
              <Add color='primary' fontSize='large' />
            </IconButton>
          </div>
        </div>
        <div>
          <FormControl fullWidth>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </div>
        <List>
          {sampleChannelArray.map((i) => (
            <>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    onClickChannel(`${i}`);
                  }}
                >
                  <ListItemText primary={`チャンネル${i}`} />
                </ListItemButton>
              </ListItem>
            </>
          ))}
        </List>
      </div>
    </>
  );
};

export default ChannelList;

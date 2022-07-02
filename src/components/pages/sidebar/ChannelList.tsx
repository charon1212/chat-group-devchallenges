import { Add } from '@mui/icons-material';
import { IconButton, List, ListItem, ListItemButton, ListItemText, Typography, FormControl, useTheme } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { changeChannel } from '../../../features/channel/channelSlice';
import { useCreateChannelDialog } from '../../dialogs/useCreateChannelDialog';
import { useSearchField } from '../../hooks/useSearchField';

const ChannelList = () => {
  const theme = useTheme();

  const sampleChannelArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const { searchWord, searchFieldElement } = useSearchField();
  const { openCreateChannelDialog, createChannelDialog } = useCreateChannelDialog();
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
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ margin: theme.spacing(2, 2, 0) }}>
            <Typography variant='h5'>Channels</Typography>
          </div>
          <div>
            <IconButton
              onClick={() => {
                openCreateChannelDialog();
              }}
            >
              <Add color='primary' fontSize='large' />
            </IconButton>
          </div>
        </div>
        <div>
          <FormControl fullWidth>{searchFieldElement}</FormControl>
        </div>
        <div style={{ overflowY: 'scroll' }}>
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
      </div>
      {createChannelDialog}
    </>
  );
};

export default ChannelList;

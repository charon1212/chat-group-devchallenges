import { IconButton, useTheme } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectChannel } from '../../../features/channel/channelSlice';
import EditIcon from '@mui/icons-material/Edit';
import { useEditChannelDialog } from '../../dialogs/useEditChannelDialog';

const ChannelTitle = () => {
  const channel = useAppSelector(selectChannel);
  const theme = useTheme();

  const { openCreateChannelDialog, createChannelDialog } = useEditChannelDialog();

  return (
    <>
      <div style={{ boxShadow: '0px 1px 10px 0px #000', border: '1px solid #000' }}>
        <div style={{ margin: theme.spacing(0, 5, 0), display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{channel.title}</h3>
          <div>
            <IconButton onClick={openCreateChannelDialog}>
              <EditIcon />
            </IconButton>
          </div>
        </div>
      </div>
      {createChannelDialog}
    </>
  );
};

export default ChannelTitle;

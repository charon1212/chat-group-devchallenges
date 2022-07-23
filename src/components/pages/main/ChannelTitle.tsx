import { IconButton, useTheme } from '@mui/material';
import { useAppSelector } from '../../hooks/hooks';
import { selectChannel } from '../../../lib/redux/slice/channelSlice';
import EditIcon from '@mui/icons-material/Edit';
import { useEditChannelDialog } from '../../dialogs/useEditChannelDialog';
import { selectUser } from '../../../lib/redux/slice/userSlice';

const ChannelTitle = () => {
  const channel = useAppSelector(selectChannel);
  const user = useAppSelector(selectUser);
  const theme = useTheme();

  const { openEditChannelDialog, editChannelDialog } = useEditChannelDialog();
  const hasAdminAuthority = channel.channelAuthList.find((auth) => auth.user.uid === user.uid)?.type === 'admin';

  return (
    <>
      <div style={{ boxShadow: '0px 1px 10px 0px #000', border: '1px solid #000' }}>
        <div style={{ margin: theme.spacing(0, 5, 0), display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>{channel.title}</h3>
          <div>
            {hasAdminAuthority ? (
              <IconButton onClick={openEditChannelDialog}>
                <EditIcon />
              </IconButton>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {editChannelDialog}
    </>
  );
};

export default ChannelTitle;

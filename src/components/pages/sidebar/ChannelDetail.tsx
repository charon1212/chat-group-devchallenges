import { useTheme } from '@mui/material';
import MemberList from './MemberList';

const ChannelDetail = () => {
  const theme = useTheme();
  return (
    <>
      <div style={{ margin: theme.spacing(1) }}>
        <div style={{ margin: theme.spacing(2) }}>
          <h3>FRONT-END DEVELOPERS</h3>
          Pellentesque sagittis elit enim, sit amet ultrices tellus accumsan quis. In gravida mollis purus, at interdum arcu tempor non
        </div>
        <MemberList />
      </div>
    </>
  );
};

export default ChannelDetail;

import { Divider } from '@mui/material';

type Props = { dateString: string };
const DateDivider = (props: Props) => {
  const { dateString } = props;
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
              <div style={{ marginLeft: '20px', marginRight: '20px' }}>{dateString}</div>
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

export default DateDivider;

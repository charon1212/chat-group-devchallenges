import { Link, Typography } from '@mui/material';

type Props = { setMail: (value: string) => unknown; setPassword: (value: string) => unknown };
const TestUser = (props: Props) => {
  const { setMail, setPassword } = props;
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const createOnClickHandler = (index: number): React.MouseEventHandler<HTMLAnchorElement> => {
    return (e) => {
      e.preventDefault();
      setMail(`testuser${index}@example.com`);
      setPassword(`testuser${index}`);
    };
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '10px' }}>
        <Typography>↓TestUser for dev↓</Typography>
        {array.map((v) => (
          <>
            <Link href='#' onClick={createOnClickHandler(v)}>{`testuser${v}`}</Link>
          </>
        ))}
      </div>
    </>
  );
};

export default TestUser;

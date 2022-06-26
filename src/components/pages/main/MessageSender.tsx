import { Button, FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageSender = () => {
  return (
    <>
      <div>
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
    </>
  );
};

export default MessageSender;

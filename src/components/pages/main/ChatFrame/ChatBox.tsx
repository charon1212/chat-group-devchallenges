import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Chat } from "../../../../domain/type/Chat";
import { DateObj } from "./DateObj";

type Props = { chat: Chat & { dateObj: DateObj } };
const ChatBox = (props: Props) => {
  const { chat } = props;
  const { hour, minute, second } = chat.dateObj;
  const dateString = `${hour}:${minute}:${second}`;
  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='avatar-image' src={chat.user.photoUrl} />
        </ListItemAvatar>
        <ListItemText primary={`${chat.user.displayName}`} secondary={`${chat.chatContent} - ${dateString}`} />
      </ListItem>
    </>
  );
};

export default ChatBox;

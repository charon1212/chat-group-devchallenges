import { Channel } from "./Channel";
import { User } from "./User";

export type Chat = {
  uid: string,
  user: User,
  channel: Channel,
  chatContent: string,
  dateMilliseconds: number,
};

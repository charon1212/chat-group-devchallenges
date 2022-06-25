import { Channel } from "./Channel";
import { User } from "./User";

export type ChannelAuthority = {
  uid: string,
  user: User,
  channel: Channel,
  type: ChannelAuthType,
};

export type ChannelAuthType =
  'readonly' | // 読み取りのみ
  'readwrite' | // 読み書き
  'admin'; // 読み書き + チャンネルのメンバー招待など

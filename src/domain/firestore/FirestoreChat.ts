import { Channel } from "../type/Channel";
import { Chat } from "../type/Chat";
import { MyFirestoreKit } from "./MyFirestoreKit";

export type CollectionChat = {
  chatContent: string,
  dateMilliseconds: number,
  userUid: string,
};
export type PathParamChat = {
  channel: Channel,
};
export const myFirestoreKitChat = new MyFirestoreKit<Chat, CollectionChat, PathParamChat>({
  collectionPath: (pathParam) => `channel/${pathParam.channel.uid}/chat`,
  encode: ({ chatContent, dateMilliseconds, user }) => ({ chatContent, dateMilliseconds, userUid: user.uid }),
  decode: (uid, { chatContent, dateMilliseconds, userUid }, { channel }) => ({ uid, channel, chatContent, dateMilliseconds, user: { uid: userUid, displayName: '', photoUrl: '' } }),
});

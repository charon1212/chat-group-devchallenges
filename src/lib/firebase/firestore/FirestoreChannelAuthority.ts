import { Channel } from "../../../domain/type/Channel";
import { ChannelAuthority, ChannelAuthType } from "../../../domain/type/ChannelAuthority";
import { MyFirestoreKit } from "./MyFirestoreKit";

export type CollectionChannelAuthority = {
  authType: ChannelAuthType,
  userUid: string,
};
export type PathParamChannelAuthority = {
  channel: Channel,
};
export const myFirestoreKitChannelAuthority = new MyFirestoreKit<ChannelAuthority, CollectionChannelAuthority, PathParamChannelAuthority>({
  collectionPath: (pathParam) => `channel/${pathParam.channel.uid}/auth`,
  encode: ({ type, user }) => ({ authType: type, userUid: user.uid }),
  decode: (uid, { authType, userUid }, { channel }) => ({ uid, channel, type: authType, user: { uid: userUid, displayName: '', photoUrl: '', accessibleChannel: [], } }),
});

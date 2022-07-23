import { User } from "../../../domain/type/User";
import { MyFirestoreKit } from "./MyFirestoreKit";

export type CollectionUser = {
  displayName: string,
  photoUrl: string,
  accessibleChannel: string[],
};
export type PathParamUser = {};
export const myFirestoreKitUser = new MyFirestoreKit<User, CollectionUser, PathParamUser>({
  collectionPath: () => `user`,
  encode: ({ displayName, photoUrl, accessibleChannel }) => ({ displayName, photoUrl, accessibleChannel }),
  decode: (uid, { displayName, photoUrl, accessibleChannel }) => ({ uid, displayName, photoUrl, accessibleChannel }),
});

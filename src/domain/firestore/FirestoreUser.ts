import { User } from "../type/User";
import { MyFirestoreKit } from "./MyFirestoreKit";

export type CollectionUser = {
  displayName: string,
  photoUrl: string,
};
export type PathParamUser = {};
export const myFirestoreKitUser = new MyFirestoreKit<User, CollectionUser, PathParamUser>({
  collectionPath: () => `user`,
  encode: ({ displayName, photoUrl }) => ({ displayName, photoUrl }),
  decode: (uid, { displayName, photoUrl }) => ({ uid, displayName, photoUrl }),
});

import { Channel } from "../domain/type/Channel";
import { MyFirestoreKit } from "./MyFirestoreKit";

export type CollectionChannel = {
  title: string,
  description: string,
  isDefault: boolean,
};
export type PathParamChannel = {};
export const myFirestoreKitChannel = new MyFirestoreKit<Channel, CollectionChannel, PathParamChannel>({
  collectionPath: () => `channel`,
  encode: ({ title, description, isDefault }) => ({ title, description, isDefault }),
  decode: (uid, { title, description, isDefault }) => ({ uid, title, description, isDefault }),
});

import { User as FirebaseUser } from "firebase/auth";
import { where } from "firebase/firestore";
import { myFirestoreKitChannel } from "../../lib/firebase/firestore/FirestoreChannel";
import { myFirestoreKitChannelAuthority } from "../../lib/firebase/firestore/FirestoreChannelAuthority";
import { myFirestoreKitUser } from "../../lib/firebase/firestore/FirestoreUser";
import { User } from "../type/User";

export const addNewUser = async (firebaseUser: FirebaseUser): Promise<User> => {
  const defaultChannels = await myFirestoreKitChannel.find({}, [where("isDefault", "==", true)]);
  const user: User = {
    uid: firebaseUser.uid,
    displayName: firebaseUser.displayName || '',
    photoUrl: firebaseUser.photoURL || '',
    accessibleChannel: defaultChannels.map(({ uid }) => uid),
  };
  await Promise.all([
    myFirestoreKitUser.set({}, user.uid, user),
    ...defaultChannels.map((channel) => myFirestoreKitChannelAuthority.add({ channel }, { channel, user, uid: '', type: 'readwrite' })),
  ]);
  return user;
};

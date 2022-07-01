import { signInWithEmailAndPassword, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../app/firebase/firebase";
import { myFirestoreKitUser } from "../firestore/FirestoreUser";
import { User } from "../type/User";

export type ParamSignin = { email: string, password: string };
export const signin = async (param: ParamSignin, after?: (user: FirebaseUser) => unknown) => {
  const { email, password } = param;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user) {
      alert('Failed signin process.');
      return;
    }
    const userUid = userCredential.user.uid;
    const existingUser = await myFirestoreKitUser.get({}, userUid);
    if (!existingUser) {
      const user: User = {
        uid: userUid,
        displayName: userCredential.user.displayName || '',
        photoUrl: userCredential.user.photoURL || '',
      };
      await myFirestoreKitUser.set({}, userUid, user);
    }
    if (after) after(userCredential.user);
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    alert(JSON.stringify({ errorCode, errorMessage }));
  }
};

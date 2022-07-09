import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../app/firebase/firebase";
import { myFirestoreKitUser } from "../firestore/FirestoreUser";
import { User } from "../type/User";
import { addNewUser } from "./addNewUser";

export type ParamSignin = { email: string, password: string };
export const signin = async (param: ParamSignin, after?: (user: User) => unknown) => {
  const { email, password } = param;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user) {
      alert('Failed signin process.');
      return;
    }
    const userUid = userCredential.user.uid;
    const existingUser = await myFirestoreKitUser.get({}, userUid);
    if (existingUser) {
      if (after) after(existingUser);
    } else {
      const newUser = await addNewUser(userCredential.user);
      if (after) after(newUser);
    }
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    alert(JSON.stringify({ errorCode, errorMessage }));
  }
};

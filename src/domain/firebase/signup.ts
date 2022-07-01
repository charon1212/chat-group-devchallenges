import { createUserWithEmailAndPassword, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../app/firebase/firebase";
import { myFirestoreKitUser } from "../firestore/FirestoreUser";
import { User } from "../type/User";

export type ParamSignup = { email: string, password: string };
export const signup = async (param: ParamSignup, after?: (user: FirebaseUser) => unknown) => {
  const { email, password } = param;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user) {
        const user: User = {
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName || '',
          photoUrl: userCredential.user.photoURL || '',
        };
        myFirestoreKitUser.set({}, user.uid, user);
        if (after) after(userCredential.user);
      } else {
        alert('Failed to create new user.');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(JSON.stringify({ errorCode, errorMessage }));
    });
};

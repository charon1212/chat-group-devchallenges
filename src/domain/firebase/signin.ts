import { signInWithEmailAndPassword, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../app/firebase/firebase";

export type ParamSignin = { email: string, password: string };
export const signin = async (param: ParamSignin, after?: (user: FirebaseUser) => unknown) => {
  const { email, password } = param;
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user) {
        if (after) after(userCredential.user);
      } else {
        alert('Failed signin process.');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(JSON.stringify({ errorCode, errorMessage }));
    });
};

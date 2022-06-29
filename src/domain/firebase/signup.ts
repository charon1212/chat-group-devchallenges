import { createUserWithEmailAndPassword, User as FirebaseUser } from "firebase/auth";
import { auth } from "../../app/firebase/firebase";

export type ParamSignup = { email: string, password: string };
export const signup = async (param: ParamSignup, after?: (user: FirebaseUser) => unknown) => {
  const { email, password } = param;
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      if (userCredential.user) {
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

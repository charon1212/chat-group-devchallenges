import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { User } from "../../../domain/type/User";
import { addNewUser } from "./addNewUser";

export type ParamSignup = { email: string, password: string };
export const signup = async (param: ParamSignup, after?: (user: User) => unknown) => {
  const { email, password } = param;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (!userCredential.user) {
      alert('Failed to create new user.');
      return;
    }
    const newUser = await addNewUser(userCredential.user);
    if (after) after(newUser);
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    alert(JSON.stringify({ errorCode, errorMessage }));
  }
};

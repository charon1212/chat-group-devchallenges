import { signOut, } from "firebase/auth";
import { auth } from "../../lib/firebase/firebase";

export const signout = async (after?: () => unknown) => {
  await signOut(auth)
    .then(() => {
      if (after) after();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(JSON.stringify({ errorCode, errorMessage }));
    });
};

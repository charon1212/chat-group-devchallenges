import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../app/firebase/firebase";

export const uploadFile = async (file: File, fileName: string) => {
  const snapshot = await uploadBytes(ref(storage, fileName), file);
  return snapshot;
};

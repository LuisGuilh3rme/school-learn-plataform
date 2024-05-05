import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../firebase";
import {
  firebaseSignSchema,
  firebaseUsernameSchema,
} from "../schemas/Authentication.schemas";
import { SignProps } from "../types/Authentication.types";

const signInAsync = async (data: SignProps): Promise<string | null> => {
  const request = firebaseSignSchema.safeParse(data);

  if (request.success) {
    const response = await signInWithEmailAndPassword(
      auth,
      request.data.email,
      request.data.password,
    );
    return response.user.displayName;
  }

  throw request.error;
};

const signUpAsync = async (data: SignProps): Promise<string | null> => {
  const request = firebaseSignSchema.safeParse(data);

  if (request.success) {
    const response = await createUserWithEmailAndPassword(
      auth,
      request.data.email,
      request.data.password,
    );
    return response.user.uid;
  }

  throw request.error;
};

const setUsernameAsync = async (data: string): Promise<void> => {
  const request = firebaseUsernameSchema.safeParse(data);

  if (request.success) {
    await updateProfile(auth.currentUser!, {
      displayName: request.data.username,
    });
  }

  throw request.error;
};

const removeAccountAsync = async (): Promise<void> => {
  await auth.currentUser?.delete;
};

export { signInAsync, signUpAsync, setUsernameAsync, removeAccountAsync };

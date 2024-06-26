import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
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

const signOutAsync = async (): Promise<void> => {
  await signOut(auth);
};

const setUsernameAsync = async (data: string): Promise<void> => {
  const request = firebaseUsernameSchema.safeParse({ username: data });

  if (request.success) {
    await updateProfile(auth.currentUser!, {
      displayName: request.data.username,
    });
    return;
  }

  throw request.error;
};

const removeAccountAsync = async (): Promise<void> => {
  if (auth.currentUser) {
    await auth.currentUser?.delete();
  }
};

export {
  signInAsync,
  signUpAsync,
  signOutAsync,
  setUsernameAsync,
  removeAccountAsync,
};

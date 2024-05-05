import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase";
import { firebaseSignSchema } from "../schemas/Authentication.schemas";
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

export { signInAsync };

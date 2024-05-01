import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../firebase";
import { signInSchema } from "../../schemas/authentication/Authentication.schemas";
import { LoginProps } from "../../types/Authentication.types";

const signInAsync = async (data: LoginProps): Promise<string | null> => {
  const request = signInSchema.safeParse(data);

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

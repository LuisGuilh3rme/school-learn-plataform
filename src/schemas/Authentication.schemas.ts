import { z } from "zod";

const firebaseSignSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(6).max(20),
});

const firebaseUsernameSchema = z.object({
  username: z.string().min(6).max(30),
});

export { firebaseSignSchema, firebaseUsernameSchema };

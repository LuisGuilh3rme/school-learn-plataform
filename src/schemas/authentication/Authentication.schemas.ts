import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(6).max(20),
});

export { signInSchema };

import { z } from "zod";

const storageSchema = z.object({
  name: z.string().max(37),
});

export { storageSchema };

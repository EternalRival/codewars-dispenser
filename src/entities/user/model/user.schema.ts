import { z } from 'zod';

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  cw: z.string(),
  kata: z.string(),
});

export type User = z.infer<typeof userSchema>;

export default userSchema;

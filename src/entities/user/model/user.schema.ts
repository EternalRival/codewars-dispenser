import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  cw: z.string(),
});

export type User = z.infer<typeof userSchema>;

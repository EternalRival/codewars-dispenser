import { z } from 'zod';

export const userSchema = z.object({
  codeChallenges: z.object({
    totalCompleted: z.number(),
  }),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;

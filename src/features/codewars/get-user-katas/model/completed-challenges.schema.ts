import { z } from 'zod';

const completedChallengeSchema = z.object({
  id: z.string(),
  slug: z.string(),
});

export const completedChallengesSchema = z.object({
  totalPages: z.number(),
  data: z.array(completedChallengeSchema),
});

export type CompletedChallenges = z.infer<typeof completedChallengesSchema>;

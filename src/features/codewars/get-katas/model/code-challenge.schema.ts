import { z } from 'zod';

export const codeChallengeSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  url: z.string(),
});

export type CodeChallenge = z.infer<typeof codeChallengeSchema>;

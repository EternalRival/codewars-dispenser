import { z } from 'zod';

export const katasStateSchema = z.object({
  rawForbiddenKatas: z.string(),
  rawSuggestedKatas: z.string(),
});

export type KatasState = z.infer<typeof katasStateSchema>;

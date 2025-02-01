import { z } from 'zod';

const katasStateSchema = z.object({
  rawForbiddenKatas: z.string(),
  rawSuggestedKatas: z.string(),
});

export type KatasState = z.infer<typeof katasStateSchema>;

export default katasStateSchema;

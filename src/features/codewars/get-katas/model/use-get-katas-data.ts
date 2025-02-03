import type { CodeChallenge } from './code-challenge.schema';
import { useLazyGetKataQuery } from './codewars-katas-api-service';

export function useGetKatasData() {
  const [getKatas] = useLazyGetKataQuery();

  return async ({
    forbiddenSlugsSet,
    suggestedSlugs,
  }: {
    forbiddenSlugsSet: Set<string>;
    suggestedSlugs: string[];
  }) => {
    const getKatasResult = await Promise.all(
      suggestedSlugs.map(async (slug) => {
        const { data } = await getKatas(slug, true);

        return [slug, data] as const;
      })
    );

    return getKatasResult.reduce(
      (acc, [slug, data]) => {
        if (typeof data === 'undefined') {
          acc.notFoundKatas.add(slug);
        } else if (forbiddenSlugsSet.has(data.slug) || forbiddenSlugsSet.has(data.id)) {
          acc.forbiddenKatas.add([slug, data]);
        } else {
          acc.availableKatas.add(data);
        }

        return acc;
      },
      {
        notFoundKatas: new Set<string>(),
        forbiddenKatas: new Set<[string, CodeChallenge]>(),
        availableKatas: new Set<CodeChallenge>(),
      }
    );
  };
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { completedChallengesSchema, type CompletedChallenges } from './completed-challenges.schema';
import type { User } from '~/entities/user';

const codewarsUsersApi = createApi({
  reducerPath: 'codewarsUser',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.codewars.com/api/v1/users/' }),
  endpoints: (builder) => ({
    getUserCompletedChallengesByName: builder.query<
      { user: User; completedKatas: CompletedChallenges['data'] },
      User
    >({
      async queryFn(user, _queryApi, _extraOptions, fetchWithBQ) {
        const endpoint = `${user.cw}/code-challenges/completed`;

        const firstPageData = await fetchWithBQ(endpoint);

        if (firstPageData.error) {
          return { error: firstPageData.error };
        }

        const { data: firstPage, totalPages } = completedChallengesSchema.parse(firstPageData.data);

        const restPages = await Promise.all(
          Array.from({ length: totalPages - 1 }, async (_, i) => {
            const getKatasResult = await fetchWithBQ(`${endpoint}?page=${(i + 1).toString()}`);

            return completedChallengesSchema.transform(({ data }) => data).parse(getKatasResult.data);
          })
        );

        return { data: { user, completedKatas: firstPage.concat(...restPages) } };
      },
    }),
  }),
});

export const codewarsUsersApiReducer = { [codewarsUsersApi.reducerPath]: codewarsUsersApi.reducer };

export const codewarsUsersApiMiddleware = codewarsUsersApi.middleware;

export const { useLazyGetUserCompletedChallengesByNameQuery } = codewarsUsersApi;

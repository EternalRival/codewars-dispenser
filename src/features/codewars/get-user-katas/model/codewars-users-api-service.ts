import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userSchema } from './user.schema';
import { completedChallengesSchema, type CompletedChallenges } from './completed-challenges.schema';

const codewarsUsersApi = createApi({
  reducerPath: 'codewarsUser',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.codewars.com/api/v1/users/' }),
  endpoints: (builder) => ({
    getUserCompletedChallengesByName: builder.query<CompletedChallenges['data'], string>({
      async queryFn(user, _queryApi, _extraOptions, fetchWithBQ) {
        const getUserResult = await fetchWithBQ(user);

        if (getUserResult.error) {
          return { error: getUserResult.error };
        }

        const totalCompleted = userSchema
          .transform(({ codeChallenges: { totalCompleted } }) => totalCompleted)
          .parse(getUserResult.data);

        const completedChallenges = await Promise.all(
          Array.from({ length: Math.ceil(totalCompleted / 200) }, async (_, page) => {
            const getKatasResult = await fetchWithBQ(`${user}/code-challenges/completed?page=${page.toString()}`);

            return completedChallengesSchema.transform(({ data }) => data).parse(getKatasResult.data);
          })
        );

        return { data: completedChallenges.flat() };
      },
    }),
  }),
});

export const codewarsUsersApiReducer = { [codewarsUsersApi.reducerPath]: codewarsUsersApi.reducer };

export const codewarsUsersApiMiddleware = codewarsUsersApi.middleware;

export const { useLazyGetUserCompletedChallengesByNameQuery } = codewarsUsersApi;

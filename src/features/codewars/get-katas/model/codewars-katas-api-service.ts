import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { codeChallengeSchema, type CodeChallenge } from './code-challenge.schema';

const codewarsKatasApi = createApi({
  reducerPath: 'codewarsKatas',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.codewars.com/api/v1/code-challenges/' }),
  endpoints: (builder) => ({
    getKata: builder.query<CodeChallenge, string>({
      query: (slug) => slug,
      transformResponse: (kataData) => codeChallengeSchema.parse(kataData),
    }),
  }),
});

export const codewarsKatasApiReducer = { [codewarsKatasApi.reducerPath]: codewarsKatasApi.reducer };

export const codewarsKatasApiMiddleware = codewarsKatasApi.middleware;

export const { useLazyGetKataQuery } = codewarsKatasApi;

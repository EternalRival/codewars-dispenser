import type { User } from '~/entities/user';
import { useLazyGetUserCompletedChallengesByNameQuery } from './codewars-users-api-service';
import type { CompletedChallenges } from './completed-challenges.schema';

type CompletedKatas = CompletedChallenges['data'];

export function useGetUsersData() {
  const [getUserCompletedKatas] = useLazyGetUserCompletedChallengesByNameQuery();

  return async (users: User[]) => {
    const entries = await Promise.all(
      users.map(async (user) => {
        const { data } = await getUserCompletedKatas(user.cw, true);

        return [user.cw, data] as const;
      }, [])
    );

    return entries.reduce(
      (acc, [username, katas]) => {
        if (typeof katas === 'undefined') {
          acc.notFoundUsers.add(username);
        } else {
          acc.usersKatas.set(username, katas);
        }

        return acc;
      },
      { notFoundUsers: new Set<string>(), usersKatas: new Map<string, CompletedKatas>() }
    );
  };
}

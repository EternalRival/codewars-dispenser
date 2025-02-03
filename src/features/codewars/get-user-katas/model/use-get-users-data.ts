import type { User } from '~/entities/user';
import { useLazyGetUserCompletedChallengesByNameQuery } from './codewars-users-api-service';
import type { CompletedChallenges } from './completed-challenges.schema';

type CompletedKatas = CompletedChallenges['data'];

type Entries = [string, CompletedKatas | undefined];

export function useGetUsersData() {
  const [getUserCompletedKatas] = useLazyGetUserCompletedChallengesByNameQuery();

  return async (users: User[]) => {
    const entries = await Promise.all(
      users.reduce<Promise<Entries>[]>((acc, user) => {
        const trimmedUser = {
          id: user.id,
          name: user.name.trim(),
          cw: user.cw.trim(),
        };

        if (trimmedUser.cw) {
          acc.push(getUserCompletedKatas(user.cw, true).then(({ data }) => [user.cw, data] as const));
        }

        return acc;
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

import { useState } from 'react';
import { toast } from 'sonner';
import { useSelector } from '~/app/store';
import type { CodeChallenge } from '~/features/codewars/get-katas';
import { useGetKatasData } from '~/features/codewars/get-katas';
import { areUsersUnique, parseKataSlugs, useGetUsersData } from '~/features/codewars/get-user-katas';
import { Button } from '~/shared/ui/button';

export const DispensedKatas = () => {
  const katas = useSelector((store) => store.katas);
  const users = useSelector((store) => store.users);

  const [codewarsData, setCodewarsData] = useState({
    forbiddenKatas: new Set<[string, CodeChallenge]>(),
    notFoundKatas: new Set<string>(),
    notFoundUsers: new Set<string>(),
    possibleUsersKatas: new Map<string, CodeChallenge[]>(),
  });

  const getUsersData = useGetUsersData();
  const getKatasData = useGetKatasData();

  const updateCodewarsData = async () => {
    try {
      if (!areUsersUnique(users)) {
        throw new Error('users must be unique!');
      }

      const suggestedSlugs = parseKataSlugs(katas.rawSuggestedKatas);
      const forbiddenSlugsSet = new Set(parseKataSlugs(katas.rawForbiddenKatas));

      if (suggestedSlugs.some((slug) => forbiddenSlugsSet.has(slug))) {
        throw new Error('remove forbidden katas from suggested katas!');
      }

      const [{ notFoundUsers, usersKatas }, { availableKatas, forbiddenKatas, notFoundKatas }] = await Promise.all([
        getUsersData(users),
        getKatasData({ forbiddenSlugsSet, suggestedSlugs }),
      ]);

      const sortedAvailableKatas = Array.from(availableKatas).toSorted((a, b) => a.name.localeCompare(b.name));

      const possibleUsersKatas = usersKatas.entries().reduce(
        (acc, [username, solvedKatas]) =>
          acc.set(
            username,
            sortedAvailableKatas.filter((kata) => !solvedKatas.some((solvedKata) => solvedKata.id === kata.id))
          ),
        new Map<string, CodeChallenge[]>()
      );

      setCodewarsData({ forbiddenKatas, notFoundKatas, notFoundUsers, possibleUsersKatas });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => {
          void updateCodewarsData();
        }}
      >
        Dispense
      </Button>
      {codewarsData.notFoundUsers.size > 0 && (
        <div>
          <div className="font-medium">Not found users:</div>
          <ul className="pl-4">
            {Array.from(codewarsData.notFoundUsers.values(), (user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </div>
      )}
      {codewarsData.notFoundKatas.size > 0 && (
        <div>
          <div className="font-medium">Not found katas:</div>
          <ul className="pl-4">
            {Array.from(codewarsData.notFoundKatas.values(), (kata) => (
              <li key={kata}>{kata}</li>
            ))}
          </ul>
        </div>
      )}
      {codewarsData.forbiddenKatas.size > 0 && (
        <div>
          <div className="font-medium">Forbidden katas:</div>
          <ul className="pl-4">
            {Array.from(codewarsData.forbiddenKatas.values(), ([slug, kata]) => (
              <li key={kata.id}>
                <a
                  className="hover:underline"
                  href={kata.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {slug}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      {codewarsData.possibleUsersKatas.size > 0 && (
        <div>
          <div className="font-medium">Available Katas for Users:</div>
          <ul className="pl-4">
            {Array.from(codewarsData.possibleUsersKatas, ([username, katas]) => {
              const name = users.find((user) => user.cw === username)?.name;

              return (
                <li key={username}>
                  <div className="font-medium">
                    {username}
                    {name && ` (${name})`}
                  </div>
                  <ul className="list-['-_'] pl-4">
                    {Array.from(katas, (kata) => (
                      <li key={kata.id}>
                        <a
                          className="hover:underline"
                          href={kata.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {kata.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

import { useState } from 'react';
import { useSelector } from '~/app/store';
import { useLazyGetUserCompletedChallengesByNameQuery } from '~/features/codewars/get-user-katas';
import { Button } from '~/shared/ui/button';

const parseKataSlugs = (input: string) =>
  Array.from(input.matchAll(/codewars\.com\/kata\/([^/?#\s]+)\/?/g), ([, slug]) => slug);

export const DispensedKatas = () => {
  const katas = useSelector((store) => store.katas);
  const users = useSelector((store) => store.users);
  const [result, setResult] = useState({ forbiddenKatas: [] });

  const [getUserCompletedKatas] = useLazyGetUserCompletedChallengesByNameQuery();

  const getUsersData = () =>
    Promise.all(
      users.map(async (user) => {
        const completedKatas = await getUserCompletedKatas(user.cw, true);

        return { user, completedKatas: completedKatas.data };
      })
    );

  const getForbiddenKatasData = () =>
    Promise.all(
      parseKataSlugs(katas.rawForbiddenKatas).map(async (kata) => {
        return kata;
      })
    );

  const fn = async () => {
    const usersData = await getUsersData();

    const forbiddenKatasData = await getForbiddenKatasData();

    console.log(forbiddenKatasData);

    void usersData;
    void forbiddenKatasData;
  };

  void setResult;

  return (
    <div>
      <Button
        onClick={() => {
          // const forbiddenSlugs = new Set(parseKataSlugs(katas.rawForbiddenKatas));
          // const suggestedSlugs = new Set(parseKataSlugs(katas.rawSuggestedKatas));

          // console.log({ forbiddenSlugs, suggestedSlugs });

          void fn();
        }}
      >
        Dispense
      </Button>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

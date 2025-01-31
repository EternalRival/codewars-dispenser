import { useDispatch } from 'react-redux';
import { Fragment } from 'react/jsx-runtime';
import { useSelector } from '~/app/store';
import { updateUser } from '~/entities/user';
import { Input } from '~/shared/ui/input';

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const cols = ['Name', 'Codewars Name', 'Kata'];

  return (
    <div className="grid grid-cols-3 gap-1 p-2 text-center">
      {cols.map((text) => (
        <div key={text}>{text}</div>
      ))}

      {cols.map((v) => (
        <Input
          key={v}
          className="not-sr-only h-0 border-y-0 py-0"
        />
      ))}

      {users.map((user) => {
        const keys = ['name', 'cw', 'kata'] as const;

        return (
          <Fragment key={user.id}>
            {keys.map((prop) => (
              <Input
                key={prop}
                value={user[prop]}
                onChange={(event) => {
                  if (event.target instanceof HTMLInputElement) {
                    dispatch(updateUser({ id: user.id, prop, value: event.target.value }));
                  }
                }}
              />
            ))}
          </Fragment>
        );
      })}
    </div>
  );
};

export default UserList;

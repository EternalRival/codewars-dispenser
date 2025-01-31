import { useDispatch } from '~/app/store';
import { addUser, removeUser } from '~/entities/user';
import { Button } from '~/shared/ui/button';

const UserListControls = () => {
  const dispatch = useDispatch();

  return (
    <div className="grid gap-2">
      <Button
        onClick={() => {
          dispatch(removeUser());
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          dispatch(addUser());
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          alert('not implemented');
        }}
      >
        D
      </Button>
    </div>
  );
};

export default UserListControls;

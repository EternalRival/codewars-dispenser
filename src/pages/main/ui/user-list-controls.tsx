import { Button } from '~/shared/ui/button';
import { useUserStore } from '../model/user.store';

const UserListControls = () => {
  const { addUser, removeUser } = useUserStore();

  return (
    <div className="grid gap-2">
      <Button
        onClick={() => {
          removeUser();
        }}
      >
        -
      </Button>
      <Button
        onClick={() => {
          addUser();
        }}
      >
        +
      </Button>
      <Button
        onClick={() => {
          addUser();
        }}
      >
        D
      </Button>
    </div>
  );
};

export default UserListControls;

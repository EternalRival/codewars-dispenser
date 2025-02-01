import { useDispatch } from 'react-redux';
import { useSelector } from '~/app/store';
import { addUser, removeUser, updateUser } from '~/entities/user';
import { Button } from '~/shared/ui/button';
import { Input } from '~/shared/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/shared/ui/table';

const cols = ['name', 'cw'] as const;

const colsMap: Record<(typeof cols)[number], string> = {
  name: 'Name',
  cw: 'Codewars Name',
};

const UserList = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-2">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            {cols.map((col) => (
              <TableHead key={col}>{colsMap[col]}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              {cols.map((col) => (
                <TableCell key={col}>
                  <Input
                    value={user[col]}
                    onChange={(event) => {
                      if (event.target instanceof HTMLInputElement) {
                        dispatch(updateUser({ id: user.id, prop: col, value: event.target.value }));
                      }
                    }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-1">
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
      </div>
    </div>
  );
};

export default UserList;

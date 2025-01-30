import UserList from './user-list';
import UserListControls from './user-list-controls';

const MainPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <UserList />
      <UserListControls />
    </main>
  );
};

export default MainPage;

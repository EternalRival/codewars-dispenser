import DispensedKatas from './dispensed-katas';
import UserList from './user-list';
import UserListControls from './user-list-controls';

const MainPage = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-center">
        <UserList />
        <UserListControls />
      </div>
      <DispensedKatas />
    </main>
  );
};

export default MainPage;

import { useUserDataContext } from '@/contexts/user-data-context';

export default function Users() {
  const { users, isLoading, error } = useUserDataContext();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>Name: {user.fullname}</li>
      ))}
    </ul>
  );
}

import { useUserDataContext } from '@/contexts/user-data-context';

export default function UserCount() {
  const { users, isLoading } = useUserDataContext();

  if (isLoading) return <div>...</div>;

  return (
    <div>
      <span>Total users: {users.length}</span>
    </div>
  );
}

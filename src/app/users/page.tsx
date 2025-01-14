'use client';

import UserDataProvider from '@/contexts/user-data-context';
import Users from '../components/users';

export default function Home() {
  return (
    <div>
      <h2>Users page</h2>
      <UserDataProvider>
        <Users />
      </UserDataProvider>
    </div>
  );
}

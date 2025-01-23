'use client';

import UserDataProvider from '@/contexts/user-data-context';
import Users from './components/users';
import UserCount from './components/user-count';

export default function Home() {
  return (
    <UserDataProvider>
      <UserCount />
      <Users />
    </UserDataProvider>
  );
}

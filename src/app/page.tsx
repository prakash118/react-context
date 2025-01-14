"use client";

import UserDataProvider from '@/contexts/user-data-context';
import Users from './components/users';

export default function Home() {
  return (
    <UserDataProvider>
      <Users />
    </UserDataProvider>
  );
}

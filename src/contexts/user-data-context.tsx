'use client';

import { User } from '@/types/user';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface UserDataContextProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
}

const UserDataContext = createContext<UserDataContextProps | undefined>(
  undefined
);

export default function UserDataProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Some thing went wrong when fetching user!');
        }
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  return (
    <UserDataContext.Provider value={{ users, isLoading, error }}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserDataContext() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error(
      'useUserDataContext must be used within a UserDataProvider'
    );
  }
  return context;
}

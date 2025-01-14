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

const USER_DATASET = 'myapp-users-dataset';

const cacheData = (key: string) => {
  const timeKey = `${key}-time`;
  const now = Date.now();
  return {
    get: () => {
      const cachedData = localStorage.getItem(key);
      const cachedTime = localStorage.getItem(timeKey);
      const cacheExpiry = 60 * 60 * 1000;
      return cachedData &&
        cachedTime &&
        now - parseInt(cachedTime, 10) < cacheExpiry
        ? cachedData
        : null;
    },
    set: (data: unknown) => {
      localStorage.setItem(key, JSON.stringify(data));
      localStorage.setItem(timeKey, now.toString());
    },
    remove: () => {
      localStorage.removeItem(key);
      localStorage.removeItem(timeKey);
    },
  };
};

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
        const userCache = cacheData(USER_DATASET);
        const cachedUserData = userCache.get();
        if (cachedUserData) {
          setUsers(JSON.parse(cachedUserData));
          setIsLoading(false);
          return;
        }
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
        userCache.set(data);
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

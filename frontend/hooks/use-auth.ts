"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(requiredRole?: string) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/signin');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      if (requiredRole && parsedUser.role !== requiredRole && parsedUser.role !== 'SUPER_ADMIN') {
        router.push('/dashboard');
      }
    } catch (e) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/signin');
    } finally {
      setLoading(false);
    }
  }, [router, requiredRole]);

  return { user, loading };
}

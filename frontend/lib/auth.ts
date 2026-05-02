import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth(requiredRole?: string) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      router.push('/signin');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    if (requiredRole && parsedUser.role !== requiredRole) {
      // If super admin, they can access anything
      if (parsedUser.role !== 'SUPER_ADMIN') {
        router.push('/dashboard');
      }
    }

    setLoading(false);
  }, [router, requiredRole]);

  return { user, loading };
}

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '/signin';
}

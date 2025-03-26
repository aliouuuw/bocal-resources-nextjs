"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';

interface LogoutButtonProps {
  redirectTo?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export function LogoutButton({ 
  redirectTo = '/admin/login',
  variant = "secondary"
}: LogoutButtonProps) {
  const router = useRouter();
  const { logout } = useAuth();
  
  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const success = await logout();
      
      if (success) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <Button 
      onClick={handleLogout} 
      variant={variant}
    >
      Logout
    </Button>
  );
} 
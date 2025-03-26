"use client";

import { useAuthStore } from '@/lib/authism/stores/auth-store';
import { LoginResult } from '../types';

export function useAuth() {
  const { 
    user, 
    login, 
    logout, 
    loading, 
    error, 
    refreshUser,
    clearError 
  } = useAuthStore();

  // Transform the login method to match the expected return signature
  const wrappedLogin = async (email: string, password: string): Promise<LoginResult> => {
    const success = await login(email, password);
    return {
      success,
      error: success ? undefined : (error || 'Login failed')
    };
  };

  return {
    user,
    loading,
    error,
    login: wrappedLogin,
    logout,
    refreshUser,
    clearError,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };
}
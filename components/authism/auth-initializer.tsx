"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/authism/stores/auth-store';

export function AuthInitializer() {
  const { refreshUser } = useAuthStore();
  
  useEffect(() => {
    // Try to refresh the user on initial load
    refreshUser();
  }, [refreshUser]);
  
  // This component doesn't render anything
  return null;
} 
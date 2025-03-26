import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { User } from '@/lib/authism/types/index';
import { loginAction } from '@/app/actions/auth/login';
import { clearSession } from '@/app/actions/auth/session';
import { getUserAction } from '@/app/actions/auth/user';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
          const response = await loginAction(email, password);
          
          if (response.success && response.user) {
            set({ user: response.user, loading: false, error: null });
            return true;
          } else {
            set({ 
              user: null, 
              loading: false, 
              error: response.error || 'Login failed' 
            });
            return false;
          }
        } catch (err) {
          console.error(err);
          set({ 
            user: null, 
            loading: false, 
            error: 'An unexpected error occurred' 
          });
          return false;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await clearSession();
          set({ user: null, loading: false, error: null });
        } catch (err) {
          console.error(err);
          set({ loading: false, error: 'Logout failed' });
        }
      },

      refreshUser: async () => {
        set({ loading: true });
        try {
          const user = await getUserAction();
          set({ user, loading: false, error: null });
        } catch (err) {
          console.error(err);
          set({ user: null, loading: false, error: 'Failed to refresh user' });
        }
      },
      
      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user
      })
    }
  )
); 
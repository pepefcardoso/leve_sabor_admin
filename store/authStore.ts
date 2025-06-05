import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  id: string | null;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  lastChecked: number | null;
  sessionExpired: boolean;
  setAuthenticated: (auth: boolean) => void;
  setUser: (user: UserInfo | null) => void;
  setLastChecked: (timestamp: number | null) => void;
  setSessionExpired: (expired: boolean) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      lastChecked: null,
      sessionExpired: false,
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setUser: (user) => set({ user }),
      setLastChecked: (timestamp) => set({ lastChecked: timestamp }),
      setSessionExpired: (expired) => set({ sessionExpired: expired }),
      clearAuth: () => set({ isAuthenticated: false, user: null, lastChecked: null, sessionExpired: false }),
    }),
    {
      name: "authStore",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;

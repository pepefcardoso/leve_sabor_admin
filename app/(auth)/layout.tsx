"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import useAuthStore from "@/store/authStore";
import { AuthService } from "@/services/authService";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, sessionExpired, clearAuth } = useAuthStore();
  const router = useRouter();

  // Redireciona para login se a sessão expirar
  useEffect(() => {
    if (sessionExpired) {
      setTimeout(() => {
        clearAuth();
        router.replace("/public/login");
      }, 2000);
    }
  }, [sessionExpired, clearAuth, router]);

  // Handler de logout
  const handleLogout = async () => {
    await AuthService.logout();
    clearAuth();
    router.replace("/public/login");
  };

  return (
    <AuthGuard>
      <main className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto">
          {/* Feedback de sessão expirada */}
          {sessionExpired && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-300 animate-pulse">
              Sua sessão expirou. Redirecionando para o login...
            </div>
          )}
          {/* Exibição de informações do usuário autenticado e logout */}
          {user && (
            <div className="mb-4 flex items-center gap-4 text-gray-700 justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Usuário:</span> {user.name} (
                {user.email})
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                aria-label="Sair"
              >
                Sair
              </button>
            </div>
          )}
          {children}
        </div>
      </main>
    </AuthGuard>
  );
}

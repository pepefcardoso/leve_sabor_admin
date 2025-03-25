"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useAuthStore from "store/authStore";
import { AuthService } from "services/authService";
import { Typography } from "constants/typography";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  interface ErrorResponse {
    response?: {
      data?: {
        message?: string;
      };
    };
    request?: unknown;
  }

  const extractErrorMessage = (err: unknown): string => {
    if (err instanceof Error) return err.message;
    const error = err as ErrorResponse;
    if (error.response?.data?.message) return error.response.data.message;
    if (error.request)
      return "Erro de rede. Verifique sua conexão com a internet.";
    return "Falha no login. Verifique suas credenciais.";
  };

  useEffect(() => {
    if (token) router.push("/");
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const success = await AuthService.login(email, password);
      if (success) {
        router.push("/");
      }
    } catch (err: unknown) {
      const errorMessage = extractErrorMessage(err);
      console.log(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg p-6 sm:p-8 space-y-8 bg-primary rounded-xl shadow-2xl mx-4">
        <div className="text-left">
          <h1 className={clsx(Typography.Display)}>Bem-vindo!</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <button disabled={loading} className="w-full" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

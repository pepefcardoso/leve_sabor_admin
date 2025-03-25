"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import useAuthStore from "@/store/authStore";
import { AuthService } from "@/services/authService";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";
import CustomTextInput, { InputType } from "@/components/Inputs/CustomTextInput";
import FilledButton from "@/components/Buttons/FilledButton";

export default function Page() {
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
      <div className="w-full max-w-xl p-6 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-left space-y-2">
          <h1 className={Typography.Display}>Bem-vindo!</h1>
          <p className={clsx(Typography.Body, txtColors.gray500)}>
            Faça login para acessar a aplicação.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
          <CustomTextInput
              id="email"
              type={InputType.Email}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              autoComplete="email"
            />
            <CustomTextInput
              id="password"
              type={InputType.Password}
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <FilledButton
            text="Entrar"
            disabled={loading}
            className="w-full"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

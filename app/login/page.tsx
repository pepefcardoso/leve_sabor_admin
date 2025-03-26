"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { AuthService } from "@/services/authService";
import { Typography } from "@/constants/typography";
import { txtColors } from "@/constants/colors";
import CustomTextInput, { InputType } from "@/components/Inputs/CustomTextInput";
import FilledButton from "@/components/Buttons/FilledButton";
import useAuthStore from "@/store/authStore";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      const success = await AuthService.login(email, password);
      if (success) {
        setAuthenticated(true);
        router.replace("/");
      }
    } catch (error) {
      console.error("Login error:", error);
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

import useAuthStore from "@/store/authStore";

export const AuthService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Credenciais inválidas");
      }

      const data = await response.json();
      useAuthStore.getState().setAuthenticated(true);
      if (data.user) {
        useAuthStore.getState().setUser(data.user);
      }
      useAuthStore.getState().setSessionExpired(false);
      return true;
    } catch (error: unknown) {
      let errorMessage = "Erro desconhecido. Tente novamente.";
      if (error instanceof Error) errorMessage = error.message;
      if (errorMessage.includes("network"))
        errorMessage = "Erro de rede. Verifique sua conexão.";
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      useAuthStore.getState().clearAuth();
      if (!response.ok) {
        throw new Error("Falha ao comunicar com o servidor");
      }
      return true;
    } catch (error) {
      useAuthStore.getState().clearAuth();
      let errorMessage = "Não foi possível completar o logout. Tente novamente.";
      if (error instanceof Error) errorMessage = error.message;
      throw new Error(errorMessage);
    }
  },
};

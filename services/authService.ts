// import useAuthStore from "../store/authStore";
// import { getCurrentUser } from "./userService";

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
        throw new Error(errorData.error || "Falha no login");
      }

      // const user = await getCurrentUser();
      // useAuthStore.getState().login("", user);
      return true;
    } catch (error: unknown) {
      // useAuthStore.getState().logout();
      let errorMessage = "Please check your credentials and try again.";
      if (error instanceof Error) errorMessage = error.message;
      throw new Error(errorMessage);
    }
  },

  async logout(): Promise<boolean> {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Falha ao comunicar com o servidor");
      }

      return true;
    } catch (error) {
      console.error("Erro durante logout:", error);
      throw new Error("Não foi possível completar o logout. Tente novamente.");
    }
  },
};

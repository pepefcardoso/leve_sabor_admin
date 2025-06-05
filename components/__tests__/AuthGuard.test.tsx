import { render, screen } from "@testing-library/react";
import AuthGuard from "@/components/AuthGuard";
import useAuthStore from "@/store/authStore";
import React from "react";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ replace: jest.fn() }),
  usePathname: () => "/rota-teste",
}));

jest.mock("@/store/authStore");
const mockUseAuthStore = useAuthStore as unknown as jest.Mock;

const defaultStore = {
  isAuthenticated: false,
  lastChecked: null,
  setLastChecked: jest.fn(),
  sessionExpired: false,
  setSessionExpired: jest.fn(),
  setAuthenticated: jest.fn(),
  user: null,
};

describe("AuthGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza children se autenticado", () => {
    mockUseAuthStore.mockReturnValue({ ...defaultStore, isAuthenticated: true });
    render(
      <AuthGuard>
        <div>Conteúdo protegido</div>
      </AuthGuard>
    );
    expect(screen.getByText("Conteúdo protegido")).toBeInTheDocument();
  });

  it("renderiza skeleton se não autenticado", () => {
    mockUseAuthStore.mockReturnValue({ ...defaultStore, isAuthenticated: false });
    render(
      <AuthGuard>
        <div>Conteúdo protegido</div>
      </AuthGuard>
    );
    // O skeleton é o PageSkeleton, pode buscar por role ou snapshot, mas aqui testamos que o children não aparece
    expect(screen.queryByText("Conteúdo protegido")).not.toBeInTheDocument();
  });

  it("redireciona e exibe feedback de sessão expirada", () => {
    mockUseAuthStore.mockReturnValue({ ...defaultStore, sessionExpired: true });
    render(
      <AuthGuard>
        <div>Conteúdo protegido</div>
      </AuthGuard>
    );
    expect(screen.queryByText("Conteúdo protegido")).not.toBeInTheDocument();
    expect(screen.getByText(/sessão expirada/i)).toBeInTheDocument();
    expect(screen.getByText(/faça login novamente/i)).toBeInTheDocument();
  });
});

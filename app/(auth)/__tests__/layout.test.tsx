import { render, screen } from "@testing-library/react";
import AuthLayout from "@/app/(auth)/layout";
import useAuthStore from "@/store/authStore";
import React from "react";

jest.mock("@/store/authStore");
jest.mock("@/components/Sidebar", () => ({ __esModule: true, default: () => "<div>Sidebar</div>" }));
jest.mock("@/components/AuthGuard", () => ({ __esModule: true, default: (props: { children: React.ReactNode }) => props.children }));

const mockRouter = { replace: jest.fn() };
jest.mock("next/navigation", () => ({ useRouter: () => mockRouter }));

describe("AuthLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { name: "Test", email: "test@email.com" },
      sessionExpired: false,
      clearAuth: jest.fn(),
    });
  });

  it("renderiza layout e usuário", () => {
    render(
      <AuthLayout>
        <div>Conteúdo protegido</div>
      </AuthLayout>
    );
    expect(screen.getByText("Usuário:")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo protegido")).toBeInTheDocument();
  });
});

import { act } from "react-dom/test-utils";
import { renderHook } from "@testing-library/react";
import useAuthStore from "@/store/authStore";

describe("authStore (zustand)", () => {
  it("define e limpa autenticação corretamente", () => {
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.setAuthenticated(true);
      result.current.setUser({ id: "1", name: "User", email: "user@email.com", role: "admin" });
      result.current.setSessionExpired(true);
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.name).toBe("User");
    expect(result.current.sessionExpired).toBe(true);
    act(() => {
      result.current.clearAuth();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.sessionExpired).toBe(false);
  });
});

import { renderHook, act } from "@testing-library/react";
import * as AuthServiceModule from "@/services/authService";
import useAuthStore from "@/store/authStore";

describe("AuthService", () => {
  it("login e logout atualizam o estado do store", async () => {
    const { result } = renderHook(() => useAuthStore());
    // Mock fetch para login
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ user: { id: "1", name: "User", email: "user@email.com", role: "admin" } }),
    }) as unknown as typeof fetch;
    await act(async () => {
      await AuthServiceModule.AuthService.login("user@email.com", "senha");
    });
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user?.email).toBe("user@email.com");
    // Mock fetch para logout
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({}) }) as unknown as typeof fetch;
    await act(async () => {
      await AuthServiceModule.AuthService.logout();
    });
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});

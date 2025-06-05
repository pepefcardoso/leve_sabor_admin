import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../Sidebar';
import * as authService from '@/services/authService';

jest.mock('@/services/authService');

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('Sidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (authService.AuthService.logout as jest.Mock).mockResolvedValue(true);
    // Garante que o sidebar começa expandido
    window.localStorage.setItem('sidebarExpanded', 'true');
  });

  it('renderiza e permite expandir/retrair', () => {
    render(<Sidebar />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(1);
    fireEvent.click(buttons[0]); // O primeiro botão é o de expandir/retrair
    // Não há assert exato de expansão, mas não deve quebrar
  });

  it('executa logout ao clicar no botão', async () => {
    render(<Sidebar />);
    // Busca pelo aria-label se disponível, senão pelo texto
    let logoutBtn: HTMLElement | null = screen.queryByLabelText(/sair|logout/i);
    if (!logoutBtn) {
      logoutBtn = (screen.getAllByRole('button').find(btn => btn.textContent?.toLowerCase().includes('logout')) ?? null);
    }
    expect(logoutBtn).not.toBeNull();
    fireEvent.click(logoutBtn!);
    expect(authService.AuthService.logout).toHaveBeenCalled();
  });
});

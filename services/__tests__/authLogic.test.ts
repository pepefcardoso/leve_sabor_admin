import { authenticateUser } from '../authLogic';

global.fetch = jest.fn();

describe('authenticateUser', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('retorna sucesso e token válido', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'abc123', user: { id: 1, name: 'User' } }),
    });
    const result = await authenticateUser('user@email.com', 'senha', 'http://api');
    expect(result.success).toBe(true);
    expect(result.token).toBe('abc123');
    expect(result.user).toBeDefined();
  });

  it('retorna erro se resposta não ok', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciais inválidas' }),
    });
    const result = await authenticateUser('user@email.com', 'errada', 'http://api');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/credenciais/i);
  });

  it('retorna erro se não vier token', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: { id: 1 } }),
    });
    const result = await authenticateUser('user@email.com', 'senha', 'http://api');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/token/i);
  });
});

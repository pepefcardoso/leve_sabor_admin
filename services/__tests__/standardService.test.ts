import apiClient from '../apiClient';
import MockAdapter from 'axios-mock-adapter';
import StandardService from '../standardService';

// Mock global fetch para ambiente Node
beforeAll(() => {
  if (!global.fetch) {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ({}),
      })
    ) as unknown as typeof fetch;
  }
});

describe('StandardService', () => {
  const mock = new MockAdapter(apiClient);
  const service = new StandardService('/test-entity');

  afterEach(() => mock.reset());

  it('getAll retorna dados paginados', async () => {
    mock.onGet('/test-entity').reply(200, { data: [{ id: 1 }], total: 1 });
    const result = await service.getAll({ page: 1, per_page: 10 });
    expect(result.data).toHaveLength(1);
    expect(result.total).toBe(1);
  });

  it('getById retorna entidade', async () => {
    mock.onGet('/test-entity/1').reply(200, { id: 1 });
    const result = await service.getById('1') as unknown as { id: number };
    expect(result.id).toBe(1);
  });

  it('create envia dados e retorna entidade', async () => {
    mock.onPost('/test-entity').reply(201, { id: 2 });
    const form = new FormData();
    const result = await service.create(form) as unknown as { id: number };
    expect(result.id).toBe(2);
  });

  it('update envia dados e retorna entidade', async () => {
    mock.onPost('/test-entity/1').reply(200, { id: 1, updated: true });
    const form = new FormData();
    const result = await service.update('1', form) as unknown as { id: number; updated: boolean };
    expect(result.updated).toBe(true);
  });

  it('delete remove entidade', async () => {
    mock.onDelete('/test-entity/1').reply(204);
    await expect(service.delete('1')).resolves.toBeUndefined();
  });

  it('getAll lida com erro', async () => {
    mock.onGet('/test-entity').reply(500);
    await expect(service.getAll({ page: 1, per_page: 10 })).rejects.toThrow();
  });
});

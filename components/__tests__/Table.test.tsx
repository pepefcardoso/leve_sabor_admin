import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../Table';
import { ReactNode } from 'react';

type Row = { name: string; value: number };

const columns: { key: keyof Row; header: string; render: (value: unknown, item: Row) => ReactNode }[] = [
  {
    key: 'name',
    header: 'Nome',
    render: (_value, item) => item.name,
  },
  {
    key: 'value',
    header: 'Valor',
    render: (_value, item) => item.value,
  },
];

describe('Table', () => {
  const data: Row[] = [
    { name: 'Item 1', value: 10 },
    { name: 'Item 2', value: 20 },
  ];
  const noop = () => {};

  it('renderiza dados e headers', () => {
    render(
      <Table
        data={data}
        columns={columns}
        totalItems={2}
        itemsPerPage={2}
        currentPage={1}
        loading={false}
        onEdit={noop}
        onDelete={noop}
        onPageChange={noop}
      />
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Nome')).toBeInTheDocument();
  });

  it('exibe loading', () => {
    render(
      <Table
        data={[]}
        columns={columns}
        totalItems={0}
        itemsPerPage={2}
        currentPage={1}
        loading={true}
        onEdit={noop}
        onDelete={noop}
        onPageChange={noop}
      />
    );
    expect(screen.getByText(/carregando/i)).toBeInTheDocument();
  });

  it('aciona paginação', () => {
    const onPageChange = jest.fn();
    render(
      <Table
        data={data}
        columns={columns}
        totalItems={4}
        itemsPerPage={2}
        currentPage={1}
        loading={false}
        onEdit={noop}
        onDelete={noop}
        onPageChange={onPageChange}
      />
    );
    const nextBtn = screen.getAllByRole('button').find(btn => btn.textContent?.toLowerCase().includes('próxima'));
    if (nextBtn) fireEvent.click(nextBtn);
    expect(onPageChange).toHaveBeenCalled();
  });
});

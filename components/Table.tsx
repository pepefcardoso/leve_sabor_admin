import { ReactNode } from 'react';
import { FiEdit, FiTrash2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface TableColumn<T> {
    key: keyof T;
    header: string;
    render?: (value: unknown, item: T) => React.ReactNode;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    totalItems: number;
    itemsPerPage?: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (newItemsPerPage: number) => void;
    loading?: boolean;
}

const Table = <T extends object>({
    data,
    columns,
    onEdit,
    onDelete,
    totalItems,
    itemsPerPage = 10,
    currentPage,
    onPageChange,
    onItemsPerPageChange,
    loading = false
}: TableProps<T>) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) return;
        onPageChange(newPage);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key as string} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {column.header}
                                </th>
                            ))}
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-4 text-center">
                                    Carregando...
                                </td>
                            </tr>
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                                    Nenhum registro encontrado
                                </td>
                            </tr>
                        ) : (
                            data.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    {columns.map((column) => (
                                        <td key={column.key as string} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {column.render ? column.render(item[column.key] as unknown, item) : (item[column.key] as ReactNode)}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button onClick={() => onEdit(item)} className="text-blue-600 hover:text-blue-900" aria-label="Editar">
                                                <FiEdit size={18} />
                                            </button>
                                            <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900" aria-label="Excluir">
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between items-center sm:hidden">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="btn-pagination-mobile">
                        Anterior
                    </button>
                    <span className="text-sm text-gray-700">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn-pagination-mobile">
                        Próxima
                    </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a{' '}
                            <span className="font-medium">{Math.min(currentPage * itemsPerPage, totalItems)}</span> de{' '}
                            <span className="font-medium">{totalItems}</span> resultados
                        </p>
                    </div>
                    <div className="flex space-x-2">
                        <select
                            value={itemsPerPage}
                            onChange={(e) => {
                                const newSize = parseInt(e.target.value, 10);
                                onItemsPerPageChange?.(newSize);
                            }}
                            className="border rounded-md px-2 py-1 text-sm"
                            disabled={loading}
                        >
                            {[5, 10, 20, 50].map((size) => (
                                <option key={size} value={size}>
                                    Exibir {size}
                                </option>
                            ))}
                        </select>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || loading} className="btn-pagination">
                                <FiChevronLeft className="h-5 w-5" />
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`btn-pagination ${currentPage === page ? 'bg-blue-50 text-blue-600' : ''}`}
                                    disabled={loading}
                                >
                                    {page}
                                </button>
                            ))}
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages || loading} className="btn-pagination">
                                <FiChevronRight className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Table;

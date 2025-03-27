'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Table from '@/components/Table';
import { PostCategory } from '@/typings/post';
import routes from '@/routes/routes';
import { deletePostCategory, getPostCategories } from '@/services/postCategoryService';
import FilledButton from '@/components/Buttons/FilledButton';
import { ConfirmationModal } from '@/components/Modals/ConfirmationModal';
import { Typography } from '@/constants/typography';
import { ErrorResponse } from '@/typings/pagination';

export default function Page() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<PostCategory[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const columns = [
        {
            key: 'name' as const,
            header: 'Nome',
            render: (value: unknown) => value as string
        },
        {
            key: 'normalized_name' as const,
            header: 'Nome Normalizado',
            render: (value: unknown) => (
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                    {value as string}
                </span>
            )
        }
    ];

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getPostCategories({
                pagination: {
                    page: currentPage,
                    per_page: itemsPerPage
                }
            });
            setData(response.data);
            setTotalItems(response.total);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, itemsPerPage]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleDelete = async () => {
        if (!selectedCategory) return;
        try {
            await deletePostCategory(selectedCategory.id);
            await fetchCategories();
            setShowDeleteModal(false);
        } catch (error: unknown) {
            if (error instanceof Error && 'response' in error) {
                console.error("Erro ao excluir categoria:", (error as ErrorResponse).response?.data || error.message);
            } else {
                console.error("Erro desconhecido ao excluir categoria:", error);
            }
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className={Typography.Headline}>Categorias de Receitas</h1>
                <FilledButton text="+ Nova Categoria" href={routes.postCategories.create} />
            </div>
            <Table<PostCategory>
                data={data}
                columns={columns}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                loading={loading}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newItemsPerPage) => {
                    setItemsPerPage(newItemsPerPage);
                    setCurrentPage(1);
                }}
                onEdit={(category) => router.push(routes.postCategories.update(category.id))}
                onDelete={(category) => {
                    setSelectedCategory(category);
                    setShowDeleteModal(true);
                }}
            />
            <ConfirmationModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDelete}
                title="Confirmar exclusão"
                message={`Tem certeza que deseja excluir a categoria "${selectedCategory?.name}"?`}
            />
        </div>
    );
}

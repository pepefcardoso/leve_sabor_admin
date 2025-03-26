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

export default function PostCategoriesPage() {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
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
        },
    ];

    const fetchCategories = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getPostCategories({
                pagination: {
                    page: currentPage,
                    per_page: 10 // Usando valor fixo já que setItemsPerPage não está sendo usado
                }
            });

            setData(response.data);
            setTotalItems(response.data.length);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleDelete = async () => {
        if (!selectedCategory) return;

        try {
            await deletePostCategory(selectedCategory.id);
            await fetchCategories();
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Erro ao excluir categoria:', error);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-6 flex justify-between items-center">
                <h1 className={Typography.Headline}>Categorias de Receitas</h1>
                <FilledButton
                    text="+ Nova Categoria"
                    href={routes.postCategories.create}
                />
            </div>

            <Table<PostCategory>
                data={data}
                columns={columns}
                totalItems={totalItems}
                itemsPerPage={10}
                loading={loading}
                onPageChange={setCurrentPage}
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
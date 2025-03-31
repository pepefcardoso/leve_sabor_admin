"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import routes from "@/routes/routes";
import FilledButton from "@/components/Buttons/FilledButton";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { Typography } from "@/constants/typography";
import { ErrorResponse } from "@/typings/pagination";
import { recipeService } from "@/services";
import { Recipe } from "@/typings/recipe";
import { formatDate } from "@/tools/helper";

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Recipe[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    {
      key: "title" as const,
      header: "Título",
      render: (value: unknown) => value as string,
    },
    {
      key: "user_id" as const,
      header: "Usuário",
      render: (value: unknown) => value as string,
    },
    {
      key: "created_at" as const,
      header: "Data de Criação",
      render: (value: unknown) => formatDate(value as string),
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await recipeService.getAll({
        page: currentPage,
        per_page: itemsPerPage,
      });
      setData(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!selectedRecipe) return;
    try {
      await recipeService.delete(selectedRecipe.id);
      await fetchData();
      setShowDeleteModal(false);
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        console.error(
          "Erro ao excluir receita:",
          (error as ErrorResponse).response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido ao excluir receita:", error);
      }
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className={Typography.Headline}>Receitas</h1>
        <FilledButton
          text="+ Nova Receita"
          href={routes.recipes.create}
        />
      </div>
      <Table<Recipe>
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
        onEdit={(recipe) => router.push(routes.recipes.update(recipe.id))}
        onDelete={(recipe) => {
          setSelectedRecipe(recipe);
          setShowDeleteModal(true);
        }}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir a receita "${selectedRecipe?.title}"?`}
      />
    </div>
  );
}

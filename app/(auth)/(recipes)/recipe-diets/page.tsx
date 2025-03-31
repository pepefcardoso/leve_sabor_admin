"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { RecipeDiet } from "@/typings/recipe";
import routes from "@/routes/routes";
import FilledButton from "@/components/Buttons/FilledButton";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { Typography } from "@/constants/typography";
import { ErrorResponse } from "@/typings/pagination";
import { recipeDietService } from "@/services";

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecipeDiet[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedDiet, setSelectedDiet] =
    useState<RecipeDiet | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    {
      key: "name" as const,
      header: "Nome",
      render: (value: unknown) => value as string,
    },
    {
      key: "normalized_name" as const,
      header: "Nome Normalizado",
      render: (value: unknown) => (
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">
          {value as string}
        </span>
      ),
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await recipeDietService.getAll({
        page: currentPage,
        per_page: itemsPerPage,
      });
      setData(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error("Erro ao buscar dietas:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!selectedDiet) return;
    try {
      await recipeDietService.delete(selectedDiet.id);
      await fetchData();
      setShowDeleteModal(false);
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        console.error(
          "Erro ao excluir dieta:",
          (error as ErrorResponse).response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido ao excluir dieta:", error);
      }
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className={Typography.Headline}>Dietas de Recipe</h1>
        <FilledButton
          text="+ Nova Dieta"
          href={routes.recipeDiets.create}
        />
      </div>
      <Table<RecipeDiet>
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
        onEdit={(diet) =>
          router.push(routes.recipeDiets.update(diet.id))
        }
        onDelete={(diet) => {
          setSelectedDiet(diet);
          setShowDeleteModal(true);
        }}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir a dieta "${selectedDiet?.name}"?`}
      />
    </div>
  );
}

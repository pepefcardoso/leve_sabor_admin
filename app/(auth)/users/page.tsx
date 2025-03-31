"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import routes from "@/routes/routes";
import FilledButton from "@/components/Buttons/FilledButton";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { Typography } from "@/constants/typography";
import { ErrorResponse } from "@/typings/pagination";
import { userService } from "@/services";
import { User } from "@/typings/user";

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedUser, setUserCategory] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const columns = [
    {
      key: "id" as const,
      header: "Id",
      render: (value: unknown) => value as string,
    },
    {
      key: "name" as const,
      header: "Nome",
      render: (value: unknown) => value as string,
    },
    {
      key: "email" as const,
      header: "Email",
      render: (value: unknown) => value as string,
    },
    {
      key: "role" as const,
      header: "Função",
      render: (value: unknown) => value as string,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await userService.getAll({
        page: currentPage,
        per_page: itemsPerPage,
      });
      setData(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await userService.delete(selectedUser.id);
      await fetchData();
      setShowDeleteModal(false);
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        console.error(
          "Erro ao excluir usuário:",
          (error as ErrorResponse).response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido ao excluir usuário:", error);
      }
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className={Typography.Headline}>Usuários</h1>
        <FilledButton
          text="+ Novo Usuário"
          href={routes.users.create}
        />
      </div>
      <Table<User>
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
        onEdit={(user) =>
          router.push(routes.users.update(user.id))
        }
        onDelete={(user) => {
          setUserCategory(user);
          setShowDeleteModal(true);
        }}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir o usuário "${selectedUser?.name}"?`}
      />
    </div>
  );
}

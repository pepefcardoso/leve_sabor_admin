"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { PostTopic } from "@/typings/post";
import routes from "@/routes/routes";
import { deletePostTopic, getPostTopics } from "@/services/postTopicService";
import FilledButton from "@/components/Buttons/FilledButton";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { Typography } from "@/constants/typography";
import { ErrorResponse } from "@/typings/pagination";

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PostTopic[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<PostTopic | null>(null);
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
          {value as string}a
        </span>
      ),
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPostTopics({
        pagination: {
          page: currentPage,
          per_page: itemsPerPage,
        },
      });
      setData(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error("Erro ao buscar tópicos:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async () => {
    if (!selectedTopic) return;
    try {
      await deletePostTopic(selectedTopic.id);
      await fetchData();
      setShowDeleteModal(false);
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        console.error(
          "Erro ao excluir tópico:",
          (error as ErrorResponse).response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido ao excluir tópico:", error);
      }
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className={Typography.Headline}>Tópicos de Post</h1>
        <FilledButton
          text="+ Novo Tópico"
          href={routes.postTopics.create}
        />
      </div>
      <Table<PostTopic>
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
        onEdit={(topic) => router.push(routes.postTopics.update(topic.id))}
        onDelete={(topic) => {
          setSelectedTopic(topic);
          setShowDeleteModal(true);
        }}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir o tópico "${selectedTopic?.name}"?`}
      />
    </div>
  );
}

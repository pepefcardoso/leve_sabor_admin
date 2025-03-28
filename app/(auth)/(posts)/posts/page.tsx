"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Table from "@/components/Table";
import { Post } from "@/typings/post";
import routes from "@/routes/routes";
import FilledButton from "@/components/Buttons/FilledButton";
import { ConfirmationModal } from "@/components/Modals/ConfirmationModal";
import { Typography } from "@/constants/typography";
import { ErrorResponse } from "@/typings/pagination";
import { deletePost, getPosts } from "@/services/postService";

export default function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Post[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
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
      render: (value: unknown) => {
        const date = new Date(value as string);
        return date.toLocaleDateString("pt-BR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      },
    },
  ];  

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getPosts({
        pagination: {
          page: currentPage,
          per_page: itemsPerPage,
        },
      });
      setData(response.data);
      setTotalItems(response.total);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async () => {
    if (!selectedPost) return;
    try {
      await deletePost(selectedPost.id);
      await fetchPosts();
      setShowDeleteModal(false);
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        console.error(
          "Erro ao excluir post:",
          (error as ErrorResponse).response?.data || error.message
        );
      } else {
        console.error("Erro desconhecido ao excluir post:", error);
      }
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className={Typography.Headline}>Posts</h1>
        <FilledButton
          text="+ Novo Post"
          href={routes.posts.create}
        />
      </div>
      <Table<Post>
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
        onEdit={(post) => router.push(routes.posts.update(post.id))}
        onDelete={(post) => {
          setSelectedPost(post);
          setShowDeleteModal(true);
        }}
      />
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Confirmar exclusão"
        message={`Tem certeza que deseja excluir o post "${selectedPost?.title}"?`}
      />
    </div>
  );
}

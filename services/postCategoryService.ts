import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { PostCategory } from "@/typings/post";
import apiClient from "./apiClient";

export const getPostCategories = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<PostCategory>> => {
  try {
    const response = await apiClient.get<PaginationResponse<PostCategory>>(
      "/post-categories",
      {
        params: {
          page: pagination.page,
          per_page: pagination.per_page,
        },
      }
    );

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar categorias de postagem");
  }
};

export const getPostCategory = async (id: string): Promise<PostCategory> => {
  try {
    const response = await apiClient.get<PostCategory>(
      `/post-categories/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Falha ao buscar categoria de postagem");
  }
};

export const createPostCategory = async (
  data: FormData
): Promise<PostCategory> => {
  try {
    const response = await apiClient.post<PostCategory>(
      "/post-categories",
      data
    );
    return response.data;
  } catch {
    throw new Error("Falha ao criar categoria de postagem");
  }
};

export const updatePostCategory = async (
  id: string,
  data: FormData
): Promise<PostCategory> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<PostCategory>(
      `/post-categories/${id}`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar categoria de postagem");
  }
};

export const deletePostCategory = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/post-categories/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao deletar categoria de postagem");
  }
};

import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { Post, PostFilters } from "@/typings/post";
import apiClient from "./apiClient";

export const getPosts = async ({
  filters,
  pagination,
}: {
  filters?: PostFilters;
  pagination: PaginationParams;
}): Promise<PaginationResponse<Post>> => {
  try {
    const response = await apiClient.get<PaginationResponse<Post>>("/posts", {
      params: {
        ...filters,
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar posts");
  }
};

export const getPost = async (id: string): Promise<Post> => {
  try {
    const response = await apiClient.get<Post>(`/posts/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao buscar post");
  }
};

export const createPost = async (data: FormData): Promise<Post> => {
  try {
    const response = await apiClient.post<Post>("/posts", data);
    return response.data;
  } catch {
    throw new Error("Falha ao criar post");
  }
};

export const updatePost = async (id: string, data: FormData): Promise<Post> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<Post>(`/posts/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar post");
  }
};

export const deletePost = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/posts/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao deletar post");
  }
};

export const getMyPosts = async ({
  filters,
  pagination,
}: {
  filters?: PostFilters;
  pagination: PaginationParams;
}): Promise<PaginationResponse<Post>> => {
  try {
    const response = await apiClient.get<PaginationResponse<Post>>("/posts/my", {
      params: {
        ...filters,
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar meus posts");
  }
};

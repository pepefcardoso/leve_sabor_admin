import {
  ErrorResponse,
  PaginationParams,
  PaginationResponse,
} from "@/typings/pagination";
import { PostTopic } from "@/typings/post";
import apiClient from "./apiClient";

export const getPostTopics = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<PostTopic>> => {
  try {
    const response = await apiClient.get<PaginationResponse<PostTopic>>(
      "/post-topics",
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
    throw new Error("Falha ao buscar tópicos de postagem");
  }
};

export const getPostTopic = async (id: string): Promise<PostTopic> => {
  try {
    const response = await apiClient.get<PostTopic>(`/post-topics/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao buscar tópico de postagem");
  }
};

export const createPostTopic = async (data: FormData): Promise<PostTopic> => {
  try {
    const response = await apiClient.post<PostTopic>("/post-topics", data);
    return response.data;
  } catch {
    throw new Error("Falha ao criar tópico de postagem");
  }
};

export const updatePostTopic = async (
  id: string,
  data: FormData
): Promise<PostTopic> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<PostTopic>(
      `/post-topics/${id}`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar tópico de postagem");
  }
};

export const deletePostTopic = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/post-topics/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      console.error(
        "Erro ao deletar tópico:",
        (error as ErrorResponse).response?.data || error.message
      );
      throw new Error(
        (error as ErrorResponse).response?.data?.message ||
          "Falha ao deletar tópico de postagem"
      );
    } else {
      console.error("Erro desconhecido:", error);
      throw new Error("Falha ao deletar tópico de postagem");
    }
  }
};

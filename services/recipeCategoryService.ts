import {
  ErrorResponse,
  PaginationParams,
  PaginationResponse,
} from "@/typings/pagination";
import { RecipeCategory } from "@/typings/recipe";
import apiClient from "./apiClient";

export const getRecipeCategories = async ({
  pagination,
}: {
  pagination: PaginationParams;
}): Promise<PaginationResponse<RecipeCategory>> => {
  try {
    const response = await apiClient.get<PaginationResponse<RecipeCategory>>(
      "/recipe-categories",
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
    throw new Error("Falha ao buscar categorias de receita");
  }
};

export const getRecipeCategory = async (
  id: string
): Promise<RecipeCategory> => {
  try {
    const response = await apiClient.get<RecipeCategory>(
      `/recipe-categories/${id}`
    );
    return response.data;
  } catch {
    throw new Error("Falha ao buscar categoria de receita");
  }
};

export const createRecipeCategory = async (
  data: FormData
): Promise<RecipeCategory> => {
  try {
    const response = await apiClient.post<RecipeCategory>(
      "/recipe-categories",
      data
    );
    return response.data;
  } catch {
    throw new Error("Falha ao criar categoria de receita");
  }
};

export const updateRecipeCategory = async (
  id: string,
  data: FormData
): Promise<RecipeCategory> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<RecipeCategory>(
      `/recipe-categories/${id}`,
      data
    );
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar categoria de receita");
  }
};

export const deleteRecipeCategory = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/recipe-categories/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error && "response" in error) {
      console.error(
        "Erro ao deletar categoria:",
        (error as ErrorResponse).response?.data || error.message
      );
      throw new Error(
        (error as ErrorResponse).response?.data?.message ||
          "Falha ao deletar categoria de receita"
      );
    } else {
      console.error("Erro desconhecido:", error);
      throw new Error("Falha ao deletar categoria de receita");
    }
  }
};

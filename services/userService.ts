
import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { User } from "../typings/user";
import apiClient from "./apiClient";

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await apiClient.get<User>("/user/me");
    return response.data;
  } catch {
    throw new Error("Falha ao buscar usuário. Tente novamente");
  }
};

export const getUsers = async ({ pagination }: { pagination: PaginationParams }): Promise<PaginationResponse<User>> => {
  try {
    const response = await apiClient.get<PaginationResponse<User>>("/users", {
      params: {
        page: pagination.page,
        per_page: pagination.per_page,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      throw new Error("Resposta inválida ao buscar usuários");
    }

    return response.data;
  } catch {
    throw new Error("Falha ao buscar usuários. Tente novamente");
  }
};

export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await apiClient.get<User>(`/users/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao buscar usuário. Tente novamente");
  }
};

export const createUser = async (data: FormData): Promise<User> => {
  try {
    const response = await apiClient.post<User>("/users", data);
    return response.data;
  } catch {
    throw new Error("Falha ao criar usuário. Tente novamente");
  }
};

export const updateUser = async (id: string, data: FormData): Promise<User> => {
  try {
    data.append("_method", "PUT");
    const response = await apiClient.post<User>(`/users/${id}`, data);
    return response.data;
  } catch {
    throw new Error("Falha ao atualizar usuário. Tente novamente");
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await apiClient.delete<void>(`/users/${id}`);
    return response.data;
  } catch {
    throw new Error("Falha ao deletar usuário. Tente novamente");
  }
};

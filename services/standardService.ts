import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

class StandardService<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getAll(pagination: PaginationParams): Promise<PaginationResponse<T>> {
    try {
      const response: AxiosResponse<PaginationResponse<T>> =
        await apiClient.get(this.baseUrl, {
          params: {
            page: pagination.page,
            per_page: pagination.per_page,
          },
        });
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch data from ${this.baseUrl}, error: ${error}`
      );
    }
  }

  async getById(id: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.get(
        `${this.baseUrl}/${id}`
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch item with ID ${id} from ${this.baseUrl}, error: ${error}`
      );
    }
  }

  async create(data: FormData): Promise<T> {
    try {
      const response: AxiosResponse<T> = await apiClient.post(
        this.baseUrl,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to create item in ${this.baseUrl}, error: ${error}`
      );
    }
  }

  async update(id: string, data: FormData): Promise<T> {
    try {
      data.append("_method", "PUT");
      const response: AxiosResponse<T> = await apiClient.post(
        `${this.baseUrl}/${id}`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to update item with ID ${id} in ${this.baseUrl}, error: ${error}`
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw new Error(
        `Failed to delete item with ID ${id} from ${this.baseUrl}, error: ${error}`
      );
    }
  }
}

export default StandardService;

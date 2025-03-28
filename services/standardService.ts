import { PaginationParams, PaginationResponse } from "@/typings/pagination";
import axios, { AxiosInstance, AxiosResponse } from "axios";

class StandardService<T> {
  private apiClient: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.apiClient = axios.create({
      baseURL: "/",
    });
  }

  async getAll(pagination: PaginationParams): Promise<PaginationResponse<T>> {
    try {
      const response: AxiosResponse<PaginationResponse<T>> =
        await this.apiClient.get(this.baseUrl, {
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
      const response: AxiosResponse<T> = await this.apiClient.get(
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
      const response: AxiosResponse<T> = await this.apiClient.post(
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
      const response: AxiosResponse<T> = await this.apiClient.put(
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
      await this.apiClient.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw new Error(
        `Failed to delete item with ID ${id} from ${this.baseUrl}, error: ${error}`
      );
    }
  }
}

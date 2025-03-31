import apiClient from "./apiClient";
import { AxiosResponse } from "axios";
import StandardService from "./standardService";
import { User } from "@/typings/user";

export class UserService extends StandardService<User> {
  constructor() {
    super("/users");
  }

  async updateRole(id: string, role: string): Promise<User> {
    try {
      const data = new FormData();
      data.append("role", role);
      data.append("_method", "PUT");
      const response: AxiosResponse<User> = await apiClient.post(
        `${this.baseUrl}/update-role`,
        data
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao atualizar a role do usuário ${id}, error: ${error}`
      );
      throw new Error("Erro ao atualizar a role do usuário" + error);
    }
  }
}

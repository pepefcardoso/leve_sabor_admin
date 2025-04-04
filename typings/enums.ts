export enum RolesEnum {
  ADMIN = 1,
  INTERNAL = 2,
  USER = 3,
}

export const roleDisplayNames = {
  [RolesEnum.ADMIN]: "Administrador",
  [RolesEnum.INTERNAL]: "Interno",
  [RolesEnum.USER]: "Cliente",
};

export enum RecipeDifficultyEnum {
  "Muito Fácil" = 1,
  "Fácil" = 2,
  "Normal" = 3,
  "Difícil" = 4,
  "Muito Difícil" = 5,
}

export enum CustomerContactStatusEnum {
  RECEIVED = 1,
  IN_PROGRESS = 2,
  COMPLETED = 3,
  CANCELED = 4,
}

export const CustomerContactDisplayNames = {
  [CustomerContactStatusEnum.RECEIVED]: "Recebido",
  [CustomerContactStatusEnum.IN_PROGRESS]: "Em Andamento",
  [CustomerContactStatusEnum.COMPLETED]: "Concluído",
  [CustomerContactStatusEnum.CANCELED]: "Cancelado",
};

export enum RolesEnum {
  ADMIN = 1,
  INTERNAL = 2,
  USER = 3,
}

export const roleDisplayNames = {
  [RolesEnum.ADMIN]: "Admin",
  [RolesEnum.INTERNAL]: "Internal",
  [RolesEnum.USER]: "User",
};

export enum RecipeDifficultyEnum {
  "Muito Fácil" = 1,
  "Fácil" = 2,
  "Normal" = 3,
  "Difícil" = 4,
  "Muito Difícil" = 5,
}

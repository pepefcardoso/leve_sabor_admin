import { Image } from "./image";
import { User } from "./user";

export interface Recipe {
  id: string;
  title: string;
  description: string;
  time: number;
  portion: number;
  difficulty: number;
  category_id: string;
  category?: RecipeCategory;
  user_id: string;
  user?: User;
  ingredients?: RecipeIngredient[];
  steps?: RecipeStep[];
  diets?: RecipeDiet[];
  image?: Image;
  created_at: string;
  updated_at: string;
}

export interface RecipeCategory {
  id: string;
  name: string;
  normalized_name: string;
}

export interface RecipeDiet {
  id: string;
  name: string;
  normalized_name: string;
}

export interface RecipeIngredient {
  id: string;
  quantity: number;
  name: string;
  unit_id: string;
  unit?: RecipeUnit;
  recipe_id: string;
}

export interface RecipeStep {
  id: string;
  order: number;
  description: string;
  recipe_id: string;
}

export interface RecipeUnit {
  id: string;
  name: string;
  normalized_name: string;
}

export interface RecipeFilters {
  title?: string;
  category_id?: string;
  diets?: string[];
}

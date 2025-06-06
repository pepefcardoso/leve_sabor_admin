import { Post, PostCategory, PostTopic } from "@/typings/post";
import StandardService from "./standardService";
import {
  Recipe,
  RecipeCategory,
  RecipeDiet,
  RecipeUnit,
} from "@/typings/recipe";
import { UserService } from "./userService";

// Posts
export const postService = new StandardService<Post>("/posts");
export const postCategoryService = new StandardService<PostCategory>(
  "/post-categories"
);
export const postTopicService = new StandardService<PostTopic>("/post-topics");

// Recipes
export const recipeService = new StandardService<Recipe>("/recipes");
export const recipeDietService = new StandardService<RecipeDiet>(
  "/recipe-diets"
);
export const recipeCategoryService = new StandardService<RecipeCategory>(
  "/recipe-categories"
);
export const recipeUnitService = new StandardService<RecipeUnit>(
  "/recipe-units"
);

// Users
export const userService = new UserService();

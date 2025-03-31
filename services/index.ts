import { Post, PostCategory, PostTopic } from "@/typings/post";
import StandardService from "./standardService";
import { Recipe, RecipeCategory, RecipeDiet } from "@/typings/recipe";

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

// Users
export const userService = new StandardService<Post>("/users");

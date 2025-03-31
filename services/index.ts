import { Post, PostCategory, PostTopic } from "@/typings/post";
import StandardService from "./standardService";
import { RecipeCategory } from "@/typings/recipe";

export const postCategoryService = new StandardService<PostCategory>(
  "/post-categories"
);
export const postTopicService = new StandardService<PostTopic>("/post-topics");
export const recipeCategoryService = new StandardService<RecipeCategory>(
  "/recipe-categories"
);
export const postService = new StandardService<Post>(
  "/posts"
);
export const userService = new StandardService<Post>(
  "/users"
);

"use client";
import { useRouter } from "next/navigation";
import { createRecipeCategory } from "@/services/recipeCategoryService";
import { Typography } from "@/constants/typography";
import RecipeCategoryForm from "@/components/Forms/RecipeCategoryForm";
import routes from "@/routes/routes";

const Page = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createRecipeCategory(formData);
    router.push(routes.recipeCategories.index);
  };

  return (
    <div className="min-h-screen flex items-start mt-12">
      <div className="p-6 max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
        <h1 className={Typography.Headline}>Criar Categoria de Receita</h1>
        <RecipeCategoryForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Page;

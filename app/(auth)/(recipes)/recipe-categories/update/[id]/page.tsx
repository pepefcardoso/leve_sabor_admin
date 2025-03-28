"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getRecipeCategory,
  updateRecipeCategory,
} from "@/services/recipeCategoryService";
import { Typography } from "@/constants/typography";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import RecipeCategoryForm from "@/components/Forms/RecipeCategoryForm";
import routes from "@/routes/routes";

const UpdateRecipeCategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getRecipeCategory(id);
        setInitialData({ name: category.name });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    await updateRecipeCategory(id, formData);
    router.push(routes.recipeCategories.index);
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="min-h-screen flex items-start mt-12">
      <div className="p-6 w-full max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
        <h1 className={Typography.Headline}>Atualizar Categoria de Receita</h1>
        {initialData && (
          <RecipeCategoryForm
            initialData={initialData}
            onSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateRecipeCategoryPage;

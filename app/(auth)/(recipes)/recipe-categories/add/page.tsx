"use client";
import { useRouter } from "next/navigation";
import { Typography } from "@/constants/typography";
import routes from "@/routes/routes";
import { NameForm } from "@/components/Forms/NameForm";
import { recipeCategoryService } from "@/services";

const Page = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await recipeCategoryService.create(formData);
    router.push(routes.recipeCategories.index);
  };

  return (
    <div className="min-h-screen flex items-start mt-12">
      <div className="p-6 max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
        <h1 className={Typography.Headline}>Criar Categoria de Receita</h1>
        <NameForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Page;

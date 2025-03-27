"use client";
import { useRouter } from "next/navigation";
import { createPostCategory } from "@/services/postCategoryService";
import { Typography } from "@/constants/typography";
import PostCategoryForm from "@/components/Forms/PostCategoryForm";

const Page = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    await createPostCategory(formData);
    router.push("/post-categories");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <h1 className={Typography.Headline}>Criar Categoria de Post</h1>
      <PostCategoryForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Page;

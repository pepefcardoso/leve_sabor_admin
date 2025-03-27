"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPostCategory, updatePostCategory } from "@/services/postCategoryService";
import { Typography } from "@/constants/typography";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import PostCategoryForm from "@/components/Forms/PostCategoryForm";

const UpdatePostCategoryPage = () => {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = await getPostCategory(id);
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
    await updatePostCategory(id, formData);
    router.push("/post-categories");
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
      <h1 className={Typography.Headline}>Atualizar Categoria de Post</h1>
      {initialData && <PostCategoryForm initialData={initialData} onSubmit={handleSubmit} />}
    </div>
  );
};

export default UpdatePostCategoryPage;

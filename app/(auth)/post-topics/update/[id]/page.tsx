"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Typography } from "@/constants/typography";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import routes from "@/routes/routes";
import PostTopicForm from "@/components/Forms/PostTopicForm";
import { getPostTopic, updatePostTopic } from "@/services/postTopicService";

const UpdatePostTopicPage = () => {
  const router = useRouter();
  const params = useParams();
  const [initialData, setInitialData] = useState<{ name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const id = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topic = await getPostTopic(id);
        setInitialData({ name: topic.name });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    await updatePostTopic(id, formData);
    router.push(routes.postTopics.index);
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="min-h-screen flex items-start mt-12">
      <div className="p-6 w-full max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
        <h1 className={Typography.Headline}>Atualizar Tópico de Post</h1>
        {initialData && (
          <PostTopicForm initialData={initialData} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default UpdatePostTopicPage;

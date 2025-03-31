"use client";
import { useRouter } from "next/navigation";
import { Typography } from "@/constants/typography";
import routes from "@/routes/routes";
import { PostForm } from "@/components/Forms/PostForm";
import { useEffect, useState } from "react";
import { PostCategory, PostTopic } from "@/typings/post";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { postCategoryService, postService, postTopicService } from "@/services";

const Page = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<PostCategory[]>([]);
    const [topics, setTopics] = useState<PostTopic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, topRes] = await Promise.all([
                    postCategoryService.getAll({ page: 1, per_page: 50 }),
                    postTopicService.getAll({ page: 1, per_page: 50 })
                ]);
                setCategories(catRes.data);
                setTopics(topRes.data);
            } catch (error) {
                console.error("Error fetching data: ", error);
                router.back();
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router]);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await postService.create(formData);
            router.push(routes.posts.index);
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading)
        return (
            <PageSkeleton></PageSkeleton>
        );

    return (
        <div className="min-h-screen flex items-start mt-12">
            <div className="p-6 w-full max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
                <h1 className={Typography.Headline}>Criar Tópico de Post</h1>
                <PostForm
                    categories={categories}
                    topics={topics}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
};

export default Page;

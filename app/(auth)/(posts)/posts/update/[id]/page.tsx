"use client";
import { useParams, useRouter } from "next/navigation";
import { Typography } from "@/constants/typography";
import routes from "@/routes/routes";
import { PostForm } from "@/components/Forms/PostForm";
import { useEffect, useState } from "react";
import { PostCategory, PostTopic } from "@/typings/post";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { postCategoryService, postService, postTopicService } from "@/services";

const Page = () => {
    const router = useRouter();
    const params = useParams();
    const [categories, setCategories] = useState<PostCategory[]>([]);
    const [topics, setTopics] = useState<PostTopic[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialData, setInitialData] = useState({
        title: "",
        summary: "",
        content: "",
        category_id: "",
        topics: [] as string[],
        image_url: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, topRes, postRes] = await Promise.all([
                    postCategoryService.getAll({ page: 1, per_page: 50 }),
                    postTopicService.getAll({ page: 1, per_page: 50 }),
                    postService.getById(params.id as string),
                ]);
                setCategories(catRes.data);
                setTopics(topRes.data);
                setInitialData({
                    title: postRes.title,
                    summary: postRes.summary,
                    content: postRes.content,
                    category_id: postRes.category_id,
                    topics: postRes.topics ? postRes.topics.map((t: PostTopic) => String(t.id)) : [],
                    image_url: postRes.image?.url ?? "",
                });
            } catch (error) {
                console.error("Error fetching data", error);
                router.back();
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [router, params]);

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
            await postService.update(params.id as string, formData);
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
                <h1 className={Typography.Headline}>Editar Post</h1>
                <PostForm
                    initialData={initialData}
                    categories={categories}
                    topics={topics}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Page;

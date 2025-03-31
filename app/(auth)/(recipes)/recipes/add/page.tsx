"use client";
import { useRouter } from "next/navigation";
import { Typography } from "@/constants/typography";
import routes from "@/routes/routes";
import { useEffect, useState } from "react";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { RecipeCategory, RecipeDiet } from "@/typings/recipe";
import { recipeCategoryService, recipeDietService, recipeService } from "@/services";
import { RecipeForm } from "@/components/Forms/RecipeForm";

const Page = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<RecipeCategory[]>([]);
    const [diets, setDiets] = useState<RecipeDiet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, topRes] = await Promise.all([
                    recipeCategoryService.getAll({ page: 1, per_page: 50 }),
                    recipeDietService.getAll({ page: 1, per_page: 50 })
                ]);
                setCategories(catRes.data);
                setDiets(topRes.data);
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
            await recipeService.create(formData);
            router.push(routes.recipes.index);
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
                <h1 className={Typography.Headline}>Criar Receita</h1>
                <RecipeForm
                    categories={categories}
                    diets={diets}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
};

export default Page;

"use client";
import { useParams, useRouter } from "next/navigation";
import { Typography } from "@/constants/typography";
import routes from "@/routes/routes";
import { useEffect, useState } from "react";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import { recipeCategoryService, recipeService, recipeDietService } from "@/services";
import { RecipeCategory, RecipeDiet, RecipeIngredient, RecipeStep } from "@/typings/recipe";
import { RecipeDifficultyEnum } from "@/typings/enums";
import { RecipeForm } from "@/components/Forms/RecipeForm";

const Page = () => {
    const router = useRouter();
    const params = useParams();
    const [categories, setCategories] = useState<RecipeCategory[]>([]);
    const [diets, setDiets] = useState<RecipeDiet[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialData, setInitialData] = useState({
        title: "",
        description: "",
        time: "",
        portion: "",
        difficulty: RecipeDifficultyEnum.Normal,
        category_id: "",
        diets: [] as string[],
        ingredients: [] as RecipeIngredient[],
        steps: [] as RecipeStep[],
        image: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, dietRes, recipeRes] = await Promise.all([
                    recipeCategoryService.getAll({ page: 1, per_page: 50 }),
                    recipeDietService.getAll({ page: 1, per_page: 50 }),
                    recipeService.getById(params.id as string),
                ]);
                setCategories(catRes.data);
                setDiets(dietRes.data);
                setInitialData({
                    title: recipeRes.title,
                    description: recipeRes.description,
                    time: recipeRes.time.toString(),
                    portion: recipeRes.portion.toString(),
                    difficulty: recipeRes.difficulty,
                    category_id: recipeRes.category_id,
                    diets: recipeRes.diets
                        ? recipeRes.diets.map((d: RecipeDiet) => String(d.id))
                        : [],
                    ingredients: recipeRes.ingredients || [],
                    steps: recipeRes.steps || [],
                    image: recipeRes.image?.url ?? "",
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
            await recipeService.update(params.id as string, formData);
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
                <h1 className={Typography.Headline}>Editar Receita</h1>
                <RecipeForm
                    initialData={initialData}
                    categories={categories}
                    diets={diets}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default Page;

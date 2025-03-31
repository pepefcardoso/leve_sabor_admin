"use client";

import { RecipeDifficultyEnum } from "@/typings/enums";
import { RecipeCategory, RecipeDiet, RecipeIngredient, RecipeStep } from "@/typings/recipe";
import { useEffect, useRef, useState } from "react";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import CustomTextAreaInput from "../Inputs/CustomTextAreaInput";
import CustomInputSelect from "../Inputs/CustomSelectInput";
import CustomCheckboxInput from "../Inputs/CustomCheckboxInput";
import { IngredientForm } from "./IngredientForm";
import { Typography } from "@/constants/typography";
import Image from "next/image";
import { StepForm } from "./StepForm";
import FilledButton from "../Buttons/FilledButton";
import clsx from "clsx";
import TextButton from "../Buttons/TextButton";
import { useRouter } from "next/navigation";
import { sanitizeImageUrl } from "@/tools/helper";
import IconButton from "../Buttons/IconButton";
import { FaEdit } from "react-icons/fa";

interface FormDataValues {
  title: string;
  description: string;
  time: string;
  portion: string;
  difficulty: RecipeDifficultyEnum;
  category_id: string;
  diets: string[];
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  image: string;
}

interface RecipeFormProps {
  initialData?: FormDataValues;
  categories: RecipeCategory[];
  diets: RecipeDiet[];
  isSubmitting: boolean;
  onSubmit: (data: FormData) => Promise<void>;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, categories, diets, isSubmitting, onSubmit }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataValues>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    time: initialData?.time || "",
    portion: initialData?.portion || "",
    difficulty: initialData?.difficulty || RecipeDifficultyEnum.Normal,
    category_id: initialData?.category_id || "",
    diets: initialData?.diets || [],
    ingredients: initialData?.ingredients || [],
    steps: initialData?.steps || [],
    image: initialData?.image || "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(formData.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.image) {
      setPreviewImage(formData.image);
    }
  }, [formData.image]);

  const handleDietChange = (selected: (string | number)[]) => {
    setFormData((prev) => ({ ...prev, diets: selected.map(String) }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("time", formData.time);
    data.append("portion", formData.portion);
    data.append("difficulty", String(formData.difficulty));
    data.append("category_id", formData.category_id);
    formData.diets.forEach((dietId) => {
      data.append("diets[]", dietId);
    });
    formData.ingredients.forEach((ingredient, index) => {
      data.append(`ingredients[${index}][name]`, ingredient.name);
      data.append(`ingredients[${index}][quantity]`, String(ingredient.quantity));
      data.append(`ingredients[${index}][unit_id]`, ingredient.unit_id);
    });
    formData.steps.forEach((step, index) => {
      data.append(`steps[${index}][description]`, step.description);
    });
    if (selectedImage) data.append("image", selectedImage);
    await onSubmit(data);
  };

  const difficultyOptions = Object.values(RecipeDifficultyEnum)
    .filter((v): v is number => typeof v === "number")
    .map((value) => ({ value, label: RecipeDifficultyEnum[value] }));

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CustomTextInput
        label="Título"
        id="title"
        value={formData.title}
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        required
        maxLength={100}
        disabled={isSubmitting}
      />

      <CustomTextAreaInput
        label="Descrição"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        required
        disabled={isSubmitting}
        rows={5}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomTextInput
          label="Tempo de Preparo (minutos)"
          type={InputType.Number}
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          required
          disabled={isSubmitting}
          min={0}
        />

        <CustomTextInput
          label="Porções"
          type={InputType.Number}
          value={formData.portion}
          onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
          required
          disabled={isSubmitting}
          min={0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomInputSelect
          label="Dificuldade"
          value={formData.difficulty}
          onChange={(e) =>
            setFormData({
              ...formData,
              difficulty: Number(e.target.value) as RecipeDifficultyEnum,
            })
          }
          options={difficultyOptions}
          disabled={isSubmitting}
        />

        <CustomInputSelect
          label="Categoria"
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          options={[
            { value: "", label: "Selecione uma categoria" },
            ...categories.map((category) => ({ value: category.id, label: category.name })),
          ]}
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label className={clsx(Typography.Subtitle)}>Dietas</label>
        <CustomCheckboxInput
          options={diets.map((diet) => ({ id: String(diet.id), label: diet.name }))}
          selected={formData.diets}
          onChange={handleDietChange}
          disabled={isSubmitting}
          placeholder="Selecione as dietas"
        />
      </div>

      <div className="space-y-2">
        <label className={clsx(Typography.Subtitle)}>Ingredientes</label>
        <IngredientForm
          onIngredientsChange={(ingredients) => setFormData({ ...formData, ingredients })}
          initialIngredients={formData.ingredients}
        />
      </div>

      <div className="space-y-2">
        <label className={clsx(Typography.Subtitle)}>Passos</label>
        <StepForm onStepsChange={(steps) => setFormData({ ...formData, steps })} initialSteps={formData.steps} />
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-200 h-200">
          <Image
            src={previewImage || sanitizeImageUrl(formData.image)}
            alt="recipe_image"
            width={200}
            height={200}
            className="rounded-lg border-4 border-primary object-cover w-full h-full shadow-lg"
          />
          <div className="absolute bottom-2 right-2">
            <IconButton
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              Icon={FaEdit}
              className="bg-white rounded-full shadow-md border-2 border-tertiary"
            />
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isSubmitting}
            ref={fileInputRef}
          />
        </div>
      </div>

      <div className="flex space-x-4 justify-end mt-4">
        <TextButton
          onClick={() => router.back()}
          text="Voltar"
          disabled={isSubmitting}
        />
        <FilledButton
          text={"Salvar"}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

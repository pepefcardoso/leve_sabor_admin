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
import { z, ZodFormattedError } from 'zod';

// Esquema Zod (pode ser movido para um arquivo separado)
const recipeSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }).max(100, "O título deve ter no máximo 100 caracteres."),
  description: z.string().min(1, { message: "A descrição é obrigatória." }),
  time: z.string().min(1, { message: "O tempo de preparo é obrigatório." }).regex(/^\\d+$/, { message: "O tempo de preparo deve ser um número." }),
  portion: z.string().min(1, { message: "A porção é obrigatória." }).regex(/^\\d+$/, { message: "A porção deve ser um número." }),
  difficulty: z.nativeEnum(RecipeDifficultyEnum, { errorMap: () => ({ message: "Selecione uma dificuldade válida." }) }),
  category_id: z.string().min(1, { message: "Selecione uma categoria." }),
  diets: z.array(z.string()).optional(),
  ingredients: z.array(z.object({
    name: z.string().min(1, { message: "O nome do ingrediente é obrigatório." }),
    quantity: z.string().min(1, { message: "A quantidade é obrigatória." }).regex(/^\\d*\\.?\\d+$/, { message: "A quantidade deve ser um número válido." }),
    unit_id: z.string().min(1, { message: "Selecione uma unidade." }),
  })).min(1, { message: "Adicione pelo menos um ingrediente." }),
  steps: z.array(z.object({
    description: z.string().min(1, { message: "A descrição do passo é obrigatória." }),
  })).min(1, { message: "Adicione pelo menos um passo." }),
  image: z.string().optional(),
});


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

// Ajuste: Simplifique RecipeFormErrors para aceitar o formato do ZodFormattedError
// e use Partial<Record<keyof ...>> para os campos opcionais
export type RecipeFormErrors = ZodFormattedError<FormDataValues, string>;
export type ServerRecipeFormErrors = Partial<Record<keyof FormDataValues, string[]>>;

// Função utilitária para mapear erros do servidor para o formato RecipeFormErrors
function mapServerErrorsToFormErrors(serverErrors: ServerRecipeFormErrors): RecipeFormErrors {
  const formErrors: Partial<RecipeFormErrors> = {};
  (Object.keys(serverErrors) as (keyof FormDataValues)[]).forEach((key) => {
    if (serverErrors[key]) {
      formErrors[key] = { _errors: serverErrors[key] };
    }
  });
  return formErrors as RecipeFormErrors;
}

interface RecipeFormProps {
  initialData?: FormDataValues;
  categories: RecipeCategory[];
  diets: RecipeDiet[];
  isSubmitting: boolean;
  // Modificar onSubmit para potencialmente retornar erros do servidor
  onSubmit: (data: FormData) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
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
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<RecipeFormErrors | null>(null); // Estado para erros Zod e servidor

  useEffect(() => {
    if (initialData?.image) { // Usar initialData?.image para consistência
      setPreviewImage(sanitizeImageUrl(initialData.image));
    }
  }, [initialData?.image]);

  // Gerenciamento de previewImage e URL.createObjectURL
  useEffect(() => {
    let objectUrl: string | null = null;
    if (selectedImage) {
      objectUrl = URL.createObjectURL(selectedImage);
      setPreviewImage(objectUrl);
    }

    // Função de limpeza para revogar o object URL
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        // Se a imagem selecionada for removida, e havia uma imagem inicial,
        // redefina a visualização para a imagem inicial ou nula.
        if (!selectedImage && initialData?.image) {
            setPreviewImage(sanitizeImageUrl(initialData.image));
        } else if (!selectedImage) {
            setPreviewImage(null);
        }
      }
    };
  }, [selectedImage, initialData?.image]);


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
    setErrors(null); // Limpar erros anteriores

    const validationResult = recipeSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(validationResult.error.format());
      return;
    }

    const dataToSubmit = new FormData();
    dataToSubmit.append("title", validationResult.data.title);
    dataToSubmit.append("description", validationResult.data.description);
    dataToSubmit.append("time", validationResult.data.time);
    dataToSubmit.append("portion", validationResult.data.portion);
    dataToSubmit.append("difficulty", String(validationResult.data.difficulty));
    dataToSubmit.append("category_id", validationResult.data.category_id);
    validationResult.data.diets?.forEach((dietId) => {
      dataToSubmit.append("diets[]", dietId);
    });
    validationResult.data.ingredients.forEach((ingredient, index) => {
      dataToSubmit.append(`ingredients[${index}][name]`, ingredient.name);
      dataToSubmit.append(`ingredients[${index}][quantity]`, String(ingredient.quantity));
      dataToSubmit.append(`ingredients[${index}][unit_id]`, ingredient.unit_id);
    });
    validationResult.data.steps.forEach((step, index) => {
      dataToSubmit.append(`steps[${index}][description]`, step.description);
    });

    if (selectedImage) {
      dataToSubmit.append("image", selectedImage);
    } else if (formData.image && !initialData?.image && !selectedImage) {
      // Caso a imagem existente tenha sido removida e nenhuma nova foi selecionada
      // Isso pode ser tratado no backend para remover a imagem, ou enviar um valor específico.
      // dataToSubmit.append("image", ""); // Exemplo: enviar string vazia para indicar remoção
    }


    const result = await onSubmit(dataToSubmit);

    if (!result.success && result.errors) {
      setErrors(mapServerErrorsToFormErrors(result.errors));
    }
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
        // required // Zod lida com isso
        maxLength={100}
        disabled={isSubmitting}
        error={errors?.title?._errors?.[0]} // Exibir o primeiro erro para o campo
      />

      <CustomTextAreaInput
        label="Descrição"
        id="description" // Adicionar ID para o label e aria-describedby
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        // required
        disabled={isSubmitting}
        rows={5}
        error={errors?.description?._errors?.[0]} // Assumindo que CustomTextAreaInput também terá prop 'error'
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomTextInput
          label="Tempo de Preparo (minutos)"
          id="time"
          type={InputType.Number}
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          // required
          disabled={isSubmitting}
          min={0}
          error={errors?.time?._errors?.[0]}
        />

        <CustomTextInput
          label="Porções"
          id="portion"
          type={InputType.Number}
          value={formData.portion}
          onChange={(e) => setFormData({ ...formData, portion: e.target.value })}
          // required
          disabled={isSubmitting}
          min={0}
          error={errors?.portion?._errors?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomInputSelect
          label="Dificuldade"
          id="difficulty"
          value={String(formData.difficulty)} // Value deve ser string para select
          onChange={(e) =>
            setFormData({
              ...formData,
              difficulty: Number(e.target.value) as RecipeDifficultyEnum,
            })
          }
          options={difficultyOptions}
          disabled={isSubmitting}
          error={errors?.difficulty?._errors?.[0]} // Assumindo que CustomInputSelect também terá prop 'error'
        />

        <CustomInputSelect
          label="Categoria"
          id="category_id"
          value={formData.category_id}
          onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
          options={[
            { value: "", label: "Selecione uma categoria" },
            ...categories.map((category) => ({ value: category.id, label: category.name })),
          ]}
          // required
          disabled={isSubmitting}
          error={errors?.category_id?._errors?.[0]}
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
          // Adicionar tratamento de erro para CustomCheckboxInput se necessário
          // error={errors?.diets?._errors[0]}
        />
         {errors?.diets?._errors?.[0] && <p className="text-red-600 text-sm mt-1">{errors.diets._errors[0]}</p>}
      </div>

      <div className="space-y-2">
        <label className={clsx(Typography.Subtitle)}>Ingredientes</label>
        <IngredientForm
          onIngredientsChange={(ingredients) => setFormData({ ...formData, ingredients })}
          initialIngredients={formData.ingredients}
          // Passar erros específicos para IngredientForm se a validação Zod puder detalhar por índice
          // errors={errors?.ingredients}
        />
        {/* Exibir erro geral para ingredientes, ou erros por item dentro do IngredientForm */}
        {errors?.ingredients?._errors?.[0] && <p className="text-red-600 text-sm mt-1">{errors.ingredients._errors[0]}</p>}
        {/* Para erros por item, você precisaria iterar sobre errors?.ingredients e passar para IngredientForm */}
      </div>

      <div className="space-y-2">
        <label className={clsx(Typography.Subtitle)}>Passos</label>
        <StepForm
          onStepsChange={(steps) => setFormData({ ...formData, steps })}
          initialSteps={formData.steps}
        />
        {errors?.steps?._errors?.[0] && <p className="text-red-600 text-sm mt-1">{errors.steps._errors[0]}</p>}
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-[200px] h-[200px] overflow-hidden">
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

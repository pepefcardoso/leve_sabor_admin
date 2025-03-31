import { RecipeIngredient, RecipeUnit } from "@/typings/recipe";
import { useEffect, useState } from "react";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import CustomInputSelect from "../Inputs/CustomSelectInput";
import FilledButton from "../Buttons/FilledButton";
import { Typography } from "@/constants/typography";
import { clsx } from "clsx";
import { txtColors } from "@/constants/colors";
import { recipeUnitService } from "@/services";

interface IngredientFormProps {
  onIngredientsChange: (ingredients: RecipeIngredient[]) => void;
  initialIngredients?: RecipeIngredient[];
}

export const IngredientForm = ({
  onIngredientsChange,
  initialIngredients = [],
}: IngredientFormProps) => {
  const [units, setUnits] = useState<RecipeUnit[]>([]);
  const [ingredients, setIngredients] =
    useState<RecipeIngredient[]>(initialIngredients);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await recipeUnitService.getAll(
          { page: 1, per_page: 100 },
        );
        setUnits(response.data);
      } catch (error) {
        console.error("Error fetching units:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUnits();
  }, []);

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: "", quantity: 0, name: "", unit_id: "", recipe_id: "" },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof RecipeIngredient,
    value: string | number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value as never;
    setIngredients(newIngredients);
    onIngredientsChange(newIngredients);
  };

  return (
    <div className="space-y-4">
      <div className={clsx(Typography.Label, txtColors.gray700, "grid grid-cols-3 gap-4 mb-2")}>
        <span>Nome do Ingrediente</span>
        <span>Quantidade</span>
        <span>Unidade</span>
      </div>

      {ingredients.map((ingredient, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 items-center">
          <CustomTextInput
            type={InputType.Text}
            placeholder="Nome"
            value={ingredient.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            disabled={isLoading}
          />

          <CustomTextInput
            type={InputType.Number}
            placeholder="Quantidade"
            value={ingredient.quantity}
            onChange={(e) =>
              handleChange(index, "quantity", e.target.valueAsNumber)
            }
            disabled={isLoading}
            min={0}
          />

          <CustomInputSelect
            options={units.map(unit => ({
              value: unit.id,
              label: unit.name
            }))}
            value={ingredient.unit_id}
            onChange={(e) => handleChange(index, "unit_id", e.target.value)}
            placeholder="Selecione"
            disabled={isLoading}
          />
        </div>
      ))}

      <FilledButton
        text="Adicionar Ingrediente"
        onClick={addIngredient}
        disabled={isLoading}
      />
    </div>
  );
};
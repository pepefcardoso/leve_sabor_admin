"use client";

import { useRouter } from "next/navigation";
import FilledButton from "../Buttons/FilledButton";
import TextButton from "../Buttons/TextButton";
import { useState, FormEvent, ChangeEvent } from "react";
import CustomTextInput from "@/components/Inputs/CustomTextInput";

interface NameFormProps {
  initialData?: Record<string, string>;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const NameForm: React.FC<NameFormProps> = ({
  initialData = {},
  onSubmit,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>(initialData);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    try {
      await onSubmit(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomTextInput
        label="Nome"
        name="name"
        value={formData.name || ""}
        onChange={handleInputChange}
        disabled={loading}
      />
      <div className="flex space-x-4 justify-end mt-4">
        <TextButton text="Voltar" onClick={() => router.back()} />
        <FilledButton
          text={loading ? "Salvando..." : "Salvar"}
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

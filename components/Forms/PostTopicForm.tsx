"use client";
import { useState, FormEvent } from "react";
import FilledButton from "@/components/Buttons/FilledButton";
import CustomTextInput from "../Inputs/CustomTextInput";
import TextButton from "../Buttons/TextButton";
import routes from "@/routes/routes";

interface PostTopicFormProps {
  initialData?: {
    name: string;
  };
  onSubmit: (formData: FormData) => Promise<void>;
}

const PostTopicForm = ({ initialData, onSubmit }: PostTopicFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CustomTextInput
        label="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="flex space-x-4 justify-end">
        <TextButton text="Voltar" href={routes.postTopics.index} />
        <FilledButton
          text={loading ? "Salvando..." : "Salvar"}
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
};

export default PostTopicForm;

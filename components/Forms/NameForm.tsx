import { useRouter } from "next/router";
import FilledButton from "../Buttons/FilledButton";
import TextButton from "../Buttons/TextButton";
import { useState, FormEvent } from "react";

interface NameFormProps {
  initialData?: Record<string, string>;
  onSubmit: (formData: FormData) => Promise<void>;
}

export const NameForm: React.FC<NameFormProps> = ({
  initialData = {},
  onSubmit,
}) => {
  const router = useRouter();
  const [formData] = useState<Record<string, string>>(initialData);
  const [loading, setLoading] = useState(false);

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
      <div className="flex space-x-4 justify-end">
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

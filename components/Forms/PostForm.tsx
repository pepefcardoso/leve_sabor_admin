"use client";

import { PostCategory, PostTopic } from "@/typings/post";
import { useEffect, useRef, useState } from "react";
import CustomTextInput from "../Inputs/CustomTextInput";
import CustomTextAreaInput from "../Inputs/CustomTextAreaInput";
import CustomInputSelect from "../Inputs/CustomSelectInput";
import clsx from "clsx";
import { Typography } from "@/constants/typography";
import CustomCheckboxInput from "../Inputs/CustomCheckboxInput";
import Image from "next/image";
import FilledButton from "../Buttons/FilledButton";
import TextButton from "../Buttons/TextButton";
import { useRouter } from "next/navigation";

interface FormDataValues {
  title: string;
  summary: string;
  content: string;
  category_id: string;
  topics: string[];
  image_url: string;
}

interface PostFormProps {
  initialData?: FormDataValues;
  categories: PostCategory[];
  topics: PostTopic[];
  isSubmitting: boolean;
  onSubmit: (data: FormData) => Promise<void>;
}

export const PostForm: React.FC<PostFormProps> = ({ initialData, categories, topics, isSubmitting, onSubmit }) => {
  const [formData, setFormData] = useState<FormDataValues>({
    title: initialData?.title || "",
    summary: initialData?.summary || "",
    content: initialData?.content || "",
    category_id: initialData?.category_id || "",
    topics: initialData?.topics || [],
    image_url: initialData?.image_url || "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(formData.image_url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.image_url) {
      setPreviewImage(formData.image_url);
    }
  }, [formData.image_url]);

  const handleTopicChange = (selectedTopics: (string | number)[]) => {
    setFormData((prev) => ({ ...prev, topics: selectedTopics.map(String) }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("summary", formData.summary);
    data.append("content", formData.content);
    data.append("category_id", formData.category_id);
    formData.topics.forEach((topic) => {
      data.append("topics[]", topic);
    });
    if (selectedImage) data.append("image", selectedImage);
    await onSubmit(data);
  };

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
        label="Resumo"
        value={formData.summary}
        onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
        required
        maxLength={255}
        disabled={isSubmitting}
      />

      <CustomTextAreaInput
        label="Conteúdo"
        value={formData.content}
        onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
        required
        rows={8}
        disabled={isSubmitting}
      />

      <CustomInputSelect
        label="Categoria"
        options={categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))}
        value={formData.category_id}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            category_id: e.target.value,
          }))
        }
        placeholder="Selecione uma categoria"
        disabled={isSubmitting}
        required
      />

      <CustomCheckboxInput
        options={topics.map((topic) => ({
          id: String(topic.id),
          label: topic.name,
        }))}
        selected={formData.topics}
        onChange={handleTopicChange}
        disabled={isSubmitting}
        placeholder="Selecione os tópicos"
        label="Tópicos"
      />

      <div className="h-full flex flex-col gap-8">
        <label className={clsx(Typography.Subtitle)}>Imagem do Post</label>
        <div className="flex flex-col items-center gap-6 ">
          {previewImage && (
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-[300px] h-[200px] rounded-md shadow-md overflow-hidden">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={300}
                  height={200}
                  className="object-cover rounded-md hover:opacity-80 transition-all"
                />
              </div>
            </div>
          )}

          <FilledButton
            text={previewImage ? "Alterar Imagem" : "Selecionar Arquivo"}
            onClick={() => fileInputRef.current?.click()}
            disabled={isSubmitting}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex justify-end items-center gap-4">
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

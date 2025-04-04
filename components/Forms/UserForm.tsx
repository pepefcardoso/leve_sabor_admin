import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CustomTextInput, { InputType } from "../Inputs/CustomTextInput";
import FilledButton from "../Buttons/FilledButton";
import { FiEdit2 } from "react-icons/fi";
import TextButton from "../Buttons/TextButton";
import routes from "@/routes/routes";
import IconButton from "../Buttons/IconButton";
import { sanitizeImageUrl } from "@/tools/helper";
import { roleDisplayNames, RolesEnum } from "@/typings/enums";
import CustomInputSelect from "../Inputs/CustomSelectInput";

interface FormDataValues {
  name: string;
  birthday: string;
  phone: string;
  email: string;
  image?: string;
  role?: RolesEnum;
};

interface UserFormProps {
  initialData?: FormDataValues;
  isSubmitting: boolean;
  onSubmit: (data: FormData) => Promise<void>;
  onRoleChange: (role: RolesEnum) => Promise<void>;
}

export const UserForm: React.FC<UserFormProps> = ({ initialData, isSubmitting, onSubmit, onRoleChange }) => {
  const [formData, setFormData] = useState<FormDataValues>({
    name: initialData?.name || "",
    birthday: initialData?.birthday || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    image: initialData?.image,
    role: initialData?.role || RolesEnum.USER,
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(formData.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (formData.image) {
      setPreviewImage(formData.image);
    }
  }, [formData.image]);

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
    data.append("name", formData.name);
    data.append("birthday", formData.birthday);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    if (selectedImage) data.append("image", selectedImage);
    await onSubmit(data);
  };

  const handleRoleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = Number(e.target.value) as RolesEnum;
    setFormData(prev => ({ ...prev, role: newRole }));

    if (onRoleChange) {
      await onRoleChange(newRole);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-48 h-48">
          <Image
            src={previewImage || sanitizeImageUrl(formData.image)}
            alt="Perfil"
            width={192}
            height={192}
            className="rounded-full border-4 border-primary object-cover w-full h-full shadow-lg"
          />
          <div className="absolute bottom-2 right-2">
            <IconButton
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              Icon={FiEdit2}
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

      <div className="space-y-6">
        <CustomTextInput
          label="Nome"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Nome"
          disabled={isSubmitting}
        />

        <CustomTextInput
          label="Email"
          type={InputType.Email}
          name="email"
          value={formData.email}
          disabled
        />

        <CustomTextInput
          label="Data de Nascimento"
          type={InputType.Date}
          name="birthday"
          value={formData.birthday}
          onChange={(e) => setFormData((prev) => ({ ...prev, birthday: e.target.value }))}
          placeholder="Data de Nascimento"
          disabled={isSubmitting}
        />

        <CustomTextInput
          name="phone"
          label="Telefone"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          placeholder="Telefone"
          disabled={isSubmitting}
          type={InputType.Tel}
        />

        {initialData && (
          <CustomInputSelect
            label="Função"
            options={Object.values(RolesEnum)
              .filter(value => typeof value === 'number')
              .map((role) => ({
                value: role.toString(),
                label: roleDisplayNames[role as RolesEnum]
              }))}
            value={formData.role?.toString() || ''}
            onChange={handleRoleChange}
            disabled={isSubmitting}
            className="mt-1"
          />
        )}
      </div>

      <div className="flex space-x-4 justify-end mt-4">
        <TextButton
          href={routes.users.index}
          text="Voltar"
          disabled={isSubmitting}
        />
        <FilledButton
          type="submit"
          text="Salvar"
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
};

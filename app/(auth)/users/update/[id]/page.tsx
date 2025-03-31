"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Typography } from "@/constants/typography";
import PageSkeleton from "@/components/Skeletons/PageSkeleton";
import routes from "@/routes/routes";
import { userService } from "@/services";
import { UserForm } from "@/components/Forms/UserForm";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialData, setInitialData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
    image_url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await userService.getById(id);
        setInitialData({
          name: user.name,
          email: user.email,
          phone: user.phone,
          birthday: user.birthday,
          image_url: user.image?.url ?? "",
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      await userService.update(params.id as string, formData);
      router.push(routes.users.index);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <PageSkeleton />;

  return (
    <div className="min-h-screen flex items-start mt-12">
      <div className="p-6 w-full max-w-2xl mx-auto space-y-6 bg-white rounded-lg shadow-md">
        <h1 className={Typography.Headline}>Editar Usuário</h1>
        {initialData && (
          <UserForm
            initialData={initialData}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default Page;

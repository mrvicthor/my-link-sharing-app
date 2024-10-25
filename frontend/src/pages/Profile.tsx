import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { FieldError, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneContainer from "@/components/PhoneContainer";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import IconChangesSaved from "@/assets/images/icon-changes-saved.svg";
import ProfileInput from "@/components/ProfileInput";
import ImageInput from "@/components/ImageInput";
const MAX_FILE_SIZE = 1000000;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

const profileSchema = z.object({
  "First name": z.string().min(1, { message: "Can't be empty" }),
  "Last name": z.string().min(1, { message: "Can't be empty" }),
  imageUrl: z.string(),
  Email: z.string().email({ message: "Invalid email" }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      Email: user.email,
      "First name": user.firstName,
      "Last name": user.lastName,
      imageUrl: user.image,
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setImageError(null);
    setImagePreview(null);
    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setValue("imageUrl", base64String);
      };
      reader.readAsDataURL(file);
      // setImagePreview(URL.createObjectURL(file));
    }
  };

  const {
    mutate: updateProfile,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createProfile,
    onSuccess: () =>
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } max-w-md w-[24rem] bg-[#333333] shadow-lg rounded-lg pointer-events-auto py-3 px-4 text-white flex gap-2 ring-1 ring-black ring-opacity-5`}
        >
          <div>
            <img src={IconChangesSaved} alt="changes-saved-icon" />
          </div>
          <p>Your changes have been successfully saved!</p>
        </div>
      )),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });

  const onSubmit = async (data: ProfileFormData) => {
    const { email, ...rest } = data;
    updateProfile(rest);
  };
  return (
    <section className="container md:px-6">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="lg:grid lg:grid-wrapper gap-6">
        <div className="box-phone hidden lg:flex lg:justify-center bg-[#ffffff] py-20 rounded-md">
          <PhoneContainer />
        </div>
        <div className="box-links bg-[#ffffff] pt-6 rounded-md pb-6">
          {isError && <p className="text-red-500">Error updating profile</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <h1 className="font-bold text-2xl px-6 capitalize">
              profile details
            </h1>
            <p className="text-[#737373] text-sm mt-4 opacity-80 px-6 w-full">
              Add your details to add a personal touch to your profile
            </p>

            <ImageInput
              handleImageUpload={handleImageUpload}
              imageUrl={user.image}
              imageError={imageError}
              imagePreview={imagePreview}
              error={errors.imageUrl as FieldError}
            />
            <div className="mx-6 bg-[#fafafa] px-4 mt-6 rounded-md py-4 text-[#737373]">
              <ProfileInput
                register={register}
                fieldName="firstName"
                error={errors["First name"] as FieldError}
                label="First name"
                type="text"
              />
              <ProfileInput
                register={register}
                fieldName="lastName"
                error={errors["Last name"] as FieldError}
                label="Last name"
                type="text"
              />
              <ProfileInput
                register={register}
                fieldName="email"
                error={errors.Email as FieldError}
                label="Email"
                type="email"
              />
            </div>
            <hr className="mt-4" />
            <div className="flex justify-end mt-4 px-6">
              <Button
                type="submit"
                variant={"saveButton"}
                disabled={!isDirty || isPending}
                className={`bg-[#633cff] hover:bg-[#beadff] w-full md:w-auto`}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;

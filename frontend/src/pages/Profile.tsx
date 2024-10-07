import PhoneContainer from "@/components/PhoneContainer";
import UploadIcon from "@/assets/images/icon-upload-image.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/lib/api";
import toast from "react-hot-toast";

import { useState } from "react";

const MAX_FILE_SIZE = 1000000;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

const profileSchema = z.object({
  firstName: z.string().min(1, { message: "Can't be empty" }),
  lastName: z.string().min(1, { message: "Can't be empty" }),
  image: z.object({
    data: z.instanceof(File).or(z.string()),
    contentType: z.string(),
  }),
  email: z.string().email({ message: "Invalid email" }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const queryClient = useQueryClient();
  const [imageError, setImageError] = useState<string | null>(null);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const resizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > 800) {
              height *= 800 / width;
              width = 800;
            }
          } else {
            if (height > 800) {
              width *= 800 / height;
              height = 800;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(file.type, 0.7);
          resolve(dataUrl);
        };
        img.src = event.target!.result as string;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageError(null);
    if (file) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setImageError(
          "File type not supported. Please upload a JPEG, PNG, or WebP image."
        );
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setImageError("Image is too large. Please try a smaller image.");
        return;
      }

      setValue("image", {
        data: file,
        contentType: file.type,
      });
    }
  };

  const {
    mutate: updateProfile,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createProfile,
    onSuccess: () => toast.success("Profile updated successfully"),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["auth"] }),
  });

  const onSubmit = async (data: ProfileFormData) => {
    console.log(data);
    const { email, ...rest } = data;
    if (rest.image && rest.image.data instanceof File) {
      try {
        const resizedImage = await resizeImage(rest.image.data);
        rest.image.data = resizedImage;
      } catch (error) {
        console.error("Error resizing image:", error);
        setImageError("Error processing image. Please try again.");
        return;
      }
    }
    updateProfile(rest);
  };
  return (
    <section className="container md:px-6">
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
            <div className="bg-[#fafafa] mt-6 px-4 py-4 mx-6 rounded-md h-[14.56rem] flex gap-x-4 items-center justify-between text-[#737373]">
              <p>Profile picture</p>
              <div className="flex items-center gap-x-4 px-4">
                <label
                  htmlFor="profile-picture"
                  className="h-[12.0625rem] w-[12.0625rem] bg-[#efebff] text-[#633cff] rounded-md flex flex-col gap-y-3 items-center justify-center cursor-pointer"
                >
                  <img src={UploadIcon} alt="profile picture" />
                  <span className="flex">+ Upload Image</span>
                </label>
                <input
                  type="file"
                  id="profile-picture"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
                <p>
                  Image must be below 1024x1024px. <br />
                  Use PNG or JPG format.
                </p>
                {imageError && <span>{imageError}</span>}
                {errors.image && (
                  <p className="text-[#ff3939]">Image upload failed</p>
                )}
              </div>
            </div>
            <div className="mx-6 bg-[#fafafa] px-4 mt-6 rounded-md py-4 text-[#737373]">
              <div className="flex items-center justify-between gap-x-4">
                <label
                  htmlFor="firstName"
                  className={`capitalize font-light text-sm basis-1/3 ${
                    errors.firstName && "text-[#ff3939]"
                  }`}
                >
                  First name<sup>*</sup>
                </label>
                <div
                  className={`${
                    errors.firstName
                      ? "border-[#ff3939] border"
                      : "input-wrapper"
                  } basis-2/3 register-form-input flex`}
                >
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    placeholder="e.g. alex@email.com "
                    aria-invalid={errors.firstName ? "true" : "false"}
                  />
                  {errors.firstName && (
                    <p role="alert" className="text-[#ff3939] flex-item-3">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between gap-x-4">
                <label
                  htmlFor="lastName"
                  className={`capitalize font-light text-sm basis-1/3 ${
                    errors.lastName && "text-[#ff3939]"
                  }`}
                >
                  Last name<sup>*</sup>
                </label>
                <div
                  className={`${
                    errors.lastName
                      ? "border-[#ff3939] border"
                      : "input-wrapper"
                  } basis-2/3 register-form-input flex`}
                >
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    placeholder="e.g. alex@email.com "
                    aria-invalid={errors.lastName ? "true" : "false"}
                  />
                  {errors.lastName && (
                    <p role="alert" className="text-[#ff3939] flex-item-3">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-1 flex items-center justify-between gap-x-4">
                <label
                  htmlFor="email"
                  className={`capitalize font-light text-sm basis-1/3 ${
                    errors.email && "text-[#ff3939]"
                  }`}
                >
                  Email address
                </label>
                <div
                  className={`${
                    errors.email ? "border-[#ff3939] border" : "input-wrapper"
                  } basis-2/3 register-form-input flex`}
                >
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    placeholder="e.g. alex@email.com "
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p role="alert" className="text-[#ff3939] flex-item-3">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
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

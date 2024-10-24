import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProfile } from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhoneContainer from "@/components/PhoneContainer";
import UploadIcon from "@/assets/images/icon-upload-image.svg";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import IconChangesSaved from "@/assets/images/icon-changes-saved.svg";
import WhiteIconUpload from "@/assets/images/icon-upload-white-image.svg";
const MAX_FILE_SIZE = 1000000;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];

const profileSchema = z.object({
  firstName: z.string().min(1, { message: "Can't be empty" }),
  lastName: z.string().min(1, { message: "Can't be empty" }),
  image: z.string(),
  email: z.string().email({ message: "Invalid email" }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

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
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
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

      console.log(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("result", reader);
        setImagePreview(base64String);
        setValue("image", base64String);
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
            <div className="bg-[#fafafa] mt-6 px-4 py-4 mx-6 rounded-md h-[14.56rem] flex gap-x-4 items-center justify-between text-[#737373]">
              <p>Profile picture</p>
              <div className="flex items-center gap-x-4 px-4">
                <label
                  htmlFor="profile-picture"
                  className="h-[12.0625rem] w-[12.0625rem] overflow-hidden group/item bg-[#efebff] text-[#633cff] rounded-md flex flex-col gap-y-3 items-center justify-center cursor-pointer"
                >
                  {user.image ? (
                    <div className="relative h-full ">
                      <img
                        src={user.image}
                        alt="profile picture"
                        className="rounded-md"
                      />
                      <div className="group/edit invisible group-hover/item:visible absolute top-[50%]  -translate-x-[50%] left-[50%] -translate-y-[50%] flex flex-col items-center justify-center">
                        <img src={WhiteIconUpload} alt="profile picture" />
                        <span className="flex text-white">Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <img src={UploadIcon} alt="profile picture" />
                      <span className="flex">+ Upload Image</span>
                    </>
                  )}
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
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 h-24 w-24 rounded-full"
                  />
                )}
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

import PhoneContainer from "@/components/PhoneContainer";
import UploadIcon from "@/assets/images/icon-upload-image.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  firstName: z.string().min(1, { message: "Can't be empty" }),
  lastName: z.string().min(1, { message: "Can't be empty" }),
  image: z.object({
    data: z.string(),
    contentType: z.string(),
  }),
  email: z.string().email({ message: "Invalid email" }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user.email,
    },
  });

  const onSubmit = (data: ProfileFormData) => console.log(data);
  return (
    <section className="container md:px-6">
      <div className="lg:grid lg:grid-wrapper gap-6">
        <div className="box-phone hidden lg:flex lg:justify-center bg-[#ffffff] py-20 rounded-md">
          <PhoneContainer />
        </div>
        <div className="box-links bg-[#ffffff] pt-6 rounded-md pb-6">
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
                <input type="file" id="profile-picture" hidden />
                <p>
                  Image must be below 1024x1024px. <br />
                  Use PNG or JPG format.
                </p>
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
                disabled={!isDirty}
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

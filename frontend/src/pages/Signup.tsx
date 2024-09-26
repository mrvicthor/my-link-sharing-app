import z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import AppLogo from "@/assets/images/logo-devlinks-large.svg";
import EmailIcon from "@/assets/images/icon-email.svg";
import PasswordIcon from "@/assets/images/icon-password.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createUser } from "@/lib/api";

const registerSchema = z
  .object({
    email: z
      .string({ message: "Can't be empty" })
      .email({ message: "Invalid email" }),
    password: z
      .string({ message: "Please check again" })
      .min(8, { message: "Please check again" }),
    confirmPassword: z
      .string({ message: "Please check again" })
      .min(8, { message: "Please check again" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;
const Signup = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });
  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });
  const onSubmit = (data: RegisterFormData) => createAccount(data);

  return (
    <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem]">
      <section className="login-wrapper">
        <div className="text-center flex devlinks-logo md:justify-center">
          <img src={AppLogo} alt="devlinks logo" />
        </div>
        {isError && (
          <p className="text-center text-2xl mt-4 text-[#ff3939]">
            {error.message || "An error occurred"}
          </p>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white login-form mt-10 rounded-lg py-10 px-6"
        >
          <h1 className="text-2xl font-bold">Create account</h1>
          <p className="mt-1 text-[#737373] text-sm ">
            Let's get you started sharing your links
          </p>
          <div className="mt-6">
            <label
              htmlFor="email"
              className={`capitalize font-light text-sm ${
                errors.email && "text-[#ff3939]"
              }`}
            >
              Email address
            </label>
            <div className="input-wrapper register-form-input flex">
              <img src={EmailIcon} alt="email icon" />
              <input
                type="email"
                id="email"
                {...register("email", { required: true })}
                placeholder="e.g. alex@email.com "
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <p role="alert" className="text-[#ff3939] flex-item-3 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              className={`capitalize font-light text-sm ${
                errors.password && "text-[#ff3939]"
              }`}
              htmlFor="password"
            >
              create password
            </label>
            <div className="input-wrapper register-form-input flex">
              <img src={PasswordIcon} alt="password icon" />
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                placeholder="At least 8 characters"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p role="alert" className="text-[#ff3939] flex-item-3 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              className={`capitalize font-light text-sm ${
                errors.confirmPassword && "text-[#ff3939]"
              }`}
              htmlFor="confirmPassword"
            >
              confirm password
            </label>
            <div className="input-wrapper register-form-input flex">
              <img src={PasswordIcon} alt="password icon" />
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", { required: true })}
                placeholder="At least 8 characters"
                aria-invalid={errors.confirmPassword ? "true" : "false"}
              />
              {errors.confirmPassword && (
                <p role="alert" className="text-[#ff3939] flex-item-3 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <Button
            variant={"primary"}
            type="submit"
            disabled={isPending || !isDirty}
          >
            Create new account
          </Button>
          <p className="mt-6 text-[#737373] text-center text-sm">
            Already have an account?
            <a href="/login" target="_self" className="text-[#633cff] ">
              Login
            </a>
          </p>
        </form>
      </section>
    </section>
  );
};

export default Signup;

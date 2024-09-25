import EmailIcon from "@/assets/images/icon-email.svg";
import AppLogo from "@/assets/images/logo-devlinks-large.svg";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { sendPasswordResetEmail } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const passwordResetSchema = z.object({
  email: z
    .string({ message: "Can't be empty" })
    .email({ message: "Invalid email" }),
});

type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });
  const {
    mutate: sendPasswordReset,
    error,
    isError,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
  });
  console.log("error", error, isSuccess, isError);

  const onSubmit = (data: PasswordResetFormData) =>
    sendPasswordReset(data.email);
  return (
    <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem] ">
      <div className="text-center flex devlinks-logo md:justify-center mb-4">
        <img src={AppLogo} alt="devlinks logo" />
      </div>
      <div>
        {isError && (
          <p className="text-center text-2xl mt-4 text-[#ff3939]">
            {error?.message || "An error occurred"}
          </p>
        )}
        {isSuccess ? (
          <div className="bg-white login-form mt-10 rounded-lg py-10 px-6">
            <Alert variant="success">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Email sent! Check your inbox to reset your password
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white login-form mt-10 rounded-lg py-10 px-6"
          >
            <h1 className="text-2xl font-bold">Reset password</h1>
            <div className="mt-6">
              <label
                htmlFor="email"
                className={`capitalize font-light text-sm ${
                  errors.email && "text-[#ff3939]"
                }`}
              >
                Email address
              </label>
              <div
                className={`${
                  errors.email ? "border-[#ff3939] border" : "input-wrapper"
                } register-form-input flex`}
              >
                <img src={EmailIcon} alt="email icon" />
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  placeholder="e.g. alex@email.com "
                  aria-invalid={errors.email ? "true" : "false"}
                  className="bg-transparent"
                />
                {errors.email && (
                  <p role="alert" className="text-[#ff3939]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              variant={"primary"}
              type="submit"
              disabled={isPending || !isDirty}
            >
              Reset password
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ForgotPassword;

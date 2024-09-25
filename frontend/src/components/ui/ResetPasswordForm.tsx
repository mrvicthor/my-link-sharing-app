import { Button } from "./button";
import PasswordIcon from "@/assets/images/icon-password.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "@/lib/api";
type ResetPasswordFormProps = {
  code: string;
};

const passwordResetSchema = z.object({
  password: z
    .string({ message: "Can't be empty" })
    .min(8, { message: "At least 8 characters" }),
});

type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
const ResetPasswordForm = ({ code }: ResetPasswordFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<PasswordResetFormData>({
    resolver: zodResolver(passwordResetSchema),
  });

  const {
    mutate: resetUserPassword,
    isError,
    isSuccess,
    error,
    isPending,
  } = useMutation({
    mutationFn: resetPassword,
  });
  const onSubmit = (data: PasswordResetFormData) =>
    resetUserPassword({ verificationCode: code, password: data.password });
  return (
    <>
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
            <AlertDescription>Password updated successfully</AlertDescription>
          </Alert>
          <div className="flex justify-center mt-4">
            <Button asChild variant={"link"}>
              <Link to="/login" replace>
                Login
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white login-form mt-10 rounded-lg py-10 px-6"
        >
          <h1 className="text-2xl font-bold">Change your password</h1>
          <div className="mt-4">
            <label
              className={`font-light text-sm ${
                errors.password && "text-[#ff3939]"
              }`}
              htmlFor="password"
            >
              New password
            </label>
            <div
              className={`${
                errors.password ? "border-[#ff3939] border" : "input-wrapper"
              } register-form-input flex`}
            >
              <img src={PasswordIcon} alt="password icon" />
              <input
                type="password"
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password && (
                <p role="alert" className="text-[#ff3939]">
                  {errors.password.message}
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
    </>
  );
};

export default ResetPasswordForm;

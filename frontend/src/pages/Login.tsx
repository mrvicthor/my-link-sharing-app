import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import AppLogo from "@/assets/images/logo-devlinks-large.svg";
import EmailIcon from "@/assets/images/icon-email.svg";
import PasswordIcon from "@/assets/images/icon-password.svg";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api";

const loginSchema = z.object({
  email: z
    .string({ message: "Can't be empty" })
    .email({ message: "Invalid email" }),
  password: z.string({ message: "Please check again" }),
});

type LoginFormData = z.infer<typeof loginSchema>;
function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectUrl = location.state?.redirectUrl || "/";
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const {
    mutate: loginUser,
    isPending,
    isError,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, { replace: true });
    },
  });

  const onSubmit = (data: LoginFormData) => loginUser(data);

  return (
    <>
      <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem] ">
        <section className="login-wrapper">
          <div className="text-center flex devlinks-logo md:justify-center">
            <img src={AppLogo} alt="devlinks logo" />
          </div>
          {isError && (
            <p className="text-center text-2xl mt-4 text-[#ff3939]">
              Invalid email or password
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white login-form mt-10 rounded-lg py-10 px-6"
          >
            <h1 className="text-2xl capitalize font-bold">login</h1>
            <p className="mt-1 text-[#737373] text-sm ">
              Add your details below to get back into the app
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
                />
                {errors.email && (
                  <p role="alert" className="text-[#ff3939] flex-item-3">
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
                password
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
                  <p role="alert" className="text-[#ff3939] flex-item-3">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant={"primary"}
              disabled={!isDirty || isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>
            <p className="mt-6 text-[#737373] text-center text-sm">
              Don't have an account?
              <a href="/signup" target="_self" className="text-[#633cff] ">
                Create account
              </a>
            </p>
            <Button
              asChild
              variant={"link"}
              className="text-[#633cff] text-center w-full"
            >
              <Link to="/password/forgot">Forgot password?</Link>
            </Button>
          </form>
        </section>
      </section>
    </>
  );
}

export default Login;

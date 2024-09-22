import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppLogo from "@/assets/images/logo-devlinks-large.svg";
import EmailIcon from "@/assets/images/icon-email.svg";
import PasswordIcon from "@/assets/images/icon-password.svg";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z
    .string({ message: "Can't be empty" })
    .email({ message: "Invalid email" }),
  password: z.string({ message: "Please check again" }),
});

type LoginFormData = z.infer<typeof loginSchema>;
function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };
  return (
    <>
      <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem] ">
        <section className="login-wrapper">
          <div className="text-center flex devlinks-logo md:justify-center">
            <img src={AppLogo} alt="devlinks logo" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white login-form mt-10 rounded-lg py-10 px-6"
          >
            <h1 className="text-2xl capitalize font-bold">login</h1>
            <p className="mt-1 text-[#737373] text-sm ">
              Add your details below to get back into the app
            </p>
            <div className="mt-6">
              <label htmlFor="email" className="capitalize font-light text-sm">
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
                  <p role="alert" className="text-[#ff3939]">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label
                className="capitalize font-light text-sm"
                htmlFor="password"
              >
                password
              </label>
              <div
                className={`${
                  errors.email ? "border-[#ff3939] border" : "input-wrapper"
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
            <Button type="submit" variant={"primary"} disabled={!isDirty}>
              Login
            </Button>
            <p className="mt-6 text-[#737373] text-center text-sm">
              Don't have an account?
              <a href="/signup" target="_self" className="text-[#633cff] ">
                Create account
              </a>
            </p>
          </form>
        </section>
      </section>
    </>
  );
}

export default Login;

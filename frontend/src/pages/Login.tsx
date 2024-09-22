import React from "react";
import AppLogo from "@/assets/images/logo-devlinks-large.svg";
import EmailIcon from "@/assets/images/icon-email.svg";
import PasswordIcon from "@/assets/images/icon-password.svg";
import { Button } from "@/components/ui/button";

function Login() {
  return (
    <>
      <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem] ">
        <section className="login-wrapper">
          <div className="text-center flex devlinks-logo md:justify-center">
            <img src={AppLogo} alt="devlinks logo" />
          </div>
          <form className="bg-white login-form mt-10 rounded-lg py-10 px-6">
            <h1 className="text-2xl capitalize font-bold">login</h1>
            <p className="mt-1 text-[#737373] text-sm ">
              Add your details below to get back into the app
            </p>
            <div className="mt-2">
              <label htmlFor="email" className="capitalize font-light text-sm">
                Email address
              </label>
              <div className="input-wrapper register-form-input flex">
                <img src={EmailIcon} alt="email icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="e.g. alex@email.com "
                />
              </div>
            </div>
            <div className="mt-1">
              <label
                className="capitalize font-light text-sm"
                htmlFor="password"
              >
                password
              </label>
              <div className="input-wrapper register-form-input flex">
                <img src={PasswordIcon} alt="password icon" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <Button variant={"primary"}>Login</Button>
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

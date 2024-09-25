import AppLogo from "@/assets/images/logo-devlinks-large.svg";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ResetPasswordForm from "@/components/ui/resetPasswordForm";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();
  const linkIsValid = code && exp && exp > now;
  return (
    <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem] ">
      <div className="text-center flex devlinks-logo md:justify-center mb-4">
        <img src={AppLogo} alt="devlinks logo" />
      </div>
      <div>
        {!linkIsValid ? (
          <div className="bg-white login-form mt-10 rounded-lg py-10 px-6">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Invalid link</AlertTitle>
              <AlertDescription>
                The link is either invalid or expired
              </AlertDescription>
            </Alert>
            <div>
              <Button asChild variant={"link"}>
                <Link to="/password/forgot" replace>
                  Request a new password reset link
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <ResetPasswordForm code={code} />
        )}
      </div>
    </section>
  );
};

export default ResetPassword;

import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const { code } = useParams();
  const { isError, isPending, isSuccess } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code as string),
  });
  return (
    <section className="container mx-auto max-w-[29.75rem] px-4 w-[90%] mt-[8.875rem] ">
      <div>
        {isPending ? (
          <div className="flex justify-center">
            <Button>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </Button>
          </div>
        ) : (
          <Alert variant={isError ? "destructive" : "success"}>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{isError ? "Error" : "Success"}</AlertTitle>
            <AlertDescription>
              {isError && "Invalid token or verification expired"}
              {isSuccess && "Email verified successfully"}
            </AlertDescription>
          </Alert>
        )}
      </div>
      {isError && (
        <div className="flex justify-center mt-4">
          <Button asChild variant={"link"}>
            <Link to="/password/forgot" replace>
              Get a new link
            </Link>
          </Button>
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Button asChild variant={"link"}>
          <Link className="text-center" to="/" replace>
            Go to home
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default VerifyEmail;

import { useRouteError } from "react-router-dom";

type CustomError = {
  message: string;
  status?: number;
  statusText?: string;
};
export default function ErrorPage() {
  const error = useRouteError() as CustomError;

  return (
    <div className="center flex items-center flex-col mt-[8.875rem] justify-center space-y-6">
      <h1 className="text-2xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}

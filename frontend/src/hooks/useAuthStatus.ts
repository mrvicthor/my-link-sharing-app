import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/lib/api";

export const AUTH_STATUS = "authStatus";
export const useAuthStatus = (opts = {}) => {
  const { data: user, ...rest } = useQuery({
    queryKey: [AUTH_STATUS],
    queryFn: checkAuth,
    staleTime: Infinity,
    ...opts,
  });
  return { user, ...rest };
};

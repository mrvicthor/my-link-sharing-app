import { getPreview } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const PREVIEW = "preview";

const useDetails = (id: string, opts = {}) => {
  const { data: user, ...rest } = useQuery({
    queryKey: [PREVIEW, id],
    queryFn: () => getPreview(id),
    staleTime: Infinity,
    ...opts,
  });
  return { user, ...rest };
};

export default useDetails;

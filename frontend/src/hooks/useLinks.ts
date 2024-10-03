import { getLinks } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const LINKS = "links";

const useLinks = (opts = {}) => {
  const { data: links, ...rest } = useQuery({
    queryKey: [LINKS],
    queryFn: getLinks,
    staleTime: Infinity,
    ...opts,
  });
  return { links, ...rest };
};

export default useLinks;

import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useSearchManager = (input: string = "") => {
  return useQuery({
    queryKey: ["search", input],
    queryFn: async () => {
      if (!input.trim()) {
        return [];
      }

      const response = await request.get("/managers", {
        params: { search: input },
      });
      const managers = response.data;


      return managers
        .filter((item: any) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        )
        .map((item: any) => ({
          ...item,
          id: `manager-${item.id}`,
        }));
    },
    enabled: !!input.trim(),
  });
};


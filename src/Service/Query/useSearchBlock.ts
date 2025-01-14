import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useSearchBlock = (input: string = "") => {
  return useQuery({
    queryKey: ["search", input],
    queryFn: async () => {
      if (!input.trim()) {
        return [];
      }

      const response = await request.get("/blocks", {
        params: { search: input },
      });
      const employee = response.data;


      return employee
        .filter((item: any) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        )
        .map((item: any) => ({
          ...item,
          id: `block-${item.id}`,
        }));
    },
    enabled: !!input.trim(),
  });
};
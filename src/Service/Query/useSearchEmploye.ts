import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useSearchEmploye = (input: string = "") => {
  return useQuery({
    queryKey: ["search", input],
    queryFn: async () => {
      if (!input.trim()) {
        return [];
      }

      const response = await request.get("/employees", {
        params: { search: input },
      });
      const employee = response.data;


      return employee
        .filter((item: any) =>
          item.name.toLowerCase().includes(input.toLowerCase())
        )
        .map((item: any) => ({
          ...item,
          id: `employee-${item.id}`,
        }));
    },
    enabled: !!input.trim(),
  });
};
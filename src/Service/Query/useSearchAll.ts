import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useSearchAll = (input: string = "") => {
  return useQuery({
    queryKey: ["search", input],
    queryFn: async () => {
       if (!input) { 
        return [];
       }
      const [managers, employees] = await Promise.all([
        request.get("/managers", { params: { search: input || "00000" } }).then((res) => res.data),
        request.get("/employees", { params: { search: input || "00000" } }).then((res) => res.data),
      ]);

      const searchTerm = input.toLowerCase();
      return [
        ...managers
          .filter((item: any) => item.name.toLowerCase().includes(searchTerm)) // Faqat mos managerlar
          .map((item: any) => ({
            ...item,
            id: `manager-${item.id}`,
          })),
        ...employees
          .filter((item: any) => item.name.toLowerCase().includes(searchTerm)) // Faqat mos employee'lar
          .map((item: any) => ({
            ...item,
            id: `employee-${item.id}`,
          })),
      ];
    },
  });
};

import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetAll = () => {
  return useQuery({
    queryKey: ["use-get-all"],
    queryFn: async () => {
      const [managers, employees] = await Promise.all([
        request.get("/managers").then((res) => res.data),
        request.get("/employees").then((res) => res.data),
      ]);
      return [...managers, ...employees];
    },
  });
};
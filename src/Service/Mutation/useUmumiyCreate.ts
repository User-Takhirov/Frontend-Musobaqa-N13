import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useCreateUmumiy = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const { name, email, type,status } = data;
      if (type === "manager") {
        return request.post("/managers", { name, email, type, status });
      } else {
        return request.post("/employees", { name, email, type, status });
      }
    },
  });
};

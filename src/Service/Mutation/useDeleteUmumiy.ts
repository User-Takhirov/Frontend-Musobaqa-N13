

import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useDeleteItem = () => {
 
  return useMutation({
    mutationFn: async (id: string | number) => {
      const [managers, employees] = await Promise.allSettled([
        request.delete(`/managers/${id}`),
        request.delete(`/employees/${id}`),
      ]);
      if (managers.status === "rejected" && employees.status === "rejected") {
        throw new Error("Failed to delete the item.");
      }
    },
  });
};

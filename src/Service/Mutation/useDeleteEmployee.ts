import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useDeleteEmployee = () => {
  return useMutation({
    mutationFn: (id) =>
      request.delete(`employees/${id}`).then((res) => res.data),
  });
};

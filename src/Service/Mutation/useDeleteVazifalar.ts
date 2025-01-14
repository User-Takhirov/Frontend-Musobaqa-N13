import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useDeleteVazifalar = () => {
  return useMutation({
    mutationFn: (id) =>
      request.delete(`tasks/${id}`).then((res) => res.data),
  });
};

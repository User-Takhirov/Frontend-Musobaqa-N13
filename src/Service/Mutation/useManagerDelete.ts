import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useManagerDelete = () => {
  return useMutation({
    mutationFn: (id) =>
      request.delete(`managers/${id}`).then((res) => res.data),
  });
};

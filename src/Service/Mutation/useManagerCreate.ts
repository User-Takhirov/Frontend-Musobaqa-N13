import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useManagerCreate = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/managers", data).then((res) => res.data),
  });
};

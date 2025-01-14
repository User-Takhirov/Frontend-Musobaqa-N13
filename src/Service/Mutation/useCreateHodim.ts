import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useCreateHodim = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/employees", data).then((res) => res.data),
  });
};

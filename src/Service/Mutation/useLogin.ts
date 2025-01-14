import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export interface useLoginType {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: useLoginType) =>
      request.post("http://localhost:3000/login", data).then((res) => res.data),
  });
};

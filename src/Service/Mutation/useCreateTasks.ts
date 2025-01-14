import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useCreateTasks = () => {
  return useMutation({
    mutationFn: (data) =>
      request.post("/tasks", data).then((res) => res.data),
  });
};

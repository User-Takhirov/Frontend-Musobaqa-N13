import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => request.get("/tasks").then((res) => res.data),
  });
};

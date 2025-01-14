import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetEmployees = () => {
  return useQuery({
    queryKey: ["employee"],
    queryFn: () => request.get("/employees").then((res) => res.data),
  });
};

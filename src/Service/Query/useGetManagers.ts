import { useQuery } from "@tanstack/react-query";
import { request } from "../../config/request";

export const useGetManagers = () => {
  return useQuery({
    queryKey: ["managers"],
    queryFn: () => request.get("/managers").then((res) => res.data),
  });
};

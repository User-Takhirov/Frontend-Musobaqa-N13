import { useQuery } from "react-query";

export const useExaple = () => {
  return useQuery({
    queryKey: ["Example"],
    //queryFn:()=>request.get("example").then((res)=>res.data)
  });
};

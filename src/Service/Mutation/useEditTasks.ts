import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";
import { HodimCreateTypes } from "../../Types/types";

export const useEditTasks = () => {
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number | string | any;
      data: HodimCreateTypes;
    }) => request.patch(`tasks/${id}`, data).then((res) => res.data),
  });
};

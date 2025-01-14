
import { useMutation } from "@tanstack/react-query";
import { request } from "../../config/request";
import { message } from "antd";

export const useUmumiyEdit = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number | string | any;    
      data: any;
    }) => {
      try {
      
        const managerUpdate = await request.patch(`/managers/${id}`, data);
        return managerUpdate; 
      } catch (managerError) {
        try {
        
          const employeeUpdate = await request.patch(`/employees/${id}`, data);
          return employeeUpdate; 
        } catch (employeeError) {
     
          throw new Error(
            "Failed to update the item: both manager and employee updates failed."
          );
        }
      }
    },
    onSuccess: () => {
      message.success("Item updated successfully");
    },
    onError: (error: Error) => {
      message.error(error.message || "Failed to update item");
      console.error(error);
    },
  });
};

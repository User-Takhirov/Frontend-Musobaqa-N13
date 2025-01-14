import { message } from "antd";
import React from "react";
import { FormTypes } from "../../Types/types";
import { client } from "../../config/queryClient";
import { useCreateTasks } from "../../Service/Mutation/useCreateTasks";
import { VazifalarForm } from "../Vazifalar-Form";

export const VazifalarCreate: React.FC<FormTypes> = ({ closeModal }) => {
  const { mutate } = useCreateTasks();
  const onFinish = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["tasks"] });
        closeModal(true);
      },
      onError: (err) => console.log(err),
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Form Submission Failed:", errorInfo);
  };

  return <VazifalarForm onFinishFailed={onFinishFailed} submit={onFinish} />;
};

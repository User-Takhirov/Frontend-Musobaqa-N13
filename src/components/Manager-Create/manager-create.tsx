import { message } from "antd";
import React from "react";
import { FormTypes } from "../../Types/types";
import { client } from "../../config/queryClient";
import { ManagerForm } from "../Manager-Form";
import { useCreateUmumiy } from "../../Service/Mutation/useUmumiyCreate";

export const ManagerCreate: React.FC<FormTypes> = ({ closeModal }) => {
  const { mutate } = useCreateUmumiy();
  const onFinish = (data: any) => {
    mutate(
      {
        type: "manager",
        status: "active",
        ...data
      },
      {
        onSuccess: () => {
          message.success("success");
          client.invalidateQueries({ queryKey: ["managers"] });
          client.invalidateQueries({ queryKey: ["use-get-all"] });
          closeModal(true);
        },
        onError: (err) => console.log(err),
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Form Submission Failed:", errorInfo);
  };

  return <ManagerForm onFinishFailed={onFinishFailed} submit={onFinish} />;
};



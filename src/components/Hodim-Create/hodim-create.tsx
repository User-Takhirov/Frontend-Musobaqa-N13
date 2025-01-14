

import { message } from "antd";
import React from "react";
import { FormTypes } from "../../Types/types";
import { client } from "../../config/queryClient";
import { useCreateUmumiy } from "../../Service/Mutation/useUmumiyCreate";
import { HodimForm } from "../Hodim-Form";

export const HodimCreate: React.FC<FormTypes> = ({ closeModal }) => {
  const { mutate } = useCreateUmumiy();
  const onFinish = (data: any) => {
    mutate(
      {
        type: "hodim",
        status: "active",
        ...data,
      },
      {
        onSuccess: () => {
          message.success("success");
          client.invalidateQueries({ queryKey: ["employee"] });
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

  return <HodimForm onFinishFailed={onFinishFailed} submit={onFinish} />;
};

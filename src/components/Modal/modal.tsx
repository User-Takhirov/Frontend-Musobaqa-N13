import React from "react";
import { CustomModalTypes } from "../../Types/types";
import { Modal } from "antd";

export const ReusableModal: React.FC<CustomModalTypes | any> = ({
  children,
  open,
  onCancel,
  onOk,
  title,
}) => {
  return (
    <Modal
      footer={null}
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={600}
      destroyOnClose
    >
      {children}
    </Modal>
  );
};

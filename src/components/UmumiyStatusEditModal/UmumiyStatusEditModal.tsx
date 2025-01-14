import { Modal, Select, message } from "antd";
import { useUmumiyEdit } from "../../Service/Mutation/useUmumiyEdit";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
const { Option } = Select;
interface UmumiyStatusEditModalProps {
  visible: boolean;
  onClose: () => void;
  id: string | number;
  currentStatus: string;
  onStatusChange: (newStatus: string) => void;
}

export const UmumiyStatusEditModal = ({
  visible,
  onClose,
  id,
  currentStatus,
  onStatusChange,
}: UmumiyStatusEditModalProps) => {
  const [newStatus, setNewStatus] = useState<string>(currentStatus);
  const { mutate: editUmumiy } = useUmumiyEdit();
  const queryClient = useQueryClient();

  const handleStatusChange = (value: string) => {
    setNewStatus(value);
  };

  const handleSubmit = () => {
    const updatedData = {
      status: newStatus,
    };

    editUmumiy(
      { id, data: updatedData },
      {
        onSuccess: () => {
          message.success("Status updated successfully");
          onStatusChange(newStatus);
          queryClient.invalidateQueries({ queryKey: ["use-get-all"] });
          queryClient.invalidateQueries({ queryKey: ["employee"] });
          queryClient.invalidateQueries({ queryKey: ["managers"] });
          onClose();
        },
        onError: (error: any) => {
          message.error("Failed to update status");
          console.error(error);
        },
      }
    );
  };

  return (
    <Modal
      title="Edit Status"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Update Status"
      cancelText="Cancel"
    >
      <Select
        value={newStatus}
        onChange={handleStatusChange}
        style={{ width: "100%" }}
      >
        <Option value="Active">Active</Option>
        <Option value="Passive">Passive</Option>
        <Option value="Одобрен">Одобрен</Option>
        <Option value="Проверка анкеты">Проверка анкеты</Option>
        <Option value="Block">Block</Option>
      </Select>
    </Modal>
  );
};

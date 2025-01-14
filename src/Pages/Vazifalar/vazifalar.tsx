import { Button, message, Table } from "antd";
import { AssignmentType, columnType, DataSourceType } from "../../Types/types";
import { useGetTasks } from "../../Service/Query/useGetTasks";
import { PlusIcon } from "../../assets/img/plus-icon";
import { SearchIcon } from "../../assets/img/search-icon";
import { ReusableModal } from "../../components/Modal/modal";
import { useState } from "react";
import { VazifalarForm } from "../../components/Vazifalar-Form";
import { useEditTasks } from "../../Service/Mutation/useEditTasks";
import { VazifalarCreate } from "../../components/Vazifalar-Create";

import { useDeleteVazifalar } from "../../Service/Mutation/useDeleteVazifalar";
export const Vazifalar = () => {
  const { data, refetch } = useGetTasks();
  const [selectedEmployee, setSelectedEmployee] =
    useState<DataSourceType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (employee: DataSourceType | null = null) => {
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };
  const { mutate } = useDeleteVazifalar();
  const { mutate: editTasks } = useEditTasks();
  const handleSubmit = (values: any) => {
    console.log(values);
    if (selectedEmployee) {
      editTasks(
        { id: selectedEmployee.id, data: values },
        {
          onSuccess: () => {
            message.success("Employee edited successfully");
            refetch();
            handleOk();
          },
          onError: (error) => {
            message.error("Failed to edit employee");
            console.error(error);
          },
        }
      );
    } else {
      refetch();
      message.success("New employee created successfully");
      handleOk();
    }
  };
  const DeleteTasksFunc = (id: number | string | any) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Employee deleted successfully");
        refetch();
      },
      onError: (error) => {
        message.error("Failed to delete employee");
        console.error(error);
      },
    });
  };
  const dataSource = data?.map((item: AssignmentType) => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      type: item.type,
    };
  });

  const columns: columnType[] = [
    {
      dataIndex: "name",
      key: "name",
      title: "Task Name",
      align: "center",
    },
    {
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      dataIndex: "others",
      key: "",
      align: "center",
      render: (_: any, record: DataSourceType) => (
        <>
          <div
            style={{ display: "flex", gap: "20px", justifyContent: "center" }}
          >
            <Button type="primary" onClick={() => showModal(record)}>
              O'zgartirish
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => DeleteTasksFunc(record.id)}
            >
              O'chirish
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <div>
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <Button
            onClick={() => showModal()}
            type="primary"
            style={{ padding: "11px 16px 11px 40px", height: "40px" }}
          >
            Hodim qo’shish
          </Button>
          <ReusableModal
            footer={null}
            title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            {selectedEmployee ? (
              <VazifalarForm
                submit={handleSubmit}
                initialValues={{ ...selectedEmployee }}
              />
            ) : (
              <VazifalarCreate closeModal={handleOk} />
            )}
          </ReusableModal>
          <div
            style={{
              position: "absolute",
              top: "11px",
              left: "16px",
            }}
          >
            <PlusIcon />
          </div>
          
        </div>
        <div
          style={{
            marginBottom: "20px",
            position: "relative",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
            type="text"
            placeholder="Поиск по фамилии"
            className="search-layout"
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "14px",
            }}
          >
            <SearchIcon />
          </div>
        </div>
      </div>
      <Table
        showHeader={false}
        pagination={false}
        style={{
          borderRadius: "16px",
          border: " 1px solid #e3e1e1",
          padding: "32px 28px",
        }}
        dataSource={dataSource}
        columns={columns}
      />
    </>
  );
};

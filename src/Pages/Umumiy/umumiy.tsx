import { Button, message, Popconfirm, Table } from "antd";
import { PlusIcon } from "../../assets/img/plus-icon";
import { columnType, DataSourceType } from "../../Types/types";
import { useGetAll } from "../../Service/Query/useGetAll";
import { useDeleteItem } from "../../Service/Mutation/useDeleteUmumiy";
import { useQueryClient } from "@tanstack/react-query";
import { useUmumiyEdit } from "../../Service/Mutation/useUmumiyEdit";
import { useState } from "react";
import { ReusableModal } from "../../components/Modal/modal";
import { UmumiyForm } from "../../components/Umumiy-Form";
import { UmumiyStatusEditModal } from "../../components/UmumiyStatusEditModal";
import { useCreateUmumiy } from "../../Service/Mutation/useUmumiyCreate";
import { UmumiySearch } from "./UmumiySearch/umumiy-search";
import { useDarkMode } from "../../hooks/useDarkMode";

export const Umumiy = () => {
  const { isDarkMode } = useDarkMode();
  const { data, refetch } = useGetAll();
  console.log(data);
  const { mutate: deleteUmumiy } = useDeleteItem();
  const { mutate: createUmumiy } = useCreateUmumiy();
  const { mutate: editUmumiy } = useUmumiyEdit();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); 
  const [selectedEmployee, setSelectedEmployee] =
    useState<DataSourceType | null>(null);
  const [currentStatus, setCurrentStatus] = useState<string>("");

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

  const handleSubmit = (values: any) => {
    if (selectedEmployee) {
      const updatedData = {
        ...selectedEmployee,
        ...values,
      };

      editUmumiy(
        { id: selectedEmployee.id, data: updatedData },
        {
          onSuccess: () => {
            message.success("Employee edited successfully");
            refetch();
            handleOk();
          },
          onError: (error: any) => {
            message.error("Failed to edit employee");
            console.error(error);
          },
        }
      );
    } else {
      createUmumiy(values, {
        onSuccess: () => {
          message.success("New employee created successfully");
          refetch();
          handleOk();
        },
        onError: (error: any) => {
          message.error("Failed to create new employee");
          console.error(error);
        },
      });
    }
  };

  const handleDelete = (id: number | string) => {
    deleteUmumiy(id, {
      onSuccess: () => {
        message.success("Employee deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["use-get-all"] });
        refetch();
      },
      onError: (error: any) => {
        message.error("Failed to delete employee");
        console.error(error);
      },
    });
  };

  const handleStatusClick = (employee: any) => {
    setSelectedEmployee(employee);
    setCurrentStatus(employee?.status);
    setIsStatusModalOpen(true);
  };
  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus);
    setIsStatusModalOpen(false);
  };

  const dataSource = data?.map((item: DataSourceType) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    type: item.type,
    email: item.email,
    address: item.address,
    title: item.title,
    status: item.status,
  }));

  const columns: columnType[] = [
    {
      title: "Фамилия Имя",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Turi",
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: "E-mail",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "actions",
      align: "center",
      render: (_: any, record: DataSourceType) => (
        <Button onClick={() => handleStatusClick(record)}>
          {record.status}
        </Button> 
      ),
    },
    {
      title: "",
      dataIndex: "address",
      key: "actions",
      align: "center",
      render: (_: any, record: DataSourceType) => (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Button type="primary" onClick={() => showModal(record)}>
            O'zgartirish
          </Button>
          <Popconfirm
            overlayStyle={{ width: "400px" }}
            onConfirm={() => {
              return handleDelete(record.id);
            }}
            cancelText={"Отмена"}
            okText={"Удалить"}
            title={
              "Вы уверены, что хотите удалить шаблон задачи «Проверка качества обслуживания»?"
            }
          >
            <Button type="primary" style={{ backgroundColor: "red" }}>
              O'chirish
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <div>
        <div style={{ marginBottom: "20px", position: "relative" }}>
          <Button
            type="primary"
            onClick={() => showModal()}
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
            <UmumiyForm
              submit={handleSubmit}
              initialValues={
                selectedEmployee ? { ...selectedEmployee } : undefined
              }
            />
          </ReusableModal>
          <div style={{ position: "absolute", top: "11px", left: "16px" }}>
            <PlusIcon />
          </div>
        </div>
        <UmumiySearch />
        <Table
          style={{
            background: isDarkMode ? "#181818" : "#fff",
            color: isDarkMode ? "#E4E4E4" : "#000",
          }}
          dataSource={dataSource}
          columns={columns}
           rowClassName="table-row"
        />
      </div>
      <UmumiyStatusEditModal
        visible={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        id={selectedEmployee?.id || ""}
        currentStatus={currentStatus}
        onStatusChange={handleStatusChange}
      />
    </>
  );
};

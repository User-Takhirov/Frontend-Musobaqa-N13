
// import { Button, Table, message } from "antd";
// import { columnType, DataSourceType } from "../../Types/types";
// import { useGetEmployees } from "../../Service/Query/useGetEmployees";
// import { useDeleteEmployee } from "../../Service/Mutation/useDeleteEmployee";
// import { useHodimEdit } from "../../Service/Mutation/useHodimEdit";
// import { HodimForm } from "../../components/Hodim-Form";
// import { HodimCreate } from "../../components/Hodim-Create";
// import { ReusableModal } from "../../components/Modal/modal";
// import { PlusIcon } from "../../assets/img/plus-icon";
// import { SearchIcon } from "../../assets/img/search-icon";
// import { useState } from "react";

// export const Hodimlar = () => {
//   const { data, refetch } = useGetEmployees();
//   console.log(data);

//   const { mutate } = useDeleteEmployee();
//   const { mutate: editHodim } = useHodimEdit();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] =
//     useState<DataSourceType | null>(null);
//   console.log(selectedEmployee);
//   const showModal = (employee: DataSourceType | null = null) => {
//     setSelectedEmployee(employee);
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//     setSelectedEmployee(null);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedEmployee(null);
//   };
//   const handleSubmit = (values: any) => {
//     console.log(values);

//     if (selectedEmployee) {
//       editHodim(
//         { id: selectedEmployee.id, data: values },
//         {
//           onSuccess: () => {
//             message.success("Employee edited successfully");
//             refetch();
//             handleOk();
//           },
//           onError: (error) => {
//             message.error("Failed to edit employee");
//             console.error(error);
//           },
//         }
//       );
//     } else {
//       refetch();
//       message.success("New employee created successfully");
//       handleOk();
//     }
//   };
//   const DeleteEmployeeHodim = (id: number | string | any) => {
//     mutate(id, {
//       onSuccess: () => {
//         message.success("Employee deleted successfully");
//         refetch();
//       },
//       onError: (error) => {
//         message.error("Failed to delete employee");
//         console.error(error);
//       },
//     });
//   };

//   const dataSource = data?.map((item: DataSourceType) => ({
//     key: item.id,
//     id: item.id,
//     name: item.name,
//     type: item.type,
//     email: item.email,
//     address: item.address,
//     title: item.title,
//   }));

//   const columns: columnType[] = [
//     {
//       title: "Фамилия Имя",
//       dataIndex: "name",
//       key: "name",
//       align: "center",
//     },
//     {
//       title: "Turi",
//       dataIndex: "type",
//       key: "type",
//       align: "center",
//     },
//     {
//       title: "E-mail",
//       dataIndex: "email",
//       key: "email",
//       align: "center",
//     },
//     {
//       title: "",
//       dataIndex: "address",
//       key: "actions",
//       align: "center",
//       render: (_: any, record: DataSourceType) => (
//         <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
//           <Button type="primary" onClick={() => showModal(record)}>
//             O'zgartirish
//           </Button>
//           <Button
//             onClick={() => DeleteEmployeeHodim(record.id)}
//             type="primary"
//             danger
//           >
//             O'chirish
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <>
//       <div>
//         <div style={{ marginBottom: "20px", position: "relative" }}>
//           <Button
//             onClick={() => showModal()}
//             type="primary"
//             style={{ padding: "11px 16px 11px 40px", height: "40px" }}
//           >
//             Hodim qo’shish
//           </Button>

//           <ReusableModal
//             footer={null}
//             title={selectedEmployee ? "Edit Employee" : "Add New Employee"}
//             open={isModalOpen}
//             onOk={handleOk}
//             onCancel={handleCancel}
//           >
//             {selectedEmployee ? (
//               <HodimForm
//                 submit={handleSubmit}
//                 initialValues={{ ...selectedEmployee }}
//               />
//             ) : (
//               <HodimCreate closeModal={handleOk} />
//             )}
//           </ReusableModal>

//           <div
//             style={{
//               position: "absolute",
//               top: "11px",
//               left: "16px",
//             }}
//           >
//             <PlusIcon />
//           </div>
//         </div>

//         <div
//           style={{
//             marginBottom: "20px",
//             position: "relative",
//             display: "flex",
//             gap: "8px",
//           }}
//         >
//           <input
//             type="text"
//             placeholder="Поиск по фамилии"
//             className="search-layout"
//           />
//           <div
//             style={{
//               position: "absolute",
//               top: "12px",
//               left: "14px",
//             }}
//           >
//             <SearchIcon />
//           </div>
//         </div>
//       </div>

//       <Table dataSource={dataSource} columns={columns} />
//     </>
//   );
// };







import { Button, Table, message } from "antd";
import { columnType, DataSourceType } from "../../Types/types";
import { HodimForm } from "../../components/Hodim-Form";
import { ReusableModal } from "../../components/Modal/modal";
import { PlusIcon } from "../../assets/img/plus-icon";
import { SearchIcon } from "../../assets/img/search-icon";
import { useState } from "react";
import { useGetAll } from "../../Service/Query/useGetAll";
import { useUmumiyEdit } from "../../Service/Mutation/useUmumiyEdit";
import { useDeleteItem } from "../../Service/Mutation/useDeleteUmumiy";
import { HodimCreate } from "../../components/Hodim-Create";

export const Hodimlar = () => {
  const { data, refetch } = useGetAll();
  const { mutate } = useDeleteItem();
  const { mutate: editHodim } = useUmumiyEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] =
    useState<DataSourceType | null>(null);

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
    console.log(values);
    if (selectedEmployee) {
      editHodim(
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

  const DeleteEmployeeHodim = (id: number | string | any) => {
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

 
  const filteredData = data?.filter(
    (item: DataSourceType) => item.type === "hodim"
  );

  const dataSource = filteredData?.map((item: DataSourceType) => ({
    key: item.id,
    id: item.id,
    name: item.name,
    type: item.type,
    email: item.email,
    address: item.address,
    title: item.title,
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
      title: "",
      dataIndex: "address",
      key: "actions",
      align: "center",
      render: (_: any, record: DataSourceType) => (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>
          <Button type="primary" onClick={() => showModal(record)}>
            O'zgartirish
          </Button>
          <Button
            onClick={() => DeleteEmployeeHodim(record.id)}
            type="primary"
            danger
          >
            O'chirish
          </Button>
        </div>
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
              <HodimForm
                submit={handleSubmit}
                initialValues={{ ...selectedEmployee }}
              />
            ) : (
              <HodimCreate closeModal={handleOk} />
            )}
          </ReusableModal>

          <div style={{ position: "absolute", top: "11px", left: "16px" }}>
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
          <div style={{ position: "absolute", top: "12px", left: "14px" }}>
            <SearchIcon />
          </div>
        </div>
      </div>

      <Table dataSource={dataSource} columns={columns} />
    </>
  );
};

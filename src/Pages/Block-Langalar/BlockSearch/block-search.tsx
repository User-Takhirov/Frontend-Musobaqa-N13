import { useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import { Form } from "antd";
import { useDebounce } from "../../../hooks/useDebounce";
import { SearchIcon } from "../../../assets/img/search-icon";
import { useSearchBlock } from "../../../Service/Query/useSearchBlock";

export interface DataSourceType {
  key: string | number;
  id: string | number;
  name: string;
  type: string;
  email: string;
  title: string;
  tasks: any;
  address?: string;
}
export const BlockSearch = () => {
  const [input, setInput] = useState('');
  const debounceValue = useDebounce(input);
  const { data, isLoading } = useSearchBlock(debounceValue);


  const dataSource = data?.map((item: DataSourceType) => {
    return {
      key: item.id,
      id: item.id,
      name: item.name,
      type: item.type,
      Email: item.email,
      address: item.address,
      title: item.title,
    };
  }) || [];

  const columns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <Form style={{ position: 'relative' }}>
      <Form.Item>
      <div
          style={{
            marginBottom: "20px",
            position: "relative",
            display: "flex",
            gap: "8px",
          }}
        >
          <input
           onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Поиск по фамилии"
            className="search-layout"
          />
          <div style={{ position: "absolute", top: "12px", left: "14px" }}>
            <SearchIcon />
          </div>
        </div>
      </Form.Item>
      {isLoading ? (
        <h1>Loading.....</h1>
      ) : (
        dataSource.length > 0 && (
          <Table
            columns={columns}
            dataSource={dataSource}
            // rowKey={(record) => record.id.toString()}
            pagination={false}
            style={{ position: 'absolute', top: '80px', width: '100%', zIndex: 5, backgroundColor: '#fff', boxShadow: "0px 0px 99px -9px rgba(161,137,161,1)" }}
          />
        )
      )}
    </Form>
  );
};

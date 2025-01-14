import { Form, Input, Button, Select } from "antd";
import { HodimFormTypes } from "../../Types/types";
const { Option } = Select;
export const VazifalarForm = ({
  submit,
  onFinishFailed,
  initialValues,
}: HodimFormTypes) => {
  const [form] = Form.useForm();
  return (
    <>
      <Form
        form={form}
        name="basicForm"
        layout="vertical"
        onFinish={submit}
        initialValues={initialValues}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Choose Role"
          name="type"
          rules={[{ required: true, message: "Please select a role!" }]}
        >
          <Select placeholder="Select a role">
            <Option value="hodim">Hodim</Option>
            <Option value="manager">Manager</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Имя"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Name!",
            },
          ]}
        >
          <Input placeholder="Enter your Name" />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

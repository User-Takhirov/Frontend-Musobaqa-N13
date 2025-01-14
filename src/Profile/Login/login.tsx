import { Button, Flex, Form, Input, message, Typography } from "antd";
import { useLogin, useLoginType } from "../../Service/Mutation/useLogin";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Login = () => {
  const navigate = useNavigate();
  const { mutate } = useLogin();
  const onFinish = (data: useLoginType) => {
    mutate(data, {
      onSuccess: (res) => {
        Cookies.set("Token", res.accessToken);
        message.success("Welcome");
        navigate("/app", { replace: true });
        console.log("Login success", res);
        
      },
      onError: (err: any) => {
        console.error("Login failed", err);
        message.error(err?.response?.data?.message || "Login failed. Please try again.");
      },
    });
  };
  
  return (
    <Flex justify="center" style={{ marginTop: "100px" }}>
      <Form
        layout="vertical"
        onFinish={onFinish}
        style={{
          width: "400px",
          border: "2px solid  #14b890",
          borderRadius: "16px",
        }}>
        <div style={{ padding: '16px 0 18px 20px', borderBottom: '1px solid  #e8e8e8' }}>
          <Typography.Title style={{ fontWeight: '500', fontSize: '20px', lineHeight: '150%', color: '#2C3030' }}>Kirish</Typography.Title>
        </div>
        <div style={{ padding: '32px 24px 18px 24px' }}>
          <div style={{ marginBottom: "24px" }}>
            <Form.Item
              label={"E-mail"}
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                placeholder="Введите E-mail"
                size="large"
                style={{ padding: "15px" }}
                type="email" />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "40px"}}>
            <Form.Item
              label={"Пароль"}
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                placeholder="Пароль"
                size="large"
                style={{ padding: "15px" }}
                 />
            </Form.Item>
          </div>
        
          <Button type="primary" htmlType="submit" size="large">Войти</Button>
        </div>
      </Form>
    </Flex>
  )

};

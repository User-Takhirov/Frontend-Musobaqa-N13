import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Switch, theme } from "antd";
import { LayoutDATA } from "./layout-data";
import { Link, Navigate, Outlet } from "react-router-dom";
import { LogoIcon } from "../assets/icons/logo-icon";
import { MainLogo } from "../assets/icons/main-logo";
const { Header, Sider, Content } = Layout;
import Cookies from "js-cookie";
import { useDarkMode } from "../hooks/useDarkMode";

export const MainLayout: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const item = LayoutDATA.map((item) => {
    return {
      key: item.id,
      label: (
        <Link
          style={{
            lineHeight: "130%",
            fontSize: "14px",
            fontWeight: "500",
            color: isDarkMode ? "#E4E4E4" : "#333",
          }}
          to={item.path}
        >
          {item.label}
        </Link>
      ),
      icon: React.createElement(item.icon, {
        style: {
          opacity: "0.8",
          color: isDarkMode ? "#E4E4E4" : "#333",
        },
      }),
    };
  });

  const token = Cookies.get("Token");
  if (!token) {
    return <Navigate replace to={"/"} />;
  }

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        width={230}
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: isDarkMode ? "#181818" : "#f5f5f5",
        }}
      >
        <div className="demo-logo-vertical">
          {collapsed === false ? <LogoIcon /> : <MainLogo />}
        </div>
        <Menu
          theme={isDarkMode ? "dark" : "light"}
          mode="inline"
          style={{
            height: "100vh",
            background: isDarkMode ? "#181818" : "#f5f5f5",
            color: isDarkMode ? "#E4E4E4" : "#333",
          }}
          items={item}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: isDarkMode ? "#181818" : colorBgContainer,
            borderBottom: `1px solid ${isDarkMode ? "#444" : "#ddd"}`,
            color: isDarkMode ? "#E4E4E4" : "#333",
          }}
        >
          <div
            style={{
              float: "right",
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginTop: "15px",
            }}
          >
            <Switch
              id="darkModeToggle"
              checked={isDarkMode}
              onChange={toggleDarkMode}
              checkedChildren="Dark"
              unCheckedChildren="Light"
            />
            <Button
              type="primary"
              onClick={() => {
                Cookies.remove("Token");
                window.location.href = "/";
              }}
              style={{
                backgroundColor: isDarkMode ? "#555" : "",
                color: "#fff",
              }}
            >
              Log out
            </Button>
          </div>

          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              display: "block",
              fontSize: "16px",
              width: 64,
              height: 64,
              color: isDarkMode ? "#E4E4E4" : "#333", // Button icon color
            }}
          />
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: isDarkMode ? "#181818" : colorBgContainer,
            borderRadius: borderRadiusLG,
            color: isDarkMode ? "#E4E4E4" : "#333", // Content text color
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

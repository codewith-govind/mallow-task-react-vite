import React, { ReactNode, useState } from "react";
import { Card, Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, SettingOutlined } from "@ant-design/icons";
import { useTheme } from "../contexts/ThemeContext";
import AppHeader from "../components/common/AppHeader";
import { useNavigate } from "react-router-dom";

const { Sider, Content, Footer } = Layout;

interface MainLayoutProps {
  children: ReactNode;
}
const versionNumber = import.meta.env.VITE_APP_VERSION;
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { themeMode } = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const contentBgColor = themeMode === "light" ? "bg-white" : "bg-zinc-800";
  const contentTextColor =
    themeMode === "light" ? "text-gray-800" : "text-white";
  const isDark = themeMode === "dark";

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/dashboard"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Users",
      onClick: () => navigate("/users"),
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <Layout className="min-h-[100vh]">
      {/* <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme={isDark ? "dark" : "light"}
        width={250}
        className={`transition-all duration-300 shadow-md ${
          isDark ? "bg-[#1f1f1f]" : "bg-white"
        }`}
      >
        <div
          className="flex items-center justify-center"
          style={{
            height: 64,
          }}
        ></div>

        <Menu
          mode="inline"
          theme={isDark ? "dark" : "light"}
          defaultSelectedKeys={["1"]}
          items={menuItems}
          className="border-none"
        />
      </Sider> */}
      <Layout>
        <AppHeader />
        <div style={{ margin: "25px" }}>
          <Card>
            <Content
              className={`m-6 p-6 min-h-72 rounded-lg shadow-md ${contentBgColor} ${contentTextColor}`}
            >
              {children}
            </Content>
          </Card>
        </div>
        <Footer
          style={{ padding: "26px" }}
          className="bg-transparent px-6 py-3 text-center text-sm text-gray-600 dark:text-gray-400"
        >
          © 2025 MallowTech — Version {versionNumber}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

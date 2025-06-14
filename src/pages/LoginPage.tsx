import React, { useEffect } from "react";
import { Button, Input, Form, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions";
import { RootState, AppDispatch } from "../store";
import { LoginFormValues } from "../types";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const { themeMode } = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/users");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: LoginFormValues) => {
    await dispatch(login(values));
  };

  const cardBgColor = themeMode === "light" ? "bg-white" : "bg-zinc-800";
  const cardShadow = themeMode === "light" ? "shadow-lg" : "shadow-none";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100 dark:bg-zinc-900">
      <Card
        className={`w-full max-w-sm rounded-xl ${cardBgColor} ${cardShadow} border border-gray-200 dark:border-zinc-700`}
        style={{
          width: "100%",
          maxWidth: 400,
          borderRadius: 12,
          boxShadow:
            themeMode === "light" ? "0 2px 12px rgba(0,0,0,0.1)" : "none",
          backgroundColor: themeMode === "light" ? "#fff" : "#1e1e1e",
          border: themeMode === "light" ? "1px solid #eee" : "1px solid #333",
        }}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Login
          </h2>
        </div>

        <Form<LoginFormValues>
          name="login"
          initialValues={{
            remember: true,
            email: "eve.holt@reqres.in",
            password: "cityslicka",
          }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Email"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              size="large"
              style={{ borderRadius: "8px" }}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-3" />
              <label
                htmlFor="remember"
                className="text-gray-700 dark:text-gray-300 cursor-pointer"
              >
                Remember me
              </label>
            </div>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              style={{
                borderRadius: "8px",
                height: "48px",
                fontWeight: "bold",
              }}
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;

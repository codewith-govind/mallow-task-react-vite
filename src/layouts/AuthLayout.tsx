import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import { useTheme } from '../contexts/ThemeContext';

const { Content } = Layout;

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { themeMode } = useTheme();
  const bgColor = themeMode === 'light' ? '#f0f2f5' : '#0f0f0f';

  return (
    <Layout 
    style={{
      minHeight: '100vh',
      backgroundColor: themeMode === 'light' ? '#f0f2f5' : '#0f0f0f',
    }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        }}
      >
        <div style={{ width: '100%', maxWidth: 400 }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;

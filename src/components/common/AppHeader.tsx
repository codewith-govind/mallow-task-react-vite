import React, { useCallback } from 'react';
import { Layout, Button, Typography, Grid } from 'antd';
import {
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions';
import { RootState, AppDispatch } from '../../store';

const { Header } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const appName = import.meta.env.VITE_APP_NAME;

const AppHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { toggleTheme, themeMode } = useTheme();
  const currentUserEmail = useSelector(
    (state: RootState) => state.auth.userEmail
  );
  const screens = useBreakpoint();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);

  const headerBgColor = themeMode === 'light' ? '#fff' : '#1f1f1f';
  const headerTextColor =
    themeMode === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)';

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 1000,
        background: headerBgColor,
        borderBottom: `1px solid ${themeMode === 'light' ? '#f0f0f0' : '#303030'}`,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        color: headerTextColor,
        padding: '0 16px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        rowGap: 8,
      }}
    >
      <Text
        style={{
          fontSize: '20px',
          fontWeight: 600,
          color: 'inherit',
        }}
      >
        {appName}
      </Text>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: screens.xs ? 8 : 16,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {currentUserEmail && (
          <Text
            style={{ color: 'inherit' }}
            className="hidden sm:block"
          >
            {currentUserEmail}
          </Text>
        )}
        <Button
          type="text"
          icon={themeMode === 'light' ? <MoonOutlined /> : <SunOutlined />}
          onClick={toggleTheme}
          style={{ color: 'inherit' }}
        />
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          style={{ color: 'inherit' }}
        >
          {screens.sm ? 'Logout' : null}
        </Button>
      </div>
    </Header>
  );
};

export default AppHeader;

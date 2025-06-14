import React from "react";
import {
  Table,
  Avatar,
  Button,
  Space,
  Skeleton,
  Grid,
  Tooltip,
  Typography,
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { User } from "../../types";

const { useBreakpoint } = Grid;
const { Text } = Typography;

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  loading,
}) => {
  const screens = useBreakpoint();

  const columns: ColumnsType<User> = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text: string, record: User) => (
        <Avatar
          src={record.avatar}
          icon={<UserOutlined />}
          alt={`${record.first_name} ${record.last_name}`}
          size="large"
          style={{ backgroundColor: "#f0f0f0" }}
        />
      ),
      align: "center",
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      render: (name) => <Text>{name}</Text>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["md"],
      render: (email) => (
        <Text type="secondary" style={{ wordBreak: "break-word" }}>
          {email}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (text, record: User) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="default"
              icon={<EditOutlined />}
              onClick={() => onEdit(record)}
              size="middle"
              shape={screens.xs ? "circle" : "default"}
            >
              {/* {!screens.xs && "Edit"} */}
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record.id)}
              size="middle"
              shape={screens.xs ? "circle" : "default"}
            >
              {/* {!screens.xs && "Delete"} */}
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#141414]">
      <Table<User>
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading ? { spinning: true, tip: "Loading users..." } : false}
        pagination={false}
        scroll={{ x: "max-content" }}
      className="rounded-lg overflow-hidden shadow-md"
      />
    </div>
  );
};

export default UserTable;


import React from "react";
import { Card, Avatar, Button, Tooltip, Space, Grid } from "antd";
import {
  UserOutlined,
  MailOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { User } from "../../types";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const { useBreakpoint } = Grid;

const getInitials = (first?: string, last?: string) => {
  return `${(first || "U")[0]}${(last || "U")[0]}`.toUpperCase();
};

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  const hasAvatar = user.avatar && user.avatar.trim() !== "";
  const screens = useBreakpoint();
  const isMobile = !screens.md; // true for xs or sm screens

  return (
    <Card
      hoverable
      className="relative user-card"
      bodyStyle={{ padding: "2rem", textAlign: "center" }}
    >
      {/* Overlay Buttons */}
      {!isMobile && (
        <div className="card-actions">
          <Tooltip title="Edit">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => onEdit(user)}
              className="edit-btn"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(user.id)}
              className="delete-btn"
            />
          </Tooltip>
        </div>
      )}

      <div style={{ textAlign: "center", marginBottom: 16 }}>
        {/* Avatar with Fallback */}
        <Avatar
          size={64}
          icon={!hasAvatar ? <UserOutlined /> : undefined}
          src={hasAvatar ? user.avatar : undefined}
        >
          {!hasAvatar && getInitials(user.first_name, user.last_name)}
        </Avatar>

        {/* Info */}
        <h3 className="mt-3 text-base font-semibold">
          {user.first_name} {user.last_name}
        </h3>
        <p className="text-sm text-gray-500">
          <MailOutlined style={{ marginRight: 4 }} />
          {user.email}
        </p>
      </div>

      {/* Bottom sticky buttons for mobile only */}
      {isMobile && (
        <div
          style={{
            marginTop: "10px",
            bottom: 12,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onEdit(user)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(user.id)}
          >
            Delete
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserCard;

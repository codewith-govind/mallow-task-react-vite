import React, { useState, useEffect, useCallback } from "react";
import {
  Space,
  Input,
  Button,
  Pagination,
  Segmented,
  Row,
  Col,
  Typography,
  Empty,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import UserTable from "../components/users/UserTable";
import UserCard from "../components/users/UserCard";
import UserCardListContainer from "../components/users/UserCardListContainer";
import UserFormModal from "../components/users/UserFormModal";
import CustomConfirmationModal from "../components/common/CustomConfirmationModal";
import UserCardSkeleton from "../components/users/UserCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../store/actions";
import AnalyticsService from "../services/analytics";
import { RootState, AppDispatch } from "../store";
import { User, ViewMode, UserFormValues } from "../types";
import { Grid } from "antd";

const { Title } = Typography;

const UserListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: users,
    loading,
    totalUsers,
    perPage,
    currentPage,
  } = useSelector((state: RootState) => state.users);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [userToDeleteId, setUserToDeleteId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUsers(currentPage));
  }, [dispatch, currentPage]);

  const filteredUsers = users.filter((user: User) => {
    const fullName = `${user.first_name || ""} ${
      user.last_name || ""
    }`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    AnalyticsService.trackSearch(e.target.value);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      dispatch(fetchUsers(page));
    },
    [dispatch]
  );

  const handleCreateUser = useCallback(() => {
    setEditingUser(null);
    setIsModalVisible(true);
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  }, []);

  const handleSaveUser = useCallback(
    async (values: UserFormValues) => {
      let success = false;
      if (editingUser) {
        success = await dispatch(updateUser(editingUser.id, values));
      } else {
        success = await dispatch(createUser(values));
      }
      if (success) {
        dispatch(fetchUsers(currentPage));
      }
      return success;
    },
    [editingUser, dispatch, currentPage]
  );

  const handleDeleteUser = useCallback((id: number) => {
    setUserToDeleteId(id);
    setIsDeleteModalVisible(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    if (userToDeleteId !== null) {
      const success = await dispatch(deleteUser(userToDeleteId));
      if (success) {
        setIsDeleteModalVisible(false);
        setUserToDeleteId(null);
        dispatch(fetchUsers(currentPage));
      }
    }
  }, [userToDeleteId, dispatch, currentPage]);

  const handleViewToggle = useCallback((value: string) => {
    setViewMode(value as ViewMode);
    AnalyticsService.trackViewToggle(value);
  }, []);

  const skeletonCount = 6;

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        {/* Title - left */}
        <Col xs={24} md={12}>
          <Title level={3} style={{ margin: 0, textAlign: "left" }}>
            Users
          </Title>
        </Col>

        {/* Search + Create Button - right */}
        <Col xs={24} md={12}>
          <div
            style={{
              display: "flex",
              justifyContent: screens.xs ? "flex-start" : "flex-end",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <Input
              placeholder="Search by name"
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              value={searchQuery}
              allowClear
              style={{ width: screens.xs ? "100%" : "250px" }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateUser}
              block={screens.xs} // ✅ Full-width only on xs
            >
              Create User
            </Button>
          </div>
        </Col>
      </Row>

      {/* Row 2: Segmented View Toggle */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Segmented
            options={[
              { value: "table", icon: <TableOutlined />, label: "Table" },
              { value: "card", icon: <AppstoreOutlined />, label: "Card" },
            ]}
            value={viewMode}
            onChange={handleViewToggle}
            block={screens.xs} // full-width on mobile
          />
        </Col>
      </Row>

      {viewMode === "table" ? (
        <UserTable
          users={filteredUsers}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          loading={loading}
        />
      ) : loading ? (
        <UserCardListContainer>
          {Array.from({ length: skeletonCount }).map((_, index) => (
            <UserCardSkeleton key={index} />
          ))}
        </UserCardListContainer>
      ) : filteredUsers.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "40vh",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <>
                <Title level={4} type="secondary" style={{ marginBottom: 0 }}>
                  No users found
                </Title>
                <p style={{ color: "#999", marginBottom: 16 }}>
                  Try changing your search or add a new user.
                </p>
              </>
            }
          />
        </div>
      ) : (
        <UserCardListContainer>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          ))}
        </UserCardListContainer>
      )}

      <Row justify="end">
        <Col>
          <Pagination
            current={currentPage}
            pageSize={perPage}
            total={totalUsers}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{ marginTop: 24 }}
          />
        </Col>
      </Row>

      <UserFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleSaveUser}
        editingUser={editingUser}
        loading={loading}
      />

      <CustomConfirmationModal
        visible={isDeleteModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setIsDeleteModalVisible(false)}
        title="Confirm Delete"
        content="Are you sure you want to delete this user?"
      />
    </Space>
  );
};

export default UserListPage;

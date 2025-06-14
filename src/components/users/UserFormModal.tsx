import React, { useEffect } from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { User, UserFormValues } from '../../types'; 

interface UserFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: UserFormValues) => Promise<boolean>; 
  editingUser: User | null;
  loading: boolean;
}

const UserFormModal: React.FC<UserFormModalProps> = ({ visible, onCancel, onSave, editingUser, loading }) => {
  const [form] = Form.useForm<UserFormValues>();

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (editingUser) {
        form.setFieldsValue({
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          email: editingUser.email,
        });
      }
    }
  }, [visible, editingUser, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const success = await onSave(values);
      if (success) {
        onCancel(); 
      }
    } catch (info: any) {
      console.log('Validate Failed:', info);
    }
  };

  return (
    <Modal
      title={editingUser ? 'Edit User' : 'Create User'}
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          {editingUser ? 'Update' : 'Create'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="user_form">
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: 'Please enter the first name' }]}
        >
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter the last name' }]}
        >
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter the email' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="profile_image_link"
          label="Profile Image Link"
          rules={[
            { required: true, message: 'Please enter the profile image link' },
          ]}
        >
          <Input placeholder="Profile Image Link" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserFormModal;

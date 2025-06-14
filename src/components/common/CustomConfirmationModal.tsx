import React from 'react';
import { Button, Modal } from 'antd';

interface CustomConfirmationModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  content: string;
}

const CustomConfirmationModal: React.FC<CustomConfirmationModalProps> = ({ visible, onConfirm, onCancel, title, content }) => {
  return (
    <Modal
      title={title}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default CustomConfirmationModal;

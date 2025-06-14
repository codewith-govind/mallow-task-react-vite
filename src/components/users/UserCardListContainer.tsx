import React from "react";
import { Row, Col } from "antd";

interface Props {
  children: React.ReactNode;
}

const UserCardListContainer: React.FC<Props> = ({ children }) => {
  return (
    <Row gutter={[16, 16]}>
      {React.Children.map(children, (child) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={6}>
          {child}
        </Col>
      ))}
    </Row>
  );
};

export default UserCardListContainer;

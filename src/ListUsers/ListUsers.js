import React from "react";
import { Table, Button, Row, Col } from "antd";

import "./ListUsers.css";

const ListUsers = (props) => {
  const { toggleModal } = props;
  return (
    <Row>
      <Col span="2"></Col>
      <Col span="20" style={{ marginTop: "30px" }}>
        <Button className="adduser" type="primary" onClick={toggleModal}>
          Add User
        </Button>
        {/* <Space>
          <Spin size="large" />
        </Space> */}
        <Table
          columns={props.columns}
          dataSource={props.data}
          rowKey="id"
          pagination={{ position: ["topRight"] }}
        ></Table>
      </Col>
      <Col span="2"></Col>
    </Row>
  );
};

export default ListUsers;

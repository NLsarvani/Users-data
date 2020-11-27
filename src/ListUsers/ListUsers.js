import React from "react";
import { Table, Button, Row, Col, Space, Spin } from "antd";
import { Input, Form, Select, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
// import SearchField from "react-search-field";

import "./ListUsers.css";

const ListUsers = ({ toggleModal, columns, data, isLoading, searchUsers }) => {
  return (
    <div>
      {isLoading ? (
        <div>
          <Row>
            <Col span="12"></Col>
            <Col span="6" className="spinner">
              <Space>
                <Spin size="large" />
              </Space>
            </Col>
            <Col span="6"></Col>
          </Row>
        </div>
      ) : (
        <div>
          <Row>
            <Col span="2"></Col>
            <Col span="20" style={{ marginTop: "30px" }}>
              {/* <SearchField
                placeholder="Search..."
                onChange={searchUsers}
                searchText={""}
                classNames="test-class"
              /> */}
              <Row className="user">
                <Col span="16">
                  <Form name="normal_login" className="login-form">
                    <Form.Item name="password">
                      <Input
                        suffix={
                          <SearchOutlined className="site-form-item-icon" />
                        }
                        type="text"
                        placeholder="Search User"
                        onChange={searchUsers}
                      />
                    </Form.Item>
                  </Form>
                </Col>
                <Col span="6"></Col>
                <Col span="2">
                  <Button type="primary" onClick={toggleModal}>
                    Add User
                  </Button>
                </Col>
              </Row>
              <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                pagination={{ position: ["topRight"] }}
              ></Table>
            </Col>
            <Col span="2"></Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ListUsers;

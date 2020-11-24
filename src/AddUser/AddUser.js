import React from "react";
import { Row, Col, Input, Button, Form, Select, Modal } from "antd";

import "./AddUser.css";

const AddUser = ({
  data,
  handleOk,
  toggleModal,
  handleInput,
  selectCountry,
  selectState,
  visible,
  validator,
  user_data,
}) => {
  const { Option } = Select;
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  };
  return (
    <div>
      <div>
        <Modal
          title="Add User"
          visible={visible}
          onOk={handleOk}
          onCancel={toggleModal}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
          >
            <Form.Item
              label="First Name"
              name="fname"
              className="form-group"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input
                className="form-control"
                placeholder="Add First Name"
                name="fname"
                onChange={handleInput}
                // value={user_data.fname}
              />
              {validator.message("first name", data.fname, "required|alpha")}
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lname"
              className="form-group"
              rules={[
                { required: true, message: "Please input your lastname!" },
              ]}
            >
              <Input
                className="form-control"
                placeholder="Add Last Name"
                name="lname"
                // value={user_data.lname}
                onChange={handleInput}
              />
              {validator.message("last name", data.lname, "required|alpha")}
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="form-group"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                className="form-control"
                placeholder="Add email"
                name="email"
                // value={user_data.email}
                onChange={handleInput}
              />
              {validator.message("email", data.email, "required")}
            </Form.Item>

            <Form.Item
              name="country"
              label="Country"
              className="form-group"
              rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                defaultValue={data.country}
                onChange={selectCountry}
                // value={user_data.country}
                style={{ width: "100%" }}
              >
                {data.all_countries.map((country) => (
                  <Option key={country} className="form-control">
                    {country}
                  </Option>
                ))}
              </Select>
              {validator.message("country", data.country, "required")}
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              className="form-group"
              rules={[{ required: true }]}
            >
              <Select
                onChange={selectState}
                defaultValue={data.state}
                // value={user_data.state}
                style={{ width: "100%" }}
              >
                {data.states.map((city) => (
                  <Option key={city} className="form-control">
                    {city}
                  </Option>
                ))}
              </Select>
              {validator.message("State", data.state, "required")}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AddUser;

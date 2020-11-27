import React from "react";
import { Input, Form, Select, Modal } from "antd";
import { Alert, message } from "antd";

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
  save,
}) => {
  const { Option } = Select;
  const {
    fname,
    lname,
    email,
    countries,
    states,
    state,
    country,
    message,
  } = data;

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
      <Modal
        title="Add User"
        visible={visible}
        onOk={user_data === null ? handleOk : save}
        onCancel={toggleModal}
        maskClosable={false}
      >
        {message !== null ? (
          <Alert
            className="alert"
            message={message.message}
            type={message.type}
            showIcon
          />
        ) : (
          ""
        )}
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            label="First Name"
            className="form-group"
            hasFeedback
            validateStatus={validator.fname && "error"}
            help={validator.fname}
          >
            <Input
              className="form-control"
              placeholder="Add First Name"
              name="fname"
              onChange={handleInput}
              value={fname}
              required
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            className="form-group"
            hasFeedback
            validateStatus={validator.lname && "error"}
            help={validator.lname}
          >
            <Input
              className="form-control"
              placeholder="Add Last Name"
              name="lname"
              onChange={handleInput}
              value={lname}
            />
          </Form.Item>
          <Form.Item
            label="Email"
            className="form-group"
            hasFeedback
            validateStatus={validator.email && "error"}
            help={validator.email}
          >
            <Input
              className="form-control"
              placeholder="Add email"
              name="email"
              onChange={handleInput}
              value={email}
            />
          </Form.Item>

          <Form.Item label="Country" className="form-group">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              defaultValue={country}
              onChange={selectCountry}
              value={country}
              style={{ width: "100%" }}
            >
              {countries.map((country) => (
                <Option key={country} className="form-control">
                  {country}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="State"
            className="form-group"
            rules={[{ required: true }]}
          >
            <Select
              defaultValue={state}
              onChange={selectState}
              value={state}
              style={{ width: "100%" }}
            >
              {states.map((city) => (
                <Option key={city} className="form-control">
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddUser;

import React from "react";
import { Input, Form, Select, Modal } from "antd";

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
  console.log(validator);
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
                value={data.fname}
                required
              />
              {/* {validator.message("first name", data.fname, "required|alpha")} */}
            </Form.Item>
            <Form.Item
              label="Last Name"
              className="form-group"
              // rules={[
              //   { required: true, message: "Please input your lastname!" },
              // ]}
            >
              <Input
                className="form-control"
                placeholder="Add Last Name"
                name="lname"
                onChange={handleInput}
                value={data.lname}
              />
              {/* {validator.message("last name", data.lname, "required|alpha")} */}
            </Form.Item>
            <Form.Item
              label="Email"
              className="form-group"
              // rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                className="form-control"
                placeholder="Add email"
                name="email"
                onChange={handleInput}
                value={data.email}
                // onBlur={() => validator.showMessageFor("email")}
              />
              {/* {validator.message("email", data.email, "required|email")} */}
            </Form.Item>

            <Form.Item
              label="Country"
              className="form-group"
              // rules={[{ required: true }]}
            >
              <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                defaultValue={data.country}
                onChange={selectCountry}
                value={data.country}
                style={{ width: "100%" }}
              >
                {data.all_countries.map((country) => (
                  <Option key={country} className="form-control">
                    {country}
                  </Option>
                ))}
              </Select>
              {/* {validator.message("country", data.country, "required")} */}
            </Form.Item>
            <Form.Item
              label="State"
              className="form-group"
              rules={[{ required: true }]}
            >
              <Select
                defaultValue={data.state}
                onChange={selectState}
                value={data.state}
                style={{ width: "100%" }}
              >
                {data.states.map((city) => (
                  <Option key={city} className="form-control">
                    {city}
                  </Option>
                ))}
              </Select>
              {/* {validator.message("State", data.state, "required")} */}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AddUser;

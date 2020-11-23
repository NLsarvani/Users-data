import React from "react";
import SimpleReactValidator from "simple-react-validator";
import { Row, Col, Input, Button, Select, Modal } from "antd";

import countries from "../countries.json";

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount = () => {
    this.validator = new SimpleReactValidator();
  };

  render() {
    const { Option } = Select;
    const {
      data,
      handleOk,
      toggleModal,
      handleInput,
      selectCountry,
      selectState,
    } = this.props;
    const {
      country,
      fname,
      lname,
      all_countries,
      all_states,
      state,
    } = this.props.data;
    console.log(data);
    console.log(country, fname, lname, all_countries, all_states, state);
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={data.visible}
          onOk={handleOk}
          onCancel={toggleModal}
        >
          <div className="form-group">
            <Input
              className="form-control"
              placeholder="Add First Name"
              name="fname"
              onChange={handleInput}
              // value={data.fname}
              // onKeyDown={this.props.onKeyDown}
            />
            {this.validator.message("title", fname, "required|alpha")}
          </div>
          <div className="form-group">
            <Input
              placeholder="Add Last Name"
              name="lname"
              onChange={handleInput}
              // onChange={this.props.addTask}
              // value={lname}
              // onKeyDown={this.props.onKeyDown}
            />
          </div>
          <div className="form-group">
            <Input
              placeholder="Add Email"
              name="email"
              onChange={handleInput}
              // onChange={this.props.addTask}
              //   value={this.props.data.email}
              //   validator={this.props.validator}
            />
          </div>
          <div className="form-group">
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              defaultValue={country}
              onChange={selectCountry}
              style={{ width: "100%" }}
            >
              {data.all_countries.map((country) => (
                <Option key={country}>{country}</Option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <Select
              onChange={selectState}
              defaultValue={state}
              style={{ width: "100%" }}
            >
              {all_states.map((city) => (
                <Option key={city}>{city}</Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    );
  }
}

export default AddUser;

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
    const { data, handleOk, toggleModal } = this.props;
    // console.log(data);
    // console.log(this.validator.getErrorMessages());
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
              onChange={this.props.addFirstName}
              value={this.props.data.fname}
              // onKeyDown={this.props.onKeyDown}
            />
            {this.validator.message(
              "title",
              this.props.fname,
              "required|alpha"
            )}
          </div>
          <div className="form-group">
            <Input
              placeholder="Add Last Name"
              name="lname"
              onChange={this.props.addFirstName}
              // onChange={this.props.addTask}
              // value={this.props.data.userInput}
              // onKeyDown={this.props.onKeyDown}
            />
          </div>
          <div className="form-group">
            <Input
              placeholder="Add Email"
              name="email"
              onChange={this.props.addFirstName}
              // onChange={this.props.addTask}
              //   value={this.props.data.email}
              //   validator={this.props.validator}
              // onKeyDown={this.props.onKeyDown}
            />
            {this.validator.message(
              "email",
              this.props.data.email,
              "required|email",
              { className: "text-danger" }
            )}

            {/* <label>Address Line 1</label>
                        <input className="form-control" /> */}
            {/* {this.validator.message('title', this.state.title, 'required|alpha')} */}
          </div>
          <div className="form-group">
            {/* <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
        {provinceData.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select> */}
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              defaultValue={this.props.data.country}
              onChange={this.props.selectCountry}
              onSearch={this.props.onSearch}
              style={{ width: "100%" }}
            >
              {/* countries.map((country)=>{

                            }) */}
              {this.props.data.all_countries.map((country) => (
                <Option key={country}>{country}</Option>
              ))}
            </Select>
          </div>
          <div className="form-group">
            <Select
              onChange={this.props.selectState}
              defaultValue={this.props.data.state}
              style={{ width: "100%" }}
            >
              {this.props.data.all_states.map((city) => (
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

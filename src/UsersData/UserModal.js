import React from 'react'
import SimpleReactValidator from 'simple-react-validator';
import { Row, Col, Input, Button, Select, Modal } from "antd";

import countries from '../countries.json';
import { render } from '@testing-library/react';

class UserModal extends React.Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
    }

    // // const selectedstate = ''
    // console.log(states[this.props.country])
    // if(this.props.country){
    // this.selectedstate = states[this.props.country]
    // }
    // const [state, setCities] = React.useState(states[country[0]]);
    // const [secondCity, setSecondCity] = React.useState(states[country[0]][0]);

    // render() {
    // console.log(this.props)
    // console.log(this.selectedstate)

    // const onChange = (value) => {
    //     console.log(value)
    //     setCities(states[value]);
    //     setSecondCity(states[value][0]);
    // };

    // const onSecondCityChange = value => {
    //     setSecondCity(value);
    // };
    // const d = countries['countries'].map((key,value) =>
    //     console.log(key)
    // console.log(value)
    // Object.entries(task).forEach(([key, value]) =>
    //   country.push(key),
    //   states.push(value)
    // )
    //   );
    //   console.log(d)
    // console.log(country)
    render() {
        const { Option } = Select;
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.props.data.visible}
                    onOk={this.props.handleOk}
                    onCancel={this.props.handleCancel}
                >
                    <div className="form-group">

                        <Input
                            placeholder="Add First Name"
                            name="fname"
                            // value={this.state.title} onChange={this.setTitle} 
                            onChange={this.props.addFirstName}
                            value={this.props.data.userInput}
                        // onKeyDown={this.props.onKeyDown}
                        />
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
                        // value={this.props.data.userInput}
                        // onKeyDown={this.props.onKeyDown}
                        />
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
                            style={{ width: 200 }}
                            placeholder="Select a person"
                            optionFilterProp="children"
                            defaultValue={this.props.data.country}
                            onChange={this.props.selectCountry}
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            onSearch={this.props.onSearch}
                        >
                            {/* countries.map((country)=>{

                            }) */}
                            {
                                this.props.data.all_countries.map((country) => (
                                    <Option key={country}>{country}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="form-group">
                        <Select style={{ width: 120 }} onChange={this.props.selectState}
                            defaultValue={this.props.data.state}
                        >
                            {this.props.data.all_states.map(city => (
                                <Option key={city}>{city}</Option>
                            ))}
                        </Select>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default UserModal;

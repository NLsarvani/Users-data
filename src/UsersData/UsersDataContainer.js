import React from 'react'
import axios from 'axios';
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

import UsersData from './UsersData';
import UserModal from './UserModal';
import countries from '../countries.json';

class UsersDataContainer extends React.Component {
    all_countries = Object.keys(countries['countries'])
    all_states = countries['countries']
    state = {
        fname: '',
        lname: '',
        email: '',
        all_countries: this.all_countries,
        all_states: this.all_states[this.all_countries[0]],
        country: this.all_countries[0],
        state: this.all_states[this.all_countries[0]][0],
        data: [],
        visible: false
    };
    usersData = [];



    constructor(props) {
        super(props)
        this.getUserData()
    }
    // state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
        const { fname, lname, email, data, country, state } = this.state;
        // if ((this.state.userInput !== "") & (this.state.createdValue === "")) {
        // if (this.state.userInput !== "" && this.state.createdValue === "") {
        const newUser = {
            // id: (data.length) + 1,
            fname: fname,
            lname: lname,
            email: email,
            country: country,
            state: state
        };
        //   const tasks = [...tasks];
        // data.push(newUser);
        // this.setState({
        //     data,
        //     // userInput: "",
        //     // createdValue: "",
        // });
        axios.post('http://localhost:3001/users',newUser).then((response) => {
            // method: 'post',
            // url: 'myurl',
            // data: bodyFormData,
            // headers: {'Content-Type': 'multipart/form-data' }
            // })
            // .then(function (response) {
            //     //handle success
            //     console.log(response);
            // })
            // .catch(function (response) {
            //     //handle error
                console.log(response);
            });
    console.log(this.state)
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    getUserData = () => {
        axios.get('http://localhost:3001/users').then((response) => {
            this.setState({
                'data': response.data[0]
            })
        }
        );
    };
    // }

    columns = [
        {
            title: 'S.No. ',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'First Name',
            dataIndex: 'fname',
            key: 'fname',
        },
        {
            title: 'Last Name',
            dataIndex: 'lname',
            key: 'lname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        //   onClick={() => edit(id)}
                        shape="circle"
                        icon={<EditOutlined />}

                    />

                    <Button
                        type="primary"
                        // onClick={() => onDelete(id)}
                        shape="circle"
                        icon={<DeleteOutlined />}
                    />
                </Space>
            ),
        },
    ];

    addFirstName = (event) => {
        // console.log(ev)
        const { name, value } = event.target
        // console.log(name, value)
        // const newTaskObj = {
        //     id: this.state.data.length+1,
        //     fname: '',
        //     lname: '',
        //     email:'',
        //     country:'',
        //     state:''
        // };
        this.setState({ [name]: value })
        console.log(this.state)
        // console.log(newTaskObj)
    }

    selectCountry = (value) => {
        console.log(value)
        console.log(this.all_states[value]);
        console.log(this.all_states[value][0])
        this.setState({
            country: value,
            all_states: this.all_states[value],
            state: this.all_states[value][0]
        })
        console.log(this.state)
    }
    selectState = (value) => {
        console.log(value)
        this.setState({
            state: value,
        })
    }
    onBlur = () => {
        console.log('blur');
    }

    onFocus = (value) => {
        console.log('focus');
    }

    onSearch = (val) => {
        console.log('search:', val);
    }

    render() {

        return (

            <div>
                <Button className="adduser" type="primary" onClick={this.showModal}  >
                    Add User
            </Button>
                <UserModal showModal={this.showModal}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    data={this.state}
                    addFirstName={this.addFirstName}
                    onBlur={this.onBlur}
                    onFocus={this.onFocus}
                    selectCountry={this.selectCountry}
                    selectState={this.selectState}
                // all_countries={this.all_countries}
                // all_states={this.all_states}
                />

                <UsersData columns={this.columns}
                    data={this.state.data}

                />
                {/* <Table columns={this.columns} dataSource={this.state.data} rowKey="_id"
                    pagination={{ position: ['topRight'] }} /> */}
            </div>
        );
    }
}
// }

export default UsersDataContainer;

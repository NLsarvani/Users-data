import React from "react";
import axios from "axios";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";

import "antd/dist/antd.css";

import ListUsers from "./ListUsers";
import AddUserContainer from "../AddUser/AddUserContainer";

class ListUsersContainer extends React.Component {
  state = {
    user_data: {
      fname: "",
      lname: "",
      email: "",
      country: "",
      state: "",
    },
    data: [],
    visible: false,
  };
  usersData = [];

  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        this.setState({
          data: response.data,
        });
      })
      .catch((response) => {
        console.log(response);
      });
  };

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  addUser = (newUser) => {
    const data = [...this.state.data];
    data.push(newUser);
    this.setState({
      data,
    });
    return true;
  };

  onDelete = (user_id) => {
    axios
      .delete(`http://localhost:4000/users/${user_id}`)
      .then((response) => {
        if (response.status === 200) {
          const { data } = this.state;
          // const tasks = [...tasks];
          const updateData = data.filter((user) => user.id !== user_id);
          this.setState({
            data: updateData,
          });
          message.success("Deleted Successfully");
        }
        // this.setState({
        //   data: response.data,
        // });
      })
      .catch((response) => {
        console.log(response);
      });
  };

  confirm = (user_id) => {
    this.onDelete(user_id);
  };

  cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
  columns = [
    {
      title: "S.No. ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => this.edit(record)}
            shape="circle"
            icon={<EditOutlined />}
          />
          <Popconfirm
            title="Are you sure to delete the User?"
            onConfirm={() => this.confirm(record.id)}
            onCancel={() => this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              // onClick={() => this.onDelete(record.id)}
              shape="circle"
              icon={<DeleteOutlined />}
            />{" "}
          </Popconfirm>
        </Space>
      ),
    },
  ];
  edit = (e) => {
    const { visible } = this.state;
    let { user_data } = this.state;
    user_data = e;
    this.setState({
      user_data,
      visible: !visible,
    });
  };

  render() {
    return (
      <div>
        <AddUserContainer
          data={this.state}
          toggleModal={this.toggleModal}
          addUser={this.addUser}
        />
        <ListUsers
          columns={this.columns}
          data={this.state.data}
          toggleModal={this.toggleModal}
        />
      </div>
    );
  }
}
// }

export default ListUsersContainer;

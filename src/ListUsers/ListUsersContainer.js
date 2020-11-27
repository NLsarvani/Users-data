import React from "react";
import axios from "axios";
import { Button, Space, Tooltip, message, Popconfirm, Result } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

import ListUsers from "./ListUsers";
import AddUserContainer from "../AddUser/AddUserContainer";

class ListUsersContainer extends React.Component {
  state = {
    user_data: null,
    data: [],
    visible: false,
    isLoading: false,
    // statusCode: "",
  };

  componentDidMount() {
    this.getUserData();
  }
  getUserData = () => {
    this.setState({
      isLoading: true,
    });
    axios
      .get("http://localhost:4000/users")
      .then((response) => {
        // this.setState({
        //   statusCode: response.status,
        // });
        if (response.status === 200) {
          this.setState({
            data: response.data,
            isLoading: false,
            statusCode: response.status,
          });
        }
      })
      .catch((response) => {
        console.log(response);
        // this.setState({
        //   statusCode: response.status,
        // });
      });
  };
  searchUsers = (event) => {
    const { value } = event.target;
    const { data } = this.state;
    axios.get(`http://localhost:4000/users/?q=${value}`).then((response) => {
      const { status, data } = response;
      if (status === 200) {
        this.setState({
          data: data,
        });
      }
    });
    // }
  };
  toggleModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });

    if (!visible) {
      this.setState({
        user_data: null,
      });
    }
  };

  addUser = (newUser) => {
    const data = [...this.state.data];
    data.push(newUser);
    this.setState({
      data,
    });
    message.success("Successfully added user", 2);
    return true;
  };

  updateUser = (updatedUser) => {
    const data = [...this.state.data];
    data.map((item, i) => {
      if (item.id === updatedUser.id) {
        data[i] = updatedUser;
      }
    });
    this.setState({
      data,
    });
    message.success("Successful", 2);
    return true;
  };

  onDelete = (user_id) => {
    const { data } = this.state;
    axios
      .delete(`http://localhost:4000/users/${user_id}`)
      .then((response) => {
        if (response.status === 200) {
          const updateData = data.filter((user) => user.id !== user_id);
          this.setState({
            data: updateData,
          });
          message.success("Deleted Successfully");
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  confirm = (user_id) => {
    this.onDelete(user_id);
  };

  cancel = (e) => {
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
          <Tooltip placement="topLeft" title="Edit user" color="#FF8718">
            <Button
              type="primary"
              onClick={() => this.edit(record)}
              shape="circle"
              icon={<EditOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure to delete the User?"
            onConfirm={() => this.confirm(record.id)}
            onCancel={() => this.cancel}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip placement="bottomLeft" title="Delete user" color="#FF8718">
              <Button type="primary" shape="circle" icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  edit = (record) => {
    const { visible } = this.state;
    this.setState({
      user_data: record,
      visible: !visible,
    });
  };

  render() {
    const { user_data, visible, data, isLoading } = this.state;
    return (
      <div>
        <AddUserContainer
          user_data={user_data}
          visible={visible}
          toggleModal={this.toggleModal}
          addUser={this.addUser}
          updateUser={this.updateUser}
        />
        {/* {statusCode !== ("200" || "") ? (
          <Result
            status={statusCode}
            title={statusCode}
            subTitle="Sorry, something went wrong."
          />
        ) : ( */}
        <ListUsers
          columns={this.columns}
          data={data}
          isLoading={isLoading}
          toggleModal={this.toggleModal}
          searchUsers={this.searchUsers}
        />
        ){/* } */}
      </div>
    );
  }
}
// }

export default ListUsersContainer;

// if (response.status === 200) {
// d.filter((item) => {
//   // console.log(item);
//   if (
//     item.fname.toLowerCase().includes(items.toLowerCase()) ||
//     item.lname.toLowerCase().includes(items.toLowerCase()) ||
//     item.lname.toLowerCase().includes(items.toLowerCase()) ||
//     item.email.toLowerCase().includes(items.toLowerCase()) ||
//     item.country.toLowerCase().includes(items.toLowerCase()) ||
//     item.state.toLowerCase().includes(items.toLowerCase())
//   ) {
//     searchItems.push(item);
//   }
// });
// }
// data.map((item, i) => {
//   if (
//     item.fname.toLowerCase() === items.toLowerCase() ||
//     item.lname.toLowerCase() === items.toLowerCase() ||
//     item.email.toLowerCase() === items.toLowerCase() ||
//     item.country.toLowerCase() === items.toLowerCase() ||
//     item.state.toLowerCase() === items.toLowerCase()
//   ) {
//     searchItems.push(item);

//   }
// if (!items === true) {
//   console.log(data);
//   searchItems = [];
//   console.log(data);
//   this.setState({
//     data,
//   });
// }
// });

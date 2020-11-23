import React from "react";
import axios from "axios";
import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import SimpleReactValidator from "simple-react-validator";

import "antd/dist/antd.css";

import ListUsers from "./ListUsers";
// import AddUser from "./AddUser/AddUser";
import countries from "../countries.json";
import AddUserContainer from "../AddUser/AddUserContainer";

class ListUsersContainer extends React.Component {
  all_countries = Object.keys(countries["countries"]);
  all_states = countries["countries"];
  state = {
    fname: "",
    lname: "",
    email: "",
    all_countries: this.all_countries,
    all_states: this.all_states[this.all_countries[0]],
    country: this.all_countries[0],
    state: this.all_states[this.all_countries[0]][0],
    data: [],
    visible: false,
  };
  usersData = [];

  constructor(props) {
    super(props);
    this.getUserData();
    // this.validator = new SimpleReactValidator();
  }
  // handleCancel = (e) => {
  //   this.setState({
  //     visible: false,
  //   });
  // };

  getUserData = () => {
    axios.get("http://localhost:4000/users").then((response) => {
      this.setState({
        data: response.data[0],
      });
    });
  };
  // }
  componentDidMount = () => {
    const validator = new SimpleReactValidator();
    this.setState({ validator });
    // console.log("zxcvbn------->", zxcvbn("root#jumperworld@1987.com"));
    // console.log("this.validator -->", this.Validator);
  };

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  addUser = (newUser) => {
    // Push newly created user to array of users in state.
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

  render() {
    return (
      <div>
        <AddUserContainer data={this.state} toggleModal={this.toggleModal} />
        {/* <AddUser
          showModal={this.showModal}
          addFirstName={this.addFirstName}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          selectCountry={this.selectCountry}
          selectState={this.selectState}
        /> */}
        <ListUsers
          columns={this.columns}
          data={this.state.data}
          toggleModal={this.toggleModal}
        />
        {/* <Table columns={this.columns} dataSource={this.state.data} rowKey="_id"
                    pagination={{ position: ['topRight'] }} /> */}
      </div>
    );
  }
}
// }

export default ListUsersContainer;

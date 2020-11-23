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

  getUserData = () => {
    axios.get("http://localhost:3001/users").then((response) => {
      this.setState({
        data: response.data[0],
      });
    });
  };

  toggleModal = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  addUser = (newUser) => {
    console.log(this.state);
    console.log(newUser);
    // Push newly created user to array of users in state.

    //   axios
    //     .post("http://localhost:3001/users", newUser)
    //     .then((response) => {
    //       // console.log(data);
    //       // console.log(response.data);
    //       // if (response.request.status) {
    //       data.push(newUser);
    //       this.setState({
    //         data: data,
    //         fname: "",
    //         lname: "",
    //         email: "",
    //         all_countries: this.all_countries,
    //         all_states: this.all_states[this.all_countries[0]],
    //         country: this.all_countries[0],
    //         state: this.all_states[this.all_countries[0]][0],
    //         // visible: false,
    //       });
    //       // }
    //     })
    //     .catch((response) => {
    //       console.log(response);
    //     });
    //   // } else {
    //   //   this.validator.showMessages();
    //   //   // rerender to show messages for the first time
    //   //   // you can use the autoForceUpdate option to do this automatically`
    //   //   this.forceUpdate();
    //   // }
    // };
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
  showModal = () => {
    console.log(this.props);
    this.setState({
      visible: true,
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

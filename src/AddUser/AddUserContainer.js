import React from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { Button } from "antd";

import AddUser from "./AddUser";

class AddUserContainer extends React.Component {
  // all_countries = Object.keys(countries["countries"]);
  // all_states = countries["countries"];
  // state = {
  //   fname: "",
  //   lname: "",
  //   email: "",
  //   all_countries: this.all_countries,
  //   all_states: this.all_states[this.all_countries[0]],
  //   country: this.all_countries[0],
  //   state: this.all_states[this.all_countries[0]][0],
  //   data: [],
  //   visible: false,
  // };
  // usersData = [];

  constructor(props) {
    super(props);
    // console.log(this.props);
  }
  componentDidMount = () => {
    this.validator = new SimpleReactValidator();
  };

  // state = { visible: false };

  handleOk = (e) => {
    const { fname, lname, email, data, country, state } = this.state;
    const { toggleModal } = this.props;
    // if ((this.state.userInput !== "") & (this.state.createdValue === "")) {
    // if (this.state.userInput !== "" && this.state.createdValue === "") {
    const newUser = {
      id: data.length + 1,
      fname: fname,
      lname: lname,
      email: email,
      country: country,
      state: state,
    };
    //   const tasks = [...tasks];
    // data.push(newUser);
    // this.setState({
    //     data,
    //     // userInput: "",
    //     // createdValue: "",
    // });

    // Push the user and close the modal window
    // addUser(newUser)
    // toggleModal();

    axios
      .post("http://localhost:4000/users", newUser)
      .then((response) => {
        // console.log(data);
        // console.log(response.data);
        // if (response.request.status) {
        data.push(newUser);
        this.setState({
          data: data,
          fname: "",
          lname: "",
          email: "",
          all_countries: this.all_countries,
          all_states: this.all_states[this.all_countries[0]],
          country: this.all_countries[0],
          state: this.all_states[this.all_countries[0]][0],
          // visible: false,
        });
        // }
      })
      .catch((response) => {
        console.log(response);
      });
    // } else {
    //   this.validator.showMessages();
    //   // rerender to show messages for the first time
    //   // you can use the autoForceUpdate option to do this automatically`
    //   this.forceUpdate();
    // }
  };

  // handleCancel = (e) => {
  //   this.setState({
  //     // visible: false,
  //   });
  // };

  componentDidMount = () => {
    const validator = new SimpleReactValidator();
    this.setState({ validator });
  };

  // showModal = () => {
  //   console.log(this.props);
  //   this.props.data.visible = true;
  //   // this.setState({
  //   //   visible: true,
  //   // });
  // };

  selectCountry = (value) => {
    this.setState({
      country: value,
      all_states: this.all_states[value],
      state: this.all_states[value][0],
    });
  };
  selectState = (value) => {
    this.setState({
      state: value,
    });
  };

  addFirstName = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(newTaskObj)
  };

  // handleCancel = (e) => {
  //   this.setState({
  //     visible: false,
  //   });
  // };
  render() {
    const { toggleModal } = this.props;
    return (
      <div>
        <AddUser
          toggleModal={toggleModal}
          handleOk={this.handleOk}
          data={this.props.data}
          // handleCancel={this.handleCancel}
          addFirstName={this.addFirstName}
          // onBlur={this.onBlur}
          // onFocus={this.onFocus}
          selectCountry={this.selectCountry}
          selectState={this.selectState}
        />
      </div>
    );
  }
}
// }

export default AddUserContainer;

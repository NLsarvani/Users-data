import React from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { Button } from "antd";

import AddUser from "./AddUser";
import countries from "../countries.json";

class AddUserContainer extends React.Component {
  all_countries = Object.keys(countries["countries"]);
  all_states = countries["countries"];

  state = {
    states: [],
  };

  componentDidMount = () => {
    console.log(this.props.data);
    this.validator = new SimpleReactValidator();
  };

  handleOk = (e) => {
    console.log(this.props.data);
    const { fname, lname, email, country, state } = this.state;
    const { toggleModal, addUser } = this.props;
    const newUser = {
      // id: data.length + 1,
      fname: fname,
      lname: lname,
      email: email,
      country: country,
      state: state,
    };

    // post user details to the api to store in data
    axios.post("http://localhost:4000/users", newUser).then((response) => {
      if (response.status === 200) {
        // Push the user and close the modal window
        addUser(response.data);
        toggleModal();
      }
    });
  };

  selectCountry = (value) => {
    // const { country, all_states, state } = this.props.data;
    this.setState({
      country: value,
      states: this.all_states[value],
      state: this.all_states[value][0],
    });
  };
  selectState = (value) => {
    // console.log(this.props.data);
    // const { state } = this.state;
    this.setState({
      state: value,
    });
  };

  handleInput = (event) => {
    // console.log(this.props.data);

    const { name, value } = event.target;
    this.setState({ [name]: value });
    // console.log(this.props.data);
  };

  render() {
    // console.log(this.props);
    const { toggleModal } = this.props;
    const { states } = this.state;

    return (
      <div>
        <AddUser
          toggleModal={toggleModal}
          handleOk={this.handleOk}
          data={this.props.data}
          handleInput={this.handleInput}
          selectCountry={this.selectCountry}
          selectState={this.selectState}
          states={states}
        />
      </div>
    );
  }
}
// }

export default AddUserContainer;

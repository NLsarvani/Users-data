import React from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import { Alert, message } from "antd";

import AddUser from "./AddUser";
import countries from "../countries.json";

class AddUserContainer extends React.Component {
  all_countries = Object.keys(countries["countries"]);
  all_states = countries["countries"];

  state = {
    fname: "",
    lname: "",
    email: "",
    countries: this.all_countries,
    states: this.all_states[this.all_countries[0]],
    country: this.all_countries[0],
    state: this.all_states[this.all_countries[0]][0],
    message: null,
    // err: true,
  };

  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    if (this.props.user_data) {
      const {
        id,
        fname,
        lname,
        email,
        state,
        country,
        countries,
        states,
      } = this.props.user_data;
      this.setState({
        fname: fname,
        lname: lname,
        email: email,
        country: country,
        state: state,
        [countries]: this.all_countries,
        [states]: this.all_states[country],
      });
    }
  }

  componentDidUpdate(prevProps, previousState) {
    const { user_data } = this.props;
    if (user_data !== null && user_data !== prevProps.user_data) {
      const {
        id,
        fname,
        lname,
        email,
        state,
        country,
        countries,
        states,
      } = this.props.user_data;
      this.setState(
        {
          id,
          fname,
          lname,
          email,
          state,
          country,
          [countries]: this.all_countries,
          [states]: this.all_states[country],
        },
        () => {}
      );
    } else {
      if (user_data !== prevProps.user_data) {
        this.setState({
          fname: "",
          lname: "",
          email: "",
          countries: this.all_countries,
          states: this.all_states[this.all_countries[0]],
          country: this.all_countries[0],
          state: this.all_states[this.all_countries[0]][0],
        });
      }
    }
  }

  handleOk = (e) => {
    const { fname, lname, email, country, state } = this.state;
    console.log(
      this.validator.message("fname", fname, "required") ? "success" : "error"
    );
    this.validator.message("fname", fname, "required");
    this.validator.message("lname", lname, "required");
    this.validator.message("email", email, "required|email");

    if (this.validator.allValid()) {
      const { toggleModal, addUser } = this.props;
      const newUser = {
        fname: fname,
        lname: lname,
        email: email,
        country: country,
        state: state,
      };
      axios
        .post("http://localhost:4000/users", newUser)
        .then((response) => {
          console.log(response);
          if (response.status === 201) {
            let d = addUser(response.data);
            if (d) {
              this.setState({
                fname: "",
                lname: "",
                email: "",
                countries: this.all_countries,
                states: this.all_states[this.all_countries[0]],
                country: this.all_countries[0],
                state: this.all_states[this.all_countries[0]][0],
              });
              // toggleModal();
            }
          }
        })
        .catch((response) => {
          if (response.request.status === 500) {
            this.setState({
              message: { type: "error", message: "Something went wrong" },
            });
          }
          console.log(response.request);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  save = (e) => {
    const { id, fname, lname, email, country, state } = this.state;
    this.validator.message("fname", fname, "required");
    this.validator.message("lname", lname, "required");
    this.validator.message("email", email, "required");

    if (this.validator.allValid()) {
      const { toggleModal, updateUser } = this.props;
      const newUser = {
        fname: fname,
        lname: lname,
        email: email,
        country: country,
        state: state,
      };
      axios
        .patch(`http://localhost:4000/users/${id}`, newUser)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            let d = updateUser(response.data);
            if (d) {
              this.setState({
                fname: "",
                lname: "",
                email: "",
                countries: this.all_countries,
                states: this.all_states[this.all_countries[0]],
                country: this.all_countries[0],
                state: this.all_states[this.all_countries[0]][0],
              });
              toggleModal();
            }
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  selectCountry = (value) => {
    this.setState({
      country: value,
      states: this.all_states[value],
      state: this.all_states[value][0],
    });
  };

  selectState = (value) => {
    this.setState({
      state: value,
    });
  };

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { toggleModal, user_data, visible } = this.props;
    return (
      <div>
        <AddUser
          toggleModal={toggleModal}
          handleOk={this.handleOk}
          data={this.state}
          handleInput={this.handleInput}
          selectCountry={this.selectCountry}
          selectState={this.selectState}
          visible={visible}
          validator={this.validator.getErrorMessages()}
          user_data={user_data}
          save={this.save}
        />
      </div>
    );
  }
}
// }

export default AddUserContainer;

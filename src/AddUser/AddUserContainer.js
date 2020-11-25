import React from "react";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";

import AddUser from "./AddUser";
import countries from "../countries.json";

class AddUserContainer extends React.Component {
  all_countries = Object.keys(countries["countries"]);
  all_states = countries["countries"];

  state = {
    fname: "",
    lname: "",
    email: "",
    all_countries: this.all_countries,
    states: this.all_states[this.all_countries[0]],
    country: this.all_countries[0],
    state: this.all_states[this.all_countries[0]][0],
  };
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator();
  }

  componentDidMount() {
    if (this.props.user_data) {
      const { id, fname } = this.props.user_data;
      this.setState({ fname: fname });
    }
  }

  // shouldComponentUpdate() {
  //   console.log("shouldComponentUpdate");
  //   return true;
  // }

  componentDidUpdate(prevProps, previousState) {
    const { user_data } = this.props;

    if (user_data !== null && user_data !== prevProps.user_data) {
      const { id, fname } = this.props.user_data;
      this.setState({ fname }, () => {
        console.log(this.state);
      });
    } else {
      if (user_data !== prevProps.user_data) {
        this.setState({ fname: "" });
      }
    }
  }

  handleOk = (e) => {
    const { fname } = this.state;
    this.validator.message("fname", fname, "required");

    if (this.validator.allValid()) {
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
      axios
        .post("http://localhost:4000/users", newUser)
        .then((response) => {
          if (response.status === 201) {
            // Push the user and close the modal window
            let d = addUser(response.data);
            if (d) {
              this.setState({
                fname: "",
                lname: "",
                email: "",
                all_countries: this.all_countries,
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
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
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
    const { toggleModal } = this.props;
    return (
      <div>
        <AddUser
          toggleModal={toggleModal}
          handleOk={this.handleOk}
          data={this.state}
          handleInput={this.handleInput}
          selectCountry={this.selectCountry}
          selectState={this.selectState}
          visible={this.props.visible}
          validator={this.validator.getErrorMessages()}
          user_data={this.props.user_data}
        />
      </div>
    );
  }
}
// }

export default AddUserContainer;

/*
    if (
      this.props.user_data &&
      prevProps.user_data &&
      prevProps.user_data.fname !== this.props.user_data.fname &&
      this.props.user_data.lname !== prevProps.user_data.lname &&
      this.props.user_data.fname !== ""
    ) {
      console.log("YEss");
      const { fname, lname, email, country, state } = this.props.data.user_data;
      this.setState({
        fname: fname,
        lname: lname,
        email: email,
        country: country,
        state: state,
        all_countries: this.all_countries,
        states: this.all_states[country],
      });
    } else if (
      prevProps.user_data &&
      this.props.user_data &&
      prevProps.user_data.fname !== "" &&
      this.props.user_data.fname === ""
    ) {
      console.log("came");
    }
    */

// shouldComponentUpdate(nextprops, nextState) {
//   console.log(nextprops, nextState);
//   console.log(this.props, this.state);
//   // console.log(
//   //   this.props.data.user_data.fname,
//   //   nextprops.data.user_data.fname
//   // );
//   if (
//     // JSON.stringify(this.props.data) === JSON.stringify(prevProps.data) &&
//     nextprops.data.user_data.fname !== this.props.data.user_data.fname ||
//     nextState.fname !== ""
//     // this.props.data.user_data.lname !== nextprops.data.user_data.lname
//     //   &&
//     // this.props.data.visible === prevProps.data.visible
//   ) {
//     console.log("YEss");
//     const { fname, lname, email, country, state } = nextprops.data.user_data;
//     this.setState({
//       fname: fname,
//       lname: lname,
//       email: email,
//       country: country,
//       state: state,
//       all_countries: this.all_countries,
//       states: this.all_states[country],
//     });
//     return true;
//   } else {
//     console.log(
//       nextprops.data.user_data.fname !== this.props.data.user_data.fname,
//       nextState.fname !== ""
//     );
//     return true;
//   }
// }
// }

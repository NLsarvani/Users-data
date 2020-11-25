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

  componentDidUpdate(prevProps) {
    console.log(prevProps, this.props);
    // console.log(JSON.stringify(this.props) !== JSON.stringify(prevProps));
    if (
      // JSON.stringify(this.props.data) === JSON.stringify(prevProps.data) &&
      JSON.stringify(this.props.user_data) ===
        JSON.stringify(prevProps.user_data) &&
      this.props.data.visible === prevProps.data.visible
    ) {
      console.log("YEss");
    } else {
      console.log("came");
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
    }
  }
  // }

  handleOk = (e) => {
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
          visible={this.props.data.visible}
          validator={this.validator}
          user_data={this.props.data.user_data}
        />
      </div>
    );
  }
}
// }

export default AddUserContainer;

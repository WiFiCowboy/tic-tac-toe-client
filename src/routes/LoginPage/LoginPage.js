import React, { Component } from "react";
import LoginForm from "../../LoginForm/LoginForm";
import Greeting from "../../Greeting/Greeting";
import { Section } from "../../Utils/Utils";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/loggedin";
    history.push(destination);
  };

  render() {
    return (
      <Section className="LoginPage">
        <Greeting />
        <h2>Login to your account</h2>

        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </Section>
    );
  }
}

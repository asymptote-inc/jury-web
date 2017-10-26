import React, { Component } from 'react';
import {
  Form,
  Button,
  Grid,
  Header,
  Image,
  Segment,
  Divider,
  Message
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import { validEmail, validUsername, validPassword } from '../util/validator';
import ApiManager from '../../xapi/apiManager';
const register = ApiManager.register;

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      confirm: '',
      opt1: false,
      opt2: false,
      opt3: false,
      redirect: false
    };
  }

  submit = async () => {
    // validity
    const { confirm, opt1, opt2, opt3, email, username, password } = this.state;
    // console.log(this.state);
    if (
      (validEmail(email) || validUsername(username)) &&
      validPassword(password) &&
      password === confirm &&
      opt1 &&
      opt2 &&
      opt3
    ) {
      const registered = await register({ email, username, password });
      if (registered) {
        alert("Registered! Please log in now. ");
        this.setState({ redirect: true });
      } else {
        console.log('Registration failed. ');
      }
    }
  };

  render() {
    return (
      <div className="sign-up-form">
        {this.state.redirect && <Redirect to="/login" />}
        <style>{`
          body > div,
          body > div > div,
          body > div > div > div.sign-up-form {
            height: 100%;
          }
        `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="green" textAlign="center">
              <Image src="/logo.png" /> Register for an account
            </Header>
            <Form size="large">
              <Segment>
                <Form.Input
                  fluid
                  icon="mail"
                  iconPosition="left"
                  type="email"
                  placeholder="E-mail address"
                  value={this.state.email}
                  error={!validEmail(this.state.email)}
                  onChange={(event, data) => {
                    this.setState({ email: data.value });
                  }}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  value={this.state.username}
                  error={!validUsername(this.state.username)}
                  onChange={(event, data) => {
                    this.setState({ username: data.value });
                  }}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  error={!validPassword(this.state.password)}
                  onChange={(event, data) => {
                    this.setState({ password: data.value });
                  }}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                  value={this.state.confirm}
                  error={this.state.password !== this.state.confirm}
                  onChange={(event, data) => {
                    this.setState({ confirm: data.value });
                  }}
                />
                <Form.Checkbox
                  label="I understand that the comments may contain vulgar/offensive/disturbing content. "
                  checked={this.state.opt1}
                  error={!this.state.opt1}
                  onChange={(event, data) => {
                    this.setState({ opt1: data.checked });
                  }}
                />
                <Form.Checkbox
                  label="I promise that I will try my best to rate the comments accurately. "
                  checked={this.state.opt2}
                  error={!this.state.opt2}
                  onChange={(event, data) => {
                    this.setState({ opt2: data.checked });
                  }}
                />
                <Form.Checkbox
                  label="I know that I am free to opt out at any time. "
                  checked={this.state.opt3}
                  error={!this.state.opt3}
                  onChange={(event, data) => {
                    this.setState({ opt3: data.checked });
                  }}
                />
                <Divider horizontal />
                <Button color="green" fluid size="large" onClick={this.submit}>
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <Link to="/login">Login</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

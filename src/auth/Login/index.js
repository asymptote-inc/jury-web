import React, { Component } from 'react';
import {
  Form,
  Button,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Divider
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';

import { validEmail, validUsername, validPassword } from '../util/validator';
import ApiManager from '../../xapi/apiManager';
const login = ApiManager.createApiManager;

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      password: '',
      save: true,
      redirect: false,
      submitFailed: false
    };
  }

  submit = async () => {
    // validity
    const { save, email, username, password } = this.state;
    if (
      (validEmail(email) || validUsername(username)) &&
      validPassword(password)
    ) {
      const options =
        email.length > 0 ? { email, password } : { username, password };
      const apiMan = await login(options, save);
      if (apiMan) {
        this.setState({ redirect: true });
      } else {
        this.setState({ submitFailed: true });
      }
    }
  };

  render() {
    return (
      <div className="login-form">
        {this.state.redirect && <Redirect to="/" />}
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              <Image src="/logo.png" /> Log-in to your account
            </Header>

            <Form size="large">
              <Segment>
                <Segment>
                  <Form.Input
                    fluid
                    icon="mail"
                    iconPosition="left"
                    type="email"
                    placeholder="E-mail address"
                    value={this.state.email}
                    error={!validEmail(this.state.email)}
                    onChange={(event, data) =>
                      this.setState({ email: data.value })}
                  />
                  <Divider horizontal>Or</Divider>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="Username"
                    value={this.state.username}
                    error={!validUsername(this.state.username)}
                    onChange={(event, data) =>
                      this.setState({ username: data.value })}
                  />
                </Segment>
                <Divider horizontal>And</Divider>
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  error={!validPassword(this.state.password)}
                  onChange={(event, data) =>
                    this.setState({ password: data.value })}
                />
                <Form.Checkbox
                  toggle
                  label="Keep me Logged in"
                  checked={this.state.save}
                  onChange={(event, data) =>
                    this.setState({ save: data.value })}
                />
                <Divider horizontal />
                <Message
                  error
                  icon="unlock alternate"
                  visible={this.state.submitFailed}
                  onDismiss={(event, data) =>
                    this.setState({ submitFailed: false })}
                  header="Login failed. "
                  list={[
                    'Please ensure you entered either your email or your username. ',
                    'Please ensure you typed your password correctly. '
                  ]}
                />
                <Button color="blue" fluid size="large" onClick={this.submit}>
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              New to us? <Link to="/register">Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

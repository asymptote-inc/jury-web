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

export default class Signup extends Component {
  render() {
    return (
      <div className="login-form">
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
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                />
                <Form.Checkbox label="Agreement condition 1" />
                <Form.Checkbox label="Agreement condition 2" />
                <Form.Checkbox label="Agreement condition 3" />
                <Divider horizontal />
                <Button color="green" fluid size="large">
                  Sign Up
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <a href="#">Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

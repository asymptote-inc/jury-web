import React, { Component } from 'react';
import { Form, Button, Grid, Header, Image, Message, Segment, Divider, Checkbox } from 'semantic-ui-react';

export default class Login extends Component {
  render() {
    return (
      <div className='login-form'>
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='blue' textAlign='center'>
              <Image src='/logo.png' />
              {' '}Log-in to your account
        </Header>
            <Form size='large'>
              <Segment>
                <Segment>
                  <Form.Input
                    fluid
                    icon='mail'
                    iconPosition='left'
                    type='email'
                    placeholder='E-mail address'
                  />
                  <Divider horizontal>Or</Divider>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Username'
                  />
                </Segment>
                <Divider horizontal>And</Divider>
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Checkbox toggle label='Keep me Logged in' />
                <Divider horizontal />
                <Button color='blue' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='#'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

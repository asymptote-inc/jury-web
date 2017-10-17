import React, { Component } from 'react';
import { Form, Button as DefaultButton } from 'semantic-ui-react';

const { Group, Checkbox, Input, Button } = Form;
const ButtonGroup = DefaultButton.Group;
const ButtonOr = DefaultButton.Or;

export default class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Form>
                <Group widths='equal'>
                    <Input label='Username' placeholder='Your nickname' type='text' />
                    <Input label='E-mail' placeholder='Your e-mail' type='email' />
                    <Input label='Password' placeholder='Your password' type='password' />
                </Group>
                <Checkbox label='Keep me Logged in' />
                <ButtonGroup>
                    <Button color='blue' size='large'>Log In</Button>
                    <ButtonOr />
                    <Button size='large'>Sign Up</Button>
                </ButtonGroup>
            </Form>
        );
    }
}
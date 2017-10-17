import React, { Component } from 'react';
import { Form, Button as DefaultButton } from 'semantic-ui-react';

const { Group, Checkbox, Input, Button } = Form;
const ButtonGroup = DefaultButton.Group;
const ButtonOr = DefaultButton.Or;

export default class Signup extends Component {
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
                    <Input label='Confirm password' placeholder='Your password, again' type='password' />
                </Group>
                <Checkbox label='I agree to the Terms and Conditions' />
                <ButtonGroup>
                    <Button positive={true} size='large'>Sign Up</Button>
                    <ButtonOr />
                    <Button size='large'>Log In</Button>
                </ButtonGroup>
            </Form>
        );
    }
}
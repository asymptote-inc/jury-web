import React, { Component } from 'react';
import { Form, Button as DefaultButton, Rating } from 'semantic-ui-react';

const { Group, Checkbox, Input, Button, Field, TextArea } = Form;
const ButtonGroup = DefaultButton.Group;
const ButtonOr = DefaultButton.Or;

export default class RatingView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form>
                <Group widths='equal'>
                    <Field required>
                        <label>Toxicity: </label>
                        <Rating defaultRating={1} maxRating={3} size='massive' />
                    </Field>
                    <Field>
                        <label>Obscenity: </label>
                        <Rating clearable maxRating={3} size='big' />
                    </Field>
                    <Field>
                        <label>Identity hate: </label>
                        <Rating clearable maxRating={3} size='big' />
                    </Field>
                    <Field>
                        <label>Insult: </label>
                        <Rating clearable maxRating={3} size='big' />
                    </Field>
                </Group>
                <Group width='equals'>
                    <TextArea label='Comments' placeholder='Additional ideas about the comment' />
                </Group>
                <ButtonGroup>
                    <Button color='violet' size='large'>Submit</Button>
                    <ButtonOr />
                    <Button color='grey' size='large'>Skip</Button>
                    <ButtonOr />
                    <Button color='brown' size='large'>Unreadable</Button>
                </ButtonGroup>
            </Form>
        );
    }
}
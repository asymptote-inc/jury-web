import React, { Component } from 'react';
import {
  Form,
  Grid,
  Header,
  Image,
  Segment,
  Button,
  Rating,
  Container,
  Accordion
} from 'semantic-ui-react';

export default class RatingView extends Component {
  render() {
    return (
      <div className="rating-view">
        <style>{`
      body > div,
      body > div > div,
      body > div > div > div.rating-view {
        height: 100%;
      }
    `}</style>
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 600 }}>
            <Header as="h2" color="violet" textAlign="center">
              <Image src="/logo.png" /> Rate this comment
            </Header>
            <Form size="large">
              <Segment.Group stacked>
                <Segment>
                  <Container fluid>Question here...</Container>
                </Segment>
                <Segment>
                  <Segment.Group>
                    <Segment>
                      <Form.Field required inline>
                        <label>Toxicity: </label>
                        <Rating
                          defaultRating={1}
                          maxRating={3}
                          size="massive"
                        />
                      </Form.Field>
                    </Segment>
                    <Segment>
                      <Form.Field inline>
                        <label>Profanity/Obscenity: </label>
                        <Rating clearable maxRating={3} size="huge" />
                      </Form.Field>
                    </Segment>
                    <Segment>
                      <Form.Field inline>
                        <label>Identity based hate: </label>
                        <Rating clearable maxRating={3} size="huge" />
                      </Form.Field>
                    </Segment>
                    <Segment>
                      <Form.Field inline>
                        <label>Insulting: </label>
                        <Rating clearable maxRating={3} size="huge" />
                      </Form.Field>
                    </Segment>
                    <Segment>
                      <Form.Field inline>
                        <label>Threatening: </label>
                        <Rating clearable maxRating={3} size="huge" />
                      </Form.Field>
                    </Segment>
                  </Segment.Group>
                </Segment>
                <Segment>
                  <Accordion
                    as={Form.Field}
                    panels={[
                      {
                        title: 'Optional Details',
                        content: {
                          as: Form.TextArea,
                          key: 'content',
                          label: 'Additional comments',
                          placeholder: 'Additional ideas on the comment'
                        }
                      }
                    ]}
                  />
                </Segment>
                <Segment attached="bottom">
                  <Button.Group>
                    <Button color="violet" size="large">
                      Submit
                    </Button>
                    <Button.Or />
                    <Button color="yellow" size="large">
                      Skip
                    </Button>
                    <Button.Or />
                    <Button color="brown" size="large">
                      Unreadable
                    </Button>
                  </Button.Group>
                </Segment>
              </Segment.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

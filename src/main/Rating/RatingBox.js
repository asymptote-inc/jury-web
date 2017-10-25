import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Grid,
  Segment,
  Button,
  Container,
  Accordion
} from 'semantic-ui-react';

import RatingSegment from './components/RatingSegment';

const cleanResponse = state =>
  Object.keys(state)
    .filter(k => !!state[k])
    .map(k => ({ [k]: state[k] }))
    .reduce((prv, cur) => ({ ...prv, ...cur }), {});

class RatingBox extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    question: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSkip: PropTypes.func.isRequired,
    onMarkAsUnreadable: PropTypes.func.isRequired
  };

  static defaultProps = {
    loading: false
  };

  state = {
    toxic: 'NotAtAll',
    obscene: null,
    identityHate: null,
    threat: null,
    insult: null,
    comments: ''
  };

  render() {
    return (
      <div className="rating-view">
        <Grid
          textAlign="center"
          style={{ height: '100%' }}
          verticalAlign="middle"
        >
          <Grid.Column>
            <Form size="large" loading={this.props.loading}>
              <Segment.Group stacked>
                <Segment>
                  <Container fluid>{this.props.question}</Container>
                </Segment>

                <Segment>
                  <Segment.Group>
                    <RatingSegment
                      dominating
                      label="Toxicity: "
                      onRate={toxic => this.setState({ toxic })}
                    />
                    <RatingSegment
                      label="Profanity/Obscenity: "
                      onRate={obscene => this.setState({ obscene })}
                    />
                    <RatingSegment
                      label="Identity based hate: "
                      onRate={identityHate => this.setState({ identityHate })}
                    />
                    <RatingSegment
                      label="Insulting: "
                      onRate={insult => this.setState({ insult })}
                    />
                    <RatingSegment
                      label="Threatening: "
                      onRate={threat => this.setState({ threat })}
                    />
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
                          placeholder: 'Additional ideas on the comment',
                          value: this.state.comments,
                          onChange: (event, data) =>
                            this.setState({ comments: data.value })
                        }
                      }
                    ]}
                  />
                </Segment>

                <Segment attached="bottom">
                  <Button.Group>
                    <Button
                      color="violet"
                      size="large"
                      onClick={() =>
                        this.props.onSubmit({
                          answer: {
                            ...cleanResponse(this.state),
                            readableAndInEnglish: 'yes'
                          }
                        })}
                    >
                      Submit
                    </Button>
                    <Button.Or />
                    <Button
                      color="yellow"
                      size="large"
                      onClick={() =>
                        this.props.onSkip({ skipped: true, answer: {} })}
                    >
                      Skip
                    </Button>
                    <Button.Or />
                    <Button
                      color="brown"
                      size="large"
                      onClick={() =>
                        this.props.onMarkAsUnreadable({
                          answer: {
                            readableAndInEnglish: 'no',
                            toxic: 'NotAtAll' // Answer must be provided, but was not. <- temp fix
                          }
                        })}
                    >
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

export default RatingBox;

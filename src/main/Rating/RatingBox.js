import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Grid,
  Segment,
  Button,
  Container,
  Accordion,
  Icon
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
                      description="Overall toxicity of the comment"
                      onRate={toxic => this.setState({ toxic })}
                    />
                    <RatingSegment
                      label="Profanity/Obscenity: "
                      description="How vulgar or offensive the comment is"
                      onRate={obscene => this.setState({ obscene })}
                    />
                    <RatingSegment
                      label="Identity based hate: "
                      description="How hateful the comment towards a specific gender, ethnicity, religion, country etc."
                      onRate={identityHate => this.setState({ identityHate })}
                    />
                    <RatingSegment
                      label="Insulting: "
                      description="How disrespectful and contemptuous the comment is"
                      onRate={insult => this.setState({ insult })}
                    />
                    <RatingSegment
                      label="Threatening: "
                      description="How violent the language of the comment is"
                      onRate={threat => this.setState({ threat })}
                    />
                  </Segment.Group>
                </Segment>

                <Segment>
                  <Accordion
                    as={Form.Field}
                    panels={[
                      {
                        title: 'Additional comments',
                        content: {
                          as: Form.TextArea,
                          key: 'content',
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
                      animated="vertical"
                      compact
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
                      <Button.Content visible>Submit</Button.Content>
                      <Button.Content hidden>
                        <Icon name="send" />
                      </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button
                      animated="vertical"
                      compact
                      color="yellow"
                      size="large"
                      onClick={() =>
                        this.props.onSkip({ skipped: true, answer: {} })}
                    >
                      {' '}
                      <Button.Content visible>Skip</Button.Content>
                      <Button.Content hidden>
                        <Icon name="share" />
                      </Button.Content>
                    </Button>
                    <Button.Or />
                    <Button
                      animated="vertical"
                      compact
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
                      <Button.Content visible>Unreadable</Button.Content>
                      <Button.Content hidden>
                        <Icon name="low vision" />
                      </Button.Content>
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

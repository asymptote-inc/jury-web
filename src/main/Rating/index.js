import React, { Component } from 'react';
import {
  Form,
  Grid,
  Segment,
  Button,
  Rating,
  Container,
  Accordion
} from 'semantic-ui-react';

import getNextQuestion from '../../xapi/questionManager';
import ApiManager from '../../xapi/apiManager';

const stringRepr = {
  '1': 'NotAtAll',
  '2': 'Somewhat',
  '3': 'Very'
};

const colors = ['grey', 'olive', 'yellow', 'orange'];

export default class RatingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      questionId: -1,
      question: '',
      toxic: 1,
      obscene: 0,
      identityHate: 0,
      threat: 0,
      insult: 0,
      comments: ''
    };
  }

  resetInputFields = () => {
    this.setState({
      loading: true,
      questionId: -1,
      question: '',
      toxic: 1,
      obscene: 0,
      identityHate: 0,
      threat: 0,
      insult: 0,
      comments: ''
    });
  };

  fetchNewQuestion = async () => {
    try {
      const questionResponse = await getNextQuestion();
      if (questionResponse === null) {
        return;
      }

      this.resetInputFields();

      const { question_id, question } = questionResponse;
      const questionText = question.revision_text;

      this.setState({ questionId: question_id, question: questionText });
    } catch (error) {
      console.log('Could not fetch new question. ');
    } finally {
      this.setState({ loading: false });
      return await Promise.resolve(true);
    }
  };

  componentDidMount() {
    this.fetchNewQuestion();
  }

  submit = async () => {
    this.setState({ loading: true });

    const {
      toxic,
      obscene,
      identityHate,
      insult,
      threat,
      comments,
      questionId
    } = this.state;

    let answerResponse = {};

    answerResponse.answer = {
      readableAndInEnglish: 'yes',
      toxic: stringRepr[toxic]
    };
    if (obscene > 0) {
      answerResponse.answer.obscene = stringRepr[obscene];
    }
    if (identityHate > 0) {
      answerResponse.answer.identityHate = stringRepr[identityHate];
    }
    if (insult > 0) {
      answerResponse.answer.insult = stringRepr[insult];
    }
    if (threat > 0) {
      answerResponse.answer.threat = stringRepr[threat];
    }
    if (comments.length > 0) {
      answerResponse.answer.comments = comments;
    }

    try {
      await ApiManager.apiManager.postUserAnswer(
        questionId,
        JSON.stringify(answerResponse)
      );
    } catch (error) {
      console.log('Could not post the answer. ');
    } finally {
      return await this.fetchNewQuestion();
    }
  };

  skip = async () => {
    this.setState({ loading: true });

    const { questionId } = this.state;
    const answerResponse = { skipped: true };

    try {
      const reply = await ApiManager.apiManager.postUserAnswer(
        questionId,
        JSON.stringify(answerResponse)
      );
      console.log(reply);
    } catch (error) {
      console.log('Failed to correctly skip the answer. ');
    } finally {
      return await this.fetchNewQuestion();
    }
  };

  markUnreadable = async () => {
    this.setState({ loading: true });

    const { questionId } = this.state;
    const answerResponse = { answer: { readableAndInEnglish: 'no' } };

    try {
      const reply = await ApiManager.apiManager.postUserAnswer(
        questionId,
        JSON.stringify(answerResponse)
      );
      console.log(reply);
    } catch (error) {
      console.log('Failed to correctly mark the answer unreadable. ');
    } finally {
      return await this.fetchNewQuestion();
    }
  };

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
          <Grid.Column
            style={
              this.state.question.length < 600
                ? { maxWidth: 450 }
                : { maxWidth: 600 }
            }
          >
            <Form size="large" loading={this.state.loading}>
              <Segment.Group stacked>
                <Segment>
                  <Container fluid>{this.state.question}</Container>
                </Segment>
                <Segment>
                  <Segment.Group>
                    <Segment inverted color={colors[this.state.toxic]}>
                      <Form.Field required inline>
                        <label>Toxicity: </label>
                        <Rating
                          maxRating={3}
                          rating={this.state.toxic}
                          onRate={(event, data) =>
                            this.setState({ toxic: data.rating })}
                          size="massive"
                        />
                      </Form.Field>
                    </Segment>
                    <Segment color={colors[this.state.obscene]}>
                      <Form.Field inline>
                        <label>Profanity/Obscenity: </label>
                        <Rating
                          clearable
                          maxRating={3}
                          rating={this.state.obscene}
                          onRate={(event, data) =>
                            this.setState({ obscene: data.rating })}
                          size="huge"
                        />
                      </Form.Field>
                    </Segment>
                    <Segment color={colors[this.state.identityHate]}>
                      <Form.Field inline>
                        <label>Identity based hate: </label>
                        <Rating
                          clearable
                          maxRating={3}
                          rating={this.state.identityHate}
                          onRate={(event, data) =>
                            this.setState({ identityHate: data.rating })}
                          size="huge"
                        />
                      </Form.Field>
                    </Segment>
                    <Segment color={colors[this.state.insult]}>
                      <Form.Field inline>
                        <label>Insulting: </label>
                        <Rating
                          clearable
                          maxRating={3}
                          rating={this.state.insult}
                          onRate={(event, data) =>
                            this.setState({ insult: data.rating })}
                          size="huge"
                        />
                      </Form.Field>
                    </Segment>
                    <Segment color={colors[this.state.threat]}>
                      <Form.Field inline>
                        <label>Threatening: </label>
                        <Rating
                          clearable
                          maxRating={3}
                          rating={this.state.threat}
                          onRate={(event, data) =>
                            this.setState({ threat: data.rating })}
                          size="huge"
                        />
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
                    <Button color="violet" size="large" onClick={this.submit}>
                      Submit
                    </Button>
                    <Button.Or />
                    <Button color="yellow" size="large" onClick={this.skip}>
                      Skip
                    </Button>
                    <Button.Or />
                    <Button
                      color="brown"
                      size="large"
                      onClick={this.markUnreadable}
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

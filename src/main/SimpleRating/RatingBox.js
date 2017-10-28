import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Header, Segment, Divider } from 'semantic-ui-react';

class RatingBox extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    question: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="rating-view">
        <Container>
          <Segment>
            <Header color="blue" size="huge">
              What do you think about this comment?
            </Header>
            <Divider />
            <Container text>
              <p>{this.props.question}</p>
            </Container>
            <Divider />
            <Button.Group fluid vertical size="massive">
              <Button
                color="green"
                onClick={() =>
                  this.props.onSubmit({
                    answer: {
                      readableAndInEnglish: 'yes',
                      toxic: 'NotAtAll'
                    }
                  })}
              >
                It looks fine to me.
              </Button>
              <Button
                color="yellow"
                onClick={() =>
                  this.props.onSubmit({
                    answer: {
                      readableAndInEnglish: 'yes',
                      toxic: 'Somewhat'
                    }
                  })}
              >
                It's somewhat offensive.
              </Button>
              <Button
                color="red"
                onClick={() =>
                  this.props.onSubmit({
                    answer: {
                      readableAndInEnglish: 'yes',
                      toxic: 'Very'
                    }
                  })}
              >
                God! It's So wrong!!
              </Button>
              <Divider />
              <Button
                color="grey"
                onClick={() =>
                  this.props.onSubmit({
                    answer: {
                      readableAndInEnglish: 'no',
                      toxic: 'NotAtAll'
                    }
                  })}
              >
                Can't read, Not in English.
              </Button>
              <Button
                color="brown"
                onClick={() =>
                  this.props.onSubmit({
                    skipped: true,
                    answer: {}
                  })}
              >
                I'd just skip this.
              </Button>
            </Button.Group>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default RatingBox;

import React, { Component } from 'react';

import Header from '../../Header';
import RatingBox from '../SimpleRating/RatingBox';

import getNextQuestion from '../../xapi/questionManager';
import ApiManager from '../../xapi/apiManager';

export default class RatingView extends Component {
  state = {
    loading: true,
    questionId: -1,
    question: ''
  };

  componentDidMount() {
    this.fetchNextQuestion();
  }

  fetchNextQuestion = () => {
    getNextQuestion()
      .then(questionResponse => {
        if (questionResponse) {
          const { question_id, question } = questionResponse;
          const questionText = question.revision_text;

          this.setState({ question: questionText, questionId: question_id });
        }

        this.setState({ loading: false });
      })
      .catch(err => {
        console.error('Unable to fetch new question. ');
        this.setState({ loading: false });
      });
  };

  sendAndFetch = async answerResponse => {
    const { questionId } = this.state;

    this.setState({ loading: true });
    this.fetchNextQuestion();

    try {
      await ApiManager.apiManager.postUserAnswer(
        questionId,
        JSON.stringify(answerResponse)
      );
    } catch (error) {
      console.log('Posting answer failed. ');
    }
  };

  render() {
    return (
      <div>
        <Header />
        <RatingBox
          key={this.state.questionId}
          loading={this.state.loading}
          question={this.state.question}
          onSubmit={this.sendAndFetch}
        />
      </div>
    );
  }
}

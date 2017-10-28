import React, { Component } from 'react';
import RatingBox from './RatingBox';
import Header from '../../Header';

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
    // For the extremely unlikely case the .then clause executes before postUserAnswer begins
    // let's save the current question id.
    const { questionId } = this.state;

    this.setState({ loading: true });
    // We need to run both requests in parallel while preserving the ability to collect results.
    // This will keep the user from unnecessary waiting (less loading/locked time).
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
          onSkip={this.sendAndFetch}
          onMarkAsUnreadable={this.sendAndFetch}
        />
      </div>
    );
  }
}

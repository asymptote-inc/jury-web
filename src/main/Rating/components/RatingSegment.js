import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Segment, Rating } from 'semantic-ui-react';

const colors = ['grey', 'green', 'yellow', 'orange'];
const stringRepr = { '1': 'NotAtAll', '2': 'Somewhat', '3': 'Very' };

class RatingComponent extends Component {
  static propTypes = {
    dominating: PropTypes.bool,
    label: PropTypes.string.isRequired,
    onRate: PropTypes.func.isRequired
  };

  static defaultProps = {
    dominating: false
  };

  state = { rating: this.props.dominating ? 1 : 0 };

  rate = (event, data) => {
    this.setState({ rating: data.rating });
    this.props.onRate(stringRepr[data.rating]);
  };

  render() {
    return (
      <Segment
        inverted={this.props.dominating}
        color={colors[this.state.rating]}
      >
        <Form.Field inline>
          <label>{this.props.label}</label>
          <Rating
            clearable={!this.props.dominating}
            maxRating={3}
            rating={this.state.rating}
            onRate={this.rate}
            size={this.props.dominating ? 'massive' : 'huge'}
          />
        </Form.Field>
      </Segment>
    );
  }
}

export default RatingComponent;

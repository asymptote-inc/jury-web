import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Segment, Rating, Popup, Icon, Grid } from 'semantic-ui-react';

const colors = ['grey', 'green', 'yellow', 'orange'];
const stringRepr = { '1': 'NotAtAll', '2': 'Somewhat', '3': 'Very' };
const readableRepr = {
  '0': 'Mind to rate?',
  '1': 'Not at all',
  '2': 'Somewhat',
  '3': 'Very'
};
const iconRepr = {
  '0': 'question',
  '1': 'smile',
  '2': 'meh',
  '3': 'frown'
};

class RatingComponent extends Component {
  static propTypes = {
    dominating: PropTypes.bool,
    label: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
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
          <Grid verticalAlign="middle">
            <Grid.Column textAlign="right" width={6}>
              <Popup
                trigger={<label floated="left">{this.props.label}</label>}
                content={this.props.description}
              />
            </Grid.Column>
            <Grid.Column textAlign="left" width={6}>
              <Rating
                clearable={!this.props.dominating}
                maxRating={3}
                rating={this.state.rating}
                onRate={this.rate}
                size={this.props.dominating ? 'massive' : 'huge'}
              />
            </Grid.Column>
            {!this.props.dominating && (
              <Grid.Column textAlign="right" width={4}>
                <Popup
                  trigger={
                    <Icon
                      color={colors[this.state.rating]}
                      size="large"
                      name={iconRepr[this.state.rating]}
                    />
                  }
                  content={readableRepr[this.state.rating]}
                />
              </Grid.Column>
            )}
          </Grid>
        </Form.Field>
      </Segment>
    );
  }
}

export default RatingComponent;

import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import '../index.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RatingSegment from '../main/Rating/components/RatingSegment';
import RatingBox from '../main/Rating/RatingBox';
import UserStatistic from '../main/Scoreboard/components/UserStatistic';
import Scoreboard from '../main/Scoreboard/Scoreboard';
import SimpleRatingBox from '../main/SimpleRating/RatingBox';

storiesOf('RatingSegment', module)
  .add('Non dominating', () => (
    <RatingSegment
      label="test rating 1: "
      description="this is not a main item"
      onRate={action('rated')}
    />
  ))
  .add('Dominating', () => (
    <RatingSegment
      label="test rating 2: "
      description="this is dominating"
      dominating
      onRate={action('rated')}
    />
  ));

storiesOf('RatingBox', module)
  .add('Default', () => (
    <RatingBox
      question="We have some questions"
      onSubmit={action('submit')}
      onSkip={action('skip')}
      onMarkAsUnreadable={action('unreadable')}
    />
  ))
  .add('Loading', () => (
    <RatingBox
      loading
      question="We have some questions"
      onSubmit={action('submit')}
      onSkip={action('skip')}
      onMarkAsUnreadable={action('unreadable')}
    />
  ));

storiesOf('SimpleRating', module).add('Default', () => (
  <SimpleRatingBox
    onSubmit={action('submit')}
    question="There goes a comment long long long"
  />
));

storiesOf('UserStatistic', module).add('Default', () => (
  <UserStatistic name="Someone" coins="11000" />
));

storiesOf('Scoreboard', module).add('Default', () => (
  <Scoreboard
    records={[{ name: 'alpha', coins: 1005 }, { name: 'beta', coins: 135 }]}
  />
));

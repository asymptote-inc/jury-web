import React from 'react';
import 'semantic-ui-css/semantic.min.css';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import RatingSegment from '../main/Rating/components/RatingSegment';
import RatingBox from '../main/Rating/RatingBox';

storiesOf('RatingSegment', module)
  .add('Non dominating', () => (
    <RatingSegment label="test rating 1: " onRate={action('rated')} />
  ))
  .add('Dominating', () => (
    <RatingSegment
      label="test rating 2: "
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

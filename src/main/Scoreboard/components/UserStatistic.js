import React from 'react';
import { Statistic, Segment } from 'semantic-ui-react';

const colors = [
  'grey',
  'brown',
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink'
];

function UserStatistic({ name, coins }) {
  return (
    <Segment inverted color={colors[Math.floor(Math.log(coins))]}>
      <Statistic.Group size="small">
        <Statistic inverted>
          <Statistic.Value>{name}</Statistic.Value>
          <Statistic.Label>Name</Statistic.Label>
        </Statistic>
        <Statistic inverted>
          <Statistic.Value>{coins}</Statistic.Value>
          <Statistic.Label>Coins</Statistic.Label>
        </Statistic>
      </Statistic.Group>
    </Segment>
  );
}

export default UserStatistic;

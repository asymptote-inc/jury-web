import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Container, Header, Divider } from 'semantic-ui-react';
import UserStatistic from './components/UserStatistic';

function Scoreboard({ records }) {
  return (
    <Container>
      <Header size="huge">Leaderboard</Header>
      <Divider horizontal />
      <Segment.Group>{records.map(UserStatistic)}</Segment.Group>
    </Container>
  );
}

Scoreboard.propTypes = {
  records: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      coins: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    })
  ).isRequired
};

export default Scoreboard;

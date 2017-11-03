import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import Header from '../../Header';

export default class ArticleViewer extends Component {
  render() {
    const pages = this.props.children;
    return (
      <div>
        <Header />
        <Container>
          <div>{pages}</div>
        </Container>
      </div>
    );
  }
}

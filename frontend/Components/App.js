import React from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';

class App extends React.Component {
  state = {
    view: Koji.config.template.showSplashScreen ? 'splash' : 'game',
  };

  render() {
    return (
      <div>
        <h1>{this.state.view}</h1>
      </div>
    );
  }
}

export default App;

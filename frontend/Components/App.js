import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Splash from './Splash';

class App extends PureComponent {
  state = {
    view: Koji.config.template.showSplashScreen ? 'splash' : 'game',
  };

  render() {
    if (this.state.view === 'splash') {
      return (
        <Splash />
      );
    }

    return (
      <div>
        <h1>{this.state.view}</h1>
      </div>
    );
  }
}

export default App;

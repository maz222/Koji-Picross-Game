import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Game from './Game';
import PostGameScreen from './PostGameScreen';
import HomeScreen from './HomeScreen';

// Template level config is stored on the window
window.__template_config = {};

class App extends PureComponent {
  state = {
    templateConfig: {
      soundEnabled: true,
    },
    view: 'home',
  };

  componentDidUpdate() {
    window.__template_config = this.state.templateConfig;
  }

  setTemplateConfig = (newConfig) => {
    this.setState({
      templateConfig: {
        ...this.state.templateConfig,
        ...newConfig,
      }
    });
  }

  render() {
    if (this.state.view === 'home') {
      return (
        <HomeScreen
          setAppView={view => this.setState({ view })}
          setTemplateConfig={this.setTemplateConfig}
          templateConfig={this.state.templateConfig}
        />
      );
    }

    if (this.state.view === 'game') {
      return (
        <Game
          setAppView={view => this.setState({ view })}
        />
      );
    }

    if (this.state.view === 'postGame') {
      return (
        <PostGameScreen
          setAppView={view => this.setState({ view })}
        />
      );
    }

    return null;
  }
}

export default App;

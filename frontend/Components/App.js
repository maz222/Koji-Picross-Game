import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Splash from './Splash';

// Template level config is stored on the window
window.__template_config = {};

class App extends PureComponent {
  state = {
    templateConfig: {
      soundEnabled: true,
    },
    view: Koji.config.template.showSplashScreen ? 'splash' : 'game',
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
    if (this.state.view === 'splash') {
      return (
        <Splash
          setTemplateConfig={this.setTemplateConfig}
          templateConfig={this.state.templateConfig}
        />
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

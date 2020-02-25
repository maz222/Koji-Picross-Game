import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import GameScreen from './Screens/Game';
import PostGameScreen from './Screens/PostGame';
import PreGameScreen from './Screens/PreGame';
import Koji from '@withkoji/vcc';
import WebFont from 'webfontloader';

const GameScreenWrapper = styled.div`
  display: ${({ show }) => show ? 'block' : 'none'}
`;

class App extends PureComponent {
  state = {
    initView: Koji.config.general.debug.startScreen,
    leaderBoardModalIsOpen: false,
    outcome: undefined,
    postGameScreenConfig: Koji.config.postGameScreen,
    score: 0,
    templateConfig: {
      soundEnabled: true,
    },
    view: Koji.config.general.debug.startScreen,
  };

  componentDidMount() {
    // Set the font; fallback to Roboto
    this.loadFont();
  }

  componentDidUpdate() {
    if (this.state.initView !== Koji.config.general.debug.startScreen) {
      this.setState({ initView: Koji.config.general.debug.startScreen, view: Koji.config.general.debug.startScreen });
    }

    if (Koji.config.general.fontFamily.family !== document.body.style.fontFamily) {
      this.loadFont();
    }
  }

  loadFont = () => {
    console.log('load font');
    WebFont.load({ google: { families: [Koji.config.general.fontFamily.family] } });
    document.body.style.fontFamily = Koji.config.general.fontFamily.family;
  };

  getTemplateConfig = () => ({
    ...this.state.templateConfig,
  });

  setTemplateConfig = (newConfig) => {
    this.setState({
      templateConfig: {
        ...this.state.templateConfig,
        ...newConfig,
      }
    });
  }

  render() {
    return (
      <Fragment>
        {
          this.state.view === 'preGame' &&
          <PreGameScreen
            setAppView={view => this.setState({ view })}
            setTemplateConfig={this.setTemplateConfig}
            templateConfig={this.state.templateConfig}
          />
        }

        <GameScreenWrapper show={this.state.view === 'game'}>
          <GameScreen
            view={this.state.view === 'game'}
            getAppView={() => this.state.view}
            setAppView={view => this.setState({ view })}
            getTemplateConfig={this.getTemplateConfig}
            setOutcome={outcome => this.setState({ outcome })}
            setScore={score => this.setState({ score })}
          />
        </GameScreenWrapper>

        {
          this.state.view === 'postGame' &&
          <PostGameScreen
            outcome={this.state.outcome}
            showLeaderboard={() => this.setState({ leaderBoardModalIsOpen: true })}
            score={this.state.score}
            setAppView={view => this.setState({ view })}
          />
        }
      </Fragment>
    );
  }
}

export default App;

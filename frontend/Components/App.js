import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Modal from 'react-modal';
import Game from './Game';
import PostGameScreen from './PostGameScreen';
import HomeScreen from './HomeScreen';
import Leaderboard from './Leaderboard';
import Koji from '@withkoji/vcc';

const CloseModalButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  background: 0;
  padding: 16px;
  font-size: 24px;
  cursor: pointer;
  color: ${({ textColor }) => textColor};
`;

// Set the root element for our modal
Modal.setAppElement('#root');

// Template level config is stored on the window
window.__template_config = {};

class App extends PureComponent {
  state = {
    leaderBoardModalIsOpen: false,
    score: 0,
    templateConfig: {
      soundEnabled: true,
    },
    view: Koji.config.general.startScreen || 'home',
  };

  componentDidMount() {
    // Expose the setScore function
    window.setScore = score => this.setState({ score });
  }

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
    return (
      <Fragment>
        {
          this.state.view === 'home' &&
          <HomeScreen
            setAppView={view => this.setState({ view })}
            setTemplateConfig={this.setTemplateConfig}
            templateConfig={this.state.templateConfig}
          />
        }

        {
          this.state.view === 'game' &&
          <Game
            setAppView={view => this.setState({ view })}
          />
        }

        {
          this.state.view === 'postGame' &&
          <PostGameScreen
            showLeaderboard={() => this.setState({ leaderBoardModalIsOpen: true })}
            score={this.state.score}
            setAppView={view => this.setState({ view })}
          />
        }
        <Modal
          isOpen={this.state.leaderBoardModalIsOpen}
          contentLabel={'Leaderboard'}
          style={{
            content: {
              background: Koji.config.general.primaryColor,
              color: Koji.config.general.textColor,
            }
          }}
        >
          <div>
            <CloseModalButton
              onClick={() => this.setState({ leaderBoardModalIsOpen: false })}
              textColor={Koji.config.general.textColor}
            >
              {'Close'}
            </CloseModalButton>
            <Leaderboard />
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default App;

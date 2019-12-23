import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import Game from '../../Game';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

class GameScreen extends PureComponent {
  render() {
    return (
      <GameContainer
        gameBackgroundImage={Koji.config.general.backgroundImage}
        gameBackgroundImageMode={Koji.config.general.backgroundImageMode}
        id={'game-container'}
      >
        <Game
          setAppView={this.props.setAppView}
          setScore={this.props.setScore}
          setOutcome={this.props.setOutcome}
        />
      </GameContainer>
    );
  }
}

export default GameScreen;
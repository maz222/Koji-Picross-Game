import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import GlobalP5Sketch from './GlobalP5Sketch';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: ${({ gameBackgroundImage, gameBackgroundImageMode }) => `url("${gameBackgroundImage}") no-repeat center center / ${gameBackgroundImageMode}`};
`;

class Game extends PureComponent {
  render() {
    return (
      <GameContainer
        gameBackgroundImage={Koji.config.template.backgroundImage}
        gameBackgroundImageMode={Koji.config.template.backgroundImageMode}
        id={'game-container'}
      >
        <GlobalP5Sketch
          setAppView={this.props.setAppView}
        />
      </GameContainer>
    );
  }
}

export default Game;
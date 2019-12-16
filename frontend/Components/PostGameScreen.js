import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import RubberBand from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import PostGameScreenForm from './PostGameScreenForm';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ backgroundColor, backgroundImage, backgroundImageMode }) => {
    if (backgroundImage && backgroundImage !== '') {
      return `url('${backgroundImage}') no-repeat center center / ${backgroundImageMode}`;
    }
    return backgroundColor;
  }};
`;

const FlexWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const ViewLeaderboardButton = styled.button`
  border: 0;
  outline: 0;
  font-size: ${({ playButtonTextFontSize }) =>
    `${parseInt(playButtonTextFontSize)}px`};
  background: ${({ playButtonBackgroundColor }) => playButtonBackgroundColor};
  color: ${({ playButtonTextColor }) => playButtonTextColor};
  cursor: pointer;
  padding: 16px;
  border-radius: 4px;
  transition: transform 0.1s;
  margin-bottom: 16px;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const PlayAgainButton = styled.button`
  border: 0;
  outline: 0;
  font-size: ${({ playButtonTextFontSize }) =>
    `${parseInt(playButtonTextFontSize)}px`};
  background: ${({ playButtonBackgroundColor }) => playButtonBackgroundColor};
  color: ${({ playButtonTextColor }) => playButtonTextColor};
  cursor: pointer;
  padding: 16px;
  border-radius: 4px;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;

class PostGameScreen extends PureComponent {
  state = {
    formSubmitted: false,
    modalIsOpen: false,
  };

  render() {
    let Reveal = ({ children }) => (
      <div>{children}</div>
    );

    if (Koji.config.postGame.reveal === 'rubberBand') Reveal = ({ children }) => (<RubberBand>{children}</RubberBand>);
    if (Koji.config.postGame.reveal === 'bounceTop') Reveal = ({ children }) => (<Bounce top>{children}</Bounce>);
    if (Koji.config.postGame.reveal === 'bounceBottom') Reveal = ({ children }) => (<Bounce bottom>{children}</Bounce>);
    if (Koji.config.postGame.reveal === 'fadeTop') Reveal = ({ children }) => (<Fade top>{children}</Fade>);
    if (Koji.config.postGame.reveal === 'fadeBottom') Reveal = ({ children }) => (<Fade bottom>{children}</Fade>);
    if (Koji.config.postGame.reveal === 'zoomTop') Reveal = ({ children }) => (<Zoom top>{children}</Zoom>);
    if (Koji.config.postGame.reveal === 'zoomBottom') Reveal = ({ children }) => (<Zoom bottom>{children}</Zoom>);

    return (
      <Container
        backgroundColor={Koji.config.general.backgroundColor}
        backgroundImage={Koji.config.general.backgroundImage}
        backgroundImageMode={Koji.config.general.backgroundImageMode}
      >
        <FlexWrapper>
          <Reveal>
            <ContentWrapper>
              {
                (Koji.config.postGame.collectName || Koji.config.postGame.collectEmail) &&
                <Fragment>
                  {
                    this.state.formSubmitted &&
                    <div>
                      <h1>{'Thanks for playing!'}</h1>
                      <ViewLeaderboardButton onClick={() => this.props.showLeaderboard()}>
                        {'View Leaderboard'}
                      </ViewLeaderboardButton>
                    </div>
                  }
                  {
                    !this.state.formSubmitted &&
                    <PostGameScreenForm
                      onSubmitSuccess={() => this.setState({ formSubmitted: true })}
                      score={this.props.score}
                    />
                  }
                </Fragment>
              }
              {
                Koji.config.postGame.showPlayAgainButton &&
                <PlayAgainButton onClick={() => this.props.setAppView('game')}>
                  {'Play Again'}
                </PlayAgainButton>
              }
            </ContentWrapper>
          </Reveal>
        </FlexWrapper>
      </Container>
    );
  }
}

export default PostGameScreen;

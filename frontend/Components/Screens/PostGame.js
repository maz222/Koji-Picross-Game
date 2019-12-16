import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import RubberBand from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import PropTypes from 'prop-types';
import PlayAgainButton from '../Buttons/PlayAgainButton';
import PostGameForm from '../Forms/PostGame';
import ViewLeaderboardButton from '../Buttons/ViewLeaderboardButton';
import CTAButton from '../Buttons/CTAButton';

let Reveal = ({ children }) => (
  <div>{children}</div>
);

if (Koji.config.postGameScreen.reveal === 'rubberBand') Reveal = ({ children }) => (<RubberBand>{children}</RubberBand>);
if (Koji.config.postGameScreen.reveal === 'bounceTop') Reveal = ({ children }) => (<Bounce top>{children}</Bounce>);
if (Koji.config.postGameScreen.reveal === 'bounceBottom') Reveal = ({ children }) => (<Bounce bottom>{children}</Bounce>);
if (Koji.config.postGameScreen.reveal === 'fadeTop') Reveal = ({ children }) => (<Fade top>{children}</Fade>);
if (Koji.config.postGameScreen.reveal === 'fadeBottom') Reveal = ({ children }) => (<Fade bottom>{children}</Fade>);
if (Koji.config.postGameScreen.reveal === 'zoomTop') Reveal = ({ children }) => (<Zoom top>{children}</Zoom>);
if (Koji.config.postGameScreen.reveal === 'zoomBottom') Reveal = ({ children }) => (<Zoom bottom>{children}</Zoom>);

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

const CardWrapper = styled.div`
  width: 80vw;
  min-width: 280px;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  margin-bottom: 16px;

  h1 {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const Spacer = styled.div`
  margin: 24px 0;
`;

class PostGame extends PureComponent {
  static propTypes = {
    setAppView: PropTypes.func,
    showLeaderboard: PropTypes.func,
    score: PropTypes.number,
  };

  static defaultProps = {
    setAppView() {},
    showLeaderboard() {},
    score: 0,
  };

  state = {
    formSubmitted: false,
    modalIsOpen: false,
  };

  render() {
    return (
      <Fragment>
        <FlexWrapper>
          <Reveal>
            <ContentWrapper>
              <CardWrapper>
                {
                  Koji.config.postGameScreen.enableCTA &&
                  <Fragment>
                    <h1>{Koji.config.postGameScreen.ctaText}</h1>
                    <a
                      href={Koji.config.postGameScreen.ctaLink}
                      ref={'nofollow noreferrer'}
                      target={'_blank'}
                    >
                      <CTAButton />
                    </a>
                  </Fragment>
                }
                {
                  Koji.config.postGameScreen.enableCTA && Koji.config.postGameScreen.enableLeaderboard &&
                  <Spacer />
                }
                {
                  Koji.config.postGameScreen.enableLeaderboard &&
                  <Fragment>
                    {
                      this.state.formSubmitted &&
                      <div>
                        <h1>{'Thanks for playing!'}</h1>
                        <ViewLeaderboardButton onClick={() => this.props.showLeaderboard()} />
                      </div>
                    }
                    {
                      !this.state.formSubmitted &&
                      <PostGameForm
                        onSubmitSuccess={() => this.setState({ formSubmitted: true })}
                        score={this.props.score}
                      />
                    }
                  </Fragment>
                }
              </CardWrapper>
              {
                Koji.config.postGameScreen.showPlayAgainButton &&
                <PlayAgainButton onClick={() => this.props.setAppView('game')} />
              }
            </ContentWrapper>
          </Reveal>
        </FlexWrapper>
      </Fragment>
    );
  }
}

export default PostGame;

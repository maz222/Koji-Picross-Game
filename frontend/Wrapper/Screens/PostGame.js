import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import RubberBand from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import PropTypes from 'prop-types';
import isDarkColor from 'is-dark-color';
import PostGameForm from '../Forms/PostGame';
import ViewLeaderboardButton from '../Buttons/ViewLeaderboardButton';

let Reveal = ({ children }) => (
  <div>{children}</div>
);

if (Koji.config.template.config.postGameScreenReveal === 'rubberBand') Reveal = ({ children }) => (<RubberBand>{children}</RubberBand>);
if (Koji.config.template.config.postGameScreenReveal === 'bounceTop') Reveal = ({ children }) => (<Bounce top>{children}</Bounce>);
if (Koji.config.template.config.postGameScreenReveal === 'bounceBottom') Reveal = ({ children }) => (<Bounce bottom>{children}</Bounce>);
if (Koji.config.template.config.postGameScreenReveal === 'fadeTop') Reveal = ({ children }) => (<Fade top>{children}</Fade>);
if (Koji.config.template.config.postGameScreenReveal === 'fadeBottom') Reveal = ({ children }) => (<Fade bottom>{children}</Fade>);
if (Koji.config.template.config.postGameScreenReveal === 'zoomTop') Reveal = ({ children }) => (<Zoom top>{children}</Zoom>);
if (Koji.config.template.config.postGameScreenReveal === 'zoomBottom') Reveal = ({ children }) => (<Zoom bottom>{children}</Zoom>);

const PlayAgainButton = styled.button`
  border: 2px solid ${({ primaryColor }) => primaryColor};
  outline: 0;
  font-size: ${({ playButtonTextFontSize }) => `${parseInt(playButtonTextFontSize)}px`};
  background: rgba(255, 255, 255, 0.9);
  color: ${({ textColor }) => textColor};
  cursor: pointer;
  padding: 16px;
  border-radius: 4px;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ButtonLinkWrapper = styled.a`
  margin: 24px 0 0 0;
  border: 0;
  padding: 0;
  outline: 0;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const CTAButton = styled.button`
  border: 0;
  outline: 0;
  font-size: 16px;
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ primaryColor }) => isDarkColor(primaryColor) ? '#f1f1f1' : '#111111' };
  cursor: pointer;
  padding: 16px;
  border-radius: 4px;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const SubmitButton = styled.button`
  border: 0;
  outline: 0;
  font-size: 16px;
  color: ${({ primaryColor }) => primaryColor};
  cursor: pointer;
  padding: 16px;
  border-radius: 4px;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
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

const InputField = styled.div`
    width: 100%;
    display: flex;
    flex-direction: ${({ inline }) => inline ? 'row' : 'column'};
    align-items: ${({ inline }) => inline ? 'center' : 'flex-start'};
    margin-bottom: 16px;

    label {
        margin-bottom: 4px;
        text-align: left;
        font-size: ${({ inline }) => inline ? '13px' : 'inherit'};
    }

    input {
        padding: 4px;
        width: 100%;
    }

    input[type="checkbox"] {
        width: auto;
    }
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
    margin-bottom: 8px;
  }

  p {
      margin-bottom: 24px;
  }
`;

const Spacer = styled.div`
  margin: 24px 0;
`;

class PostGameScreen extends PureComponent {
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
  };

  componentDidMount() {
    const elem = document.getElementById('content-wrapper');
    if (elem && elem.offsetHeight > window.innerHeight) {
      elem.style.transform = `scale(${(window.innerHeight / elem.offsetHeight) * 0.9 })`;
    }
  }

  handleScoreSubmit = e => {
      e.preventDefault();

      console.log('t', this.state);
  };

  render() {
    const { postGameAction } = Koji.config.template.config;

    if (postGameAction === 'traffic') {
        return (
            <FlexWrapper>
                <Reveal>
                    <ContentWrapper id={'content-wrapper'}>
                        <CardWrapper>
                            <h1>{Koji.config.template.config.postGameScreenTitle}</h1>
                            <p>{Koji.config.template.config.postGameScreenText}</p>
                            <ButtonLinkWrapper
                              href={Koji.config.template.config.postGameScreenButtonLink}
                              rel={'nofollow noreferrer'}
                              target={'_blank'}
                            >
                              <CTAButton
                                primaryColor={Koji.config.template.config.primaryColor}
                              >
                                {Koji.config.template.config.postGameScreenButtonText}
                              </CTAButton>
                            </ButtonLinkWrapper>
                        </CardWrapper>
                        {
                          Koji.config.template.config.postGameScreenShowPlayAgainButton &&
                          <PlayAgainButton
                            onClick={() => this.props.setAppView('game')}
                            primaryColor={Koji.config.template.config.primaryColor}
                        >
                            {Koji.config.template.config.postGameScreenPlayAgainButtonText}
                          </PlayAgainButton>
                        }
                    </ContentWrapper>
                </Reveal>
            </FlexWrapper>
        );
    }

    if (postGameAction === 'leads') {
        return (
            <FlexWrapper>
                <Reveal>
                    <ContentWrapper id={'content-wrapper'}>
                        <CardWrapper>
                            <form onSubmit={this.handleScoreSubmit}>
                                <h1>{Koji.config.template.config.postGameScreenTitle}</h1>
                                <div>
                                    <p>{`Your Score: ${this.props.score}`}</p>
                                </div>
                                <InputField>
                                    <label>{'Your Name'}</label>
                                    <input
                                        onChange={e => this.setState({ name: e.currentTarget.value })}
                                        required
                                        type={'text'}
                                        value={this.state.name}
                                    />
                                </InputField>
                                {
                                    ['yes', 'required'].includes(Koji.config.template.config.emailCollection) &&
                                    <InputField>
                                        <label>{'Your Email'}</label>
                                        <input
                                            onChange={e => this.setState({ email: e.currentTarget.value })}
                                            required={Koji.config.template.config.emailCollection === 'required'}
                                            type={'email'}
                                            value={this.state.email}
                                        />
                                    </InputField>
                                }
                                {
                                    ['yes', 'required'].includes(Koji.config.template.config.phoneCollection) &&
                                    <InputField>
                                        <label>{'Your Phone Number'}</label>
                                        <input
                                            onChange={e => this.setState({ phone: e.currentTarget.value })}
                                            required={Koji.config.template.config.phoneCollection === 'required'}
                                            type={'tel'}
                                            value={this.state.phone}
                                        />
                                    </InputField>
                                }
                                {
                                    (['yes', 'required'].includes(Koji.config.template.config.emailCollection) || ['yes', 'required'].includes(Koji.config.template.config.phoneCollection)) &&
                                    <InputField inline>
                                        <input
                                            checked={this.state.optIn}
                                            onChange={e => this.setState({ optIn: e.currentTarget.checked })}
                                            type={'checkbox'}
                                        />
                                        <label dangerouslySetInnerHTML={{ __html: Koji.config.template.config.optInText }} />
                                    </InputField>
                                }
                                <CTAButton
                                    type={'submit'}
                                    onClick={this.handleScoreSubmit}
                                >
                                    {Koji.config.template.config.postGameScreenSubmitButtonText}
                                </CTAButton>
                            </form>
                        </CardWrapper>
                        {
                          Koji.config.template.config.postGameScreenShowPlayAgainButton &&
                          <PlayAgainButton onClick={() => this.props.setAppView('game')}>
                            {Koji.config.template.config.postGameScreenPlayAgainButtonText}
                          </PlayAgainButton>
                        }
                    </ContentWrapper>
                </Reveal>
            </FlexWrapper>
        );
    }

    return (
        <div>{'Engage'}</div>
    );

    return (
      <Fragment>
        <FlexWrapper>
          <Reveal>
            <ContentWrapper id={'content-wrapper'}>
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

export default PostGameScreen;

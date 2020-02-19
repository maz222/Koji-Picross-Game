import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import RubberBand from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import PropTypes from 'prop-types';
import isDarkColor from 'is-dark-color';
import LeaderboardSubmitForm from '../Forms/LeaderboardSubmit';
import PrimaryButton from '../Buttons/Primary';

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

console.log('r', Reveal);

const ButtonLinkWrapper = styled.a`
  margin: 24px 0 0 0;
  border: 0;
  padding: 0;
  outline: 0;
  display: flex;
  justify-content: center;
  text-decoration: none;
`;

const FlexWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

const LeaderboardButtonWrapper = styled.div`
  margin-top: 16px;
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
    margin-bottom: 8px;
  }
`;

const Spacer = styled.div`
  margin: 24px 0;
`;

const Card = styled.div`

`;

const SocialWrapper = styled.div`
  display: flex;
  height: 48px;

  a {
      width: 48px;
      margin: 0 8px;
  }

  img {
      max-height: 100%;
      padding: 8px;
      background: #ffffff;
  }

`;

class PostGameScreen extends PureComponent {
    static propTypes = {
        outcome: PropTypes.string,
        setAppView: PropTypes.func,
        showLeaderboard: PropTypes.func,
        score: PropTypes.number,
    };

    static defaultProps = {
        outcome: 'lose',
        setAppView() { },
        showLeaderboard() { },
        score: 0,
    };

    state = {
        formSubmitting: false,
        formSubmitted: false,
        name: '',
        email: '',
        phone: '',
        optIn: true,
    };

    handleScoreSubmit = e => {
        e.preventDefault();

        const body = {
            name: this.state.name,
            score: this.props.score,
            email: this.state.email,
            optIn: this.state.optIn,
            phone: this.state.phone,
        };

        const hash = md5(JSON.stringify(body));

        fetch(`${Koji.config.serviceMap.backend}/leaderboard/save`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': hash,
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((jsonResponse) => {
                this.setState({ formSubmitted: true })
            })
            .catch(err => {
                console.log(err);
            });
    };

    handleClick = () => {
        this.setState({ formSubmitting: true });
        window.setTimeout(() => {
            this.setState({ formSubmitted: true });
        }, 2000);
    };

    render() {
        return (
            <FlexWrapper>
                <Reveal>
                    <ContentWrapper id={'content-wrapper'}>
                        {
                            !this.state.formSubmitted &&
                            <CardWrapper>
                                <div>{'Your Score'}</div>
                                <div>{'10,000'}</div>
                                <div>
                                    <label>{'Your Name'}</label>
                                </div>
                                <div>
                                    <input type={'text'} />
                                </div>
                                <PrimaryButton
                                    loading={this.state.formSubmitting}
                                    onClick={this.handleClick}
                                    primaryColor={'#dedede'}
                                    type={'submit'}
                                    text={'Submit'}
                                />
                            </CardWrapper>
                        }
                        {
                            this.state.formSubmitted &&
                            <CardWrapper>
                                <div>{'Leaderboard'}</div>
                            </CardWrapper>
                        }
                        <CardWrapper>
                            <div>{'Check Out Our Site'}</div>
                            <button>{'CTA'}</button>
                        </CardWrapper>
                        <SocialWrapper>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank">
                                <img src={'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook2_colored_svg-128.png'} />    
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank">
                                <img src={'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook2_colored_svg-128.png'} />    
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank">
                                <img src={'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook2_colored_svg-128.png'} />    
                            </a>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank">
                                <img src={'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Facebook2_colored_svg-128.png'} />    
                            </a>
                        </SocialWrapper>
                        <div>{'Play Again'}</div>
                    </ContentWrapper>
                </Reveal>
            </FlexWrapper>
        );
    }
}

export default PostGameScreen;

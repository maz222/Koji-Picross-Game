/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import PropTypes from 'prop-types';
import md5 from 'md5';
import Reveal from '../Components/Reveal';
import PrimaryButton from '../Buttons/Primary';

const FlexWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 32px auto;
`;

const CardWrapper = styled.div`
  border-radius: 2px;
  width: 80vw;
  min-width: 280px;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;
  margin-bottom: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 20px;
    margin-bottom: 8px;
  }

  .cta-text {
    font-size: 20px;
  }

  .button-wrapper {
    margin-top: 8px;
  }

  .label-wrapper {
    text-align: left;
    margin-bottom: 4px;
    width: 100%;
    max-width: 320px;
    display: flex;
    align-items: center;
  }

  .input-wrapper {
    margin-bottom: 8px;
    width: 100%;
    max-width: 320px;
  }

  .input-wrapper > input {
    width: 100%;
    font-size: 14px;
    padding: 4px;
    border-radius: 2px;
    border: 1px solid lightgray;
  }

  input[type="checkbox"] {
    margin-left: 0px;
  }

  .score-text {
    font-size: 16px;
    margin-bottom: 8px;
  }

  .score {
    font-size: 32px;
    margin-bottom: 16px;
  }
`;

const SocialWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
      width: 48px;
      height: 48px;
      margin: 0 8px;
  }

  img {
      max-height: 100%;
  }
`;

const LeaderboardWrapper = styled.div`
  max-height: 30vh;
  overflow: auto;
  width: 100%;
`;

const LeaderboardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  > div {
    display: flex;
  }

  .leaderboard-entry {
    position: relative;
  }

  .leaderboard-score {
    flex: 1;
    text-align: right;
  }

  .leaderboard-name {
    position: absolute;
    left: 32px;
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

    this.setState({ formSubmitting: true });

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
      .then(() => {
        fetch(`${Koji.config.serviceMap.backend}/leaderboard`)
          .then((response) => response.json())
          .then(({ scores }) => {
            this.setState({ formSubmitting: false, formSubmitted: true, scores });
            console.log('t', this.state.scores);
          })
          .catch(err => {
            console.log('Fetch Error: ', err);
            this.setState({ error: true });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleReveal = () => {
    // On reveal, calculate the height of the element and see if
    // we need to adjust some flex properties so that overflowing
    // content renders using flex-start

    const flexWrapperElem = document.getElementById('flex-wrapper');
    if (flexWrapperElem) {
        window.setTimeout(() => {
            flexWrapperElem.style.overflowY = 'auto';
        }, 1000);
    }
    const elem = document.getElementsByClassName('react-reveal')[0];
    if (elem.offsetHeight > window.innerHeight) {
      if (flexWrapperElem) {
        flexWrapperElem.style.alignItems = 'flex-start';
      }
    }
  };

  render() {
    return (
      <FlexWrapper id={'flex-wrapper'}>
        <Reveal
          id={'test'}
          onReveal={() => this.handleReveal()}
          revealType={Koji.config.postGameScreen.reveal}
        >
          <ContentWrapper id={'content-wrapper'}>
            {
              Koji.config.postGameScreen.leaderboardEnabled &&
              <Fragment>
                {
                  this.state.formSubmitting &&
                  <CardWrapper>
                    <div className={'lds-ring'}><div></div><div></div><div></div><div></div></div>
                  </CardWrapper>
                }
                {
                  !this.state.formSubmitted && !this.state.formSubmitting &&
                  <CardWrapper>
                    <div className={'score-text'}>{'Your Score'}</div>
                    <div className={'score'}>{'10,000'}</div>
                    <div className={'label-wrapper'}>
                      <label>{'Name'}</label>
                    </div>
                    <div className={'input-wrapper'}>
                      <input
                        onChange={e => this.setState({ name: e.currentTarget.value })}
                        required
                        type={'text'}
                        value={this.state.name}
                      />
                    </div>
                    <div className={'label-wrapper'}>
                      <label>{'Email'}</label>
                    </div>
                    <div className={'input-wrapper'}>
                      <input type={'text'} />
                    </div>
                    <div className={'label-wrapper'}>
                      <input type={'checkbox'} />
                      {'Opt In'}
                    </div>
                    <div className={'button-wrapper'}>
                      <PrimaryButton
                        loading={this.state.formSubmitting}
                        onClick={this.handleScoreSubmit}
                        primaryColor={'#dedede'}
                        type={'submit'}
                        text={'Submit'}
                      />
                    </div>
                  </CardWrapper>
                }
                {
                  this.state.formSubmitted &&
                  <CardWrapper>
                    <h1>{'Leaderboard'}</h1>
                    <LeaderboardWrapper>
                      <LeaderboardContent>
                        {
                          (this.state.scores || []).map((entry, idx) => (
                            <div className={'leaderboard-entry'}>
                              <div>
                                {`${idx + 1}.`}
                              </div>
                              <div className={'leaderboard-name'}>{entry.name}</div>
                              <div className={'leaderboard-score'}>{entry.score}</div>
                            </div>
                          ))
                        }
                      </LeaderboardContent>
                    </LeaderboardWrapper>
                  </CardWrapper>
                }
              </Fragment>
            }
            {
              Koji.config.postGameScreen.ctaEnabled &&
              <CardWrapper>
                <div className={'cta-text'}>{'Check Out Our Site'}</div>
                <div className={'button-wrapper'}>
                  <PrimaryButton text={'Visit Site'} />
                </div>
              </CardWrapper>
            }
            {
              Koji.config.postGameScreen.socialEnabled &&
              <CardWrapper>
                <SocialWrapper>
                  <a href={`http://www.reddit.com/submit?url=${window.encodeURIComponent(window.location.href)}`} target="_blank">
                    <img src={Koji.config.postGameScreen.redditIcon} />
                  </a>
                  <a href={`https://twitter.com/intent/tweet?text=${window.encodeURIComponent(document.title)}: ${window.encodeURIComponent(window.location.href)}`} target="_blank">
                    <img src={Koji.config.postGameScreen.twitterIcon} />
                  </a>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.encodeURIComponent(window.location.href)}&title=${window.encodeURIComponent(document.title)}&source=LinkedIn`} target="_blank">
                    <img src={Koji.config.postGameScreen.linkedInIcon} />
                  </a>
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.encodeURIComponent(window.location.href)}`} target="_blank">
                    <img src={Koji.config.postGameScreen.facebookIcon} />
                  </a>
                </SocialWrapper>
              </CardWrapper>
            }
            {
              Koji.config.postGameScreen.playAgainButtonEnabled &&
              <PrimaryButton text={'Play Again'} />
            }
          </ContentWrapper>
        </Reveal>
      </FlexWrapper>
    );
  }
}

export default PostGameScreen;

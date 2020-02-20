/* eslint-disable react/jsx-no-target-blank */
import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import PropTypes from 'prop-types';
import Reveal from '../Components/Reveal';
import PrimaryButton from '../Buttons/Primary';

const FlexWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
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
      .then(() => {
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

  handleReveal = () => {
    // On reveal, calculate the height of the element and see if
    // we need to adjust some flex properties so that overflowing
    // content renders using flex-start

    const elem = document.getElementsByClassName('react-reveal')[0];
    if (elem.offsetHeight > window.innerHeight) {
      const flexWrapperElem = document.getElementById('flex-wrapper');
      if (flexWrapperElem) {
        flexWrapperElem.style.alignItems = 'flex-start';
      }
    }
  }

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
              </Fragment>
            }
            {
              Koji.config.postGameScreen.ctaEnabled &&
              <CardWrapper>
                <div>{'Check Out Our Site'}</div>
                <button>{'CTA'}</button>
              </CardWrapper>
            }
            {
              Koji.config.postGameScreen.socialEnabled &&
              <CardWrapper>
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

import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import md5 from 'md5';

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
  width: 100%;
  height: 100%;
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50vw;
  min-width: 280px;
  max-width: 720px;
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;

  label {
    font-size: 14px;
    margin-bottom: 4px;
  }

  input {
    border: 0;
    outline: 0;
    font-size: 16px;
    margin-bottom: 16px;
    width: 100%;
  }

  margin-bottom: 16px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  width: 100%;

  input {
    width: auto;
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
    email: '',
    name: '',
    emailOptIn: true,
    formSubmitted: false,
  };

  handleSubmit = e => {
    e.preventDefault();

    const body = {
      name: this.state.name,
      score: this.props.score,
      email: this.state.email,
      emailOptIn: this.state.emailOptIn
    };
    const hash = md5(JSON.stringify(body));

    fetch(`${Koji.config.serviceMap.backend}/leaderboard/save`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: hash
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(jsonResponse => {
        this.setState({ formSubmitted: true });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container
        backgroundColor={Koji.config.general.backgroundColor}
        backgroundImage={Koji.config.general.backgroundImage}
        backgroundImageMode={Koji.config.general.backgroundImageMode}
      >
        <FlexWrapper>
          <ContentWrapper>
            {
              (Koji.config.postGame.collectName || Koji.config.postGame.collectEmail) &&
              <Form onSubmit={this.handleSubmit}>
                {
                  Koji.config.postGame.collectName &&
                  <Fragment>
                    <label for={'name-input'}>{'Your Name'}</label>
                    <input
                      id={'name-input'}
                      name={'name-input'}
                      onChange={e =>
                        this.setState({ name: e.currentTarget.value })
                      }
                      type={'text'}
                      value={this.state.name}
                    />
                  </Fragment>
                }
                {
                  Koji.config.postGame.collectEmail &&
                  <Fragment>
                    <label for={'email-input'}>{'Your Email'}</label>
                    <input
                      id={'email-input'}
                      name={'email-input'}
                      onChange={e =>
                        this.setState({ email: e.currentTarget.value })
                      }
                      type={'email'}
                      value={this.state.email}
                    />
                    <CheckboxWrapper>
                      <input
                        checked={this.state.emailOptIn}
                        id={'opt-in'}
                        name={'opt-in'}
                        onChange={e =>
                          this.setState({ emailOptIn: e.currentTarget.checked })
                        }
                        type={'checkbox'}
                      />
                      <label for={'opt-in'}>
                        {Koji.config.postGame.emailOptInText}
                      </label>
                    </CheckboxWrapper>
                  </Fragment>
                }
                <button htmlType={'submit'}>{'Submit'}</button>
              </Form>
            }
            {
              Koji.config.postGame.showPlayAgainButton &&
              <PlayAgainButton onClick={() => this.props.setAppView('game')}>
                {'Play Again'}
              </PlayAgainButton>
            }
          </ContentWrapper>
        </FlexWrapper>
      </Container>
    );
  }
}

export default PostGameScreen;

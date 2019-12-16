import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import md5 from 'md5';

const Form = styled.form`
  color: ${({ color }) => color};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80vw;
  min-width: 280px;
  max-width: 480px;
  background: rgba(255, 255, 255, 0.9);
  padding: 24px;

  label {
    font-size: 16px;
    margin-bottom: 8px;
  }

  input {
    border: 0;
    outline: 0;
    font-size: 20px;
    margin-bottom: 16px;
    width: 100%;
    padding: 6px;
    border-radius: 2px;
  }

  margin-bottom: 16px;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  width: 100%;
  text-align: left;

  input {
    width: auto;
  }
`;

class PostGameScreenForm extends PureComponent {
  state = {
    email: '',
    name: '',
    emailOptIn: true,
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
        this.props.onSubmitSuccess();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Form
        color={Koji.config.general.primaryColor}
        onSubmit={this.handleSubmit}
      >
        {
          Koji.config.postGame.collectName &&
          <Fragment>
            <label htmlFor={'name-input'}>{'Your Name'}</label>
            <input
              id={'name-input'}
              name={'name-input'}
              onChange={e =>
                this.setState({ name: e.currentTarget.value })
              }
              required={Koji.config.postGame.requireName || false}
              type={'text'}
              value={this.state.name}
            />
          </Fragment>
        }
        {
          Koji.config.postGame.collectEmail &&
          <Fragment>
            <label htmlFor={'email-input'}>{'Your Email'}</label>
            <input
              id={'email-input'}
              name={'email-input'}
              onChange={e =>
                this.setState({ email: e.currentTarget.value })
              }
              required={Koji.config.postGame.requireEmail || false}
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
              <label htmlFor={'opt-in'}>
                {Koji.config.postGame.emailOptInText}
              </label>
            </CheckboxWrapper>
          </Fragment>
        }
        <button type={'submit'}>{'Submit'}</button>
      </Form>
    )
  }
}

export default PostGameScreenForm;

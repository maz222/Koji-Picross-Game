import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import md5 from 'md5';
import PropTypes from 'prop-types';
import SubmitFormButton from '../Buttons/SubmitFormButton';

const Form = styled.form`
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
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

class PostGameForm extends PureComponent {
  static propTypes = {
    score: PropTypes.number,
  };

  static defaultProps = {
    score: 0,
  };

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
        <FormFields>
          {
            Koji.config.postGameScreen.collectName &&
            <Fragment>
              <label htmlFor={'name-input'}>{'Your Name'}</label>
              <input
                id={'name-input'}
                name={'name-input'}
                onChange={e =>
                  this.setState({ name: e.currentTarget.value })
                }
                required={Koji.config.postGameScreen.requireName || false}
                type={'text'}
                value={this.state.name}
              />
            </Fragment>
          }
          {
            Koji.config.postGameScreen.collectEmail &&
            <Fragment>
              <label htmlFor={'email-input'}>{'Your Email'}</label>
              <input
                id={'email-input'}
                name={'email-input'}
                onChange={e =>
                  this.setState({ email: e.currentTarget.value })
                }
                required={Koji.config.postGameScreen.requireEmail || false}
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
                  {Koji.config.postGameScreen.emailOptInText}
                </label>
              </CheckboxWrapper>
            </Fragment>
          }
        </FormFields>
        <SubmitFormButton />
      </Form>
    )
  }
}

export default PostGameForm;

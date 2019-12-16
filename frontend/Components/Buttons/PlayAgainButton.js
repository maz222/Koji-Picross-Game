import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Koji from '@withkoji/vcc';

const Button = styled.button`
  border: 0;
  outline: 0;
  font-size: ${({ playButtonTextFontSize }) => `${parseInt(playButtonTextFontSize)}px`};
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ textColor }) => textColor};
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

class PlayAgainButton extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick() {},
  };

  render() {
    return (
      <Button
        onClick={this.props.onClick}
        playButtonTextFontSize={Koji.config.postGameScreen.playButtonTextFontSize}
        primaryColor={Koji.config.general.primaryColor}
        textColor={Koji.config.general.textColor}
      >
        {Koji.config.postGameScreen.playButtonText}
      </Button>
    );
  }
}

export default PlayAgainButton;

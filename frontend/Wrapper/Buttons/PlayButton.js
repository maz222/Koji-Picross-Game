import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Koji from '@withkoji/vcc';

const Button = styled.button`
  border: 0;
  outline: 0;
  font-size: ${({ playButtonTextFontSize }) => `${parseInt(playButtonTextFontSize, 10)}px !important`};
  border: ${({ primaryColor }) => primaryColor} 4px solid;
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

class PlayButton extends PureComponent {
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
        playButtonTextFontSize={Koji.config.template.config.homeScreenPlayButtonFontSize}
        primaryColor={Koji.config.template.config.primaryColor}
        textColor={Koji.config.template.config.textColor}
      >
        {Koji.config.template.config.homeScreenPlayButtonText}
      </Button>
    );
  }
}

export default PlayButton;

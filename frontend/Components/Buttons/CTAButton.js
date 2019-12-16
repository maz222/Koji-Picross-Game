import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

const Button = styled.button`
  margin-top: 16px;
  margin: 0 auto;
  border: 0;
  outline: 0;
  font-size: 16px;
  color: ${({ primaryColor }) => primaryColor};
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

class CTAButton extends PureComponent {
  render() {
    return (
      <Button
        primaryColor={Koji.config.general.primaryColor}
        type={'submit'}
      >
        {Koji.config.postGameScreen.ctaButtonText}
      </Button>
    );
  }
}

export default CTAButton;
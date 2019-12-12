import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ splashBackgroundColor, splashBackgroundImage, splashBackgroundImageMode }) => {
    if (splashBackgroundImage && splashBackgroundImage !== '') {
      return `url("${splashBackgroundImage}") no-repeat center center / ${splashBackgroundImageMode}`;
    }
    return splashBackgroundColor;
  }}
`;

const FlexWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const CenteredImage = styled.img`
  height: ${({ splashCenteredImageHeight }) => `${splashCenteredImageHeight}vh`};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const PlayButton = styled.button`
  border: 0;
  outline: 0;
  font-size: ${({ playButtonTextFontSize }) => `${parseInt(playButtonTextFontSize)}px`};
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

const CenteredTextWrapper = styled.div`
  font-size: ${({ splashCenteredTextFontSize }) => `${parseInt(splashCenteredTextFontSize)}px`};
  color: ${({ splashCenteredTextColor }) => splashCenteredTextColor};
  margin-bottom: 16px;
`;

class Splash extends PureComponent {
  render() {
    return (
      <Container
        splashBackgroundColor={Koji.config.template.splashBackgroundColor}
        splashBackgroundImage={Koji.config.template.splashBackgroundImage}
        splashBackgroundImageMode={Koji.config.template.splashBackgroundImageMode}
      >
        <FlexWrapper>
          <ContentWrapper>
            {
              Koji.config.template.splashCenteredImage && Koji.config.template.splashCenteredImage !== '' &&
                <CenteredImage
                  splashCenteredImageHeight={Koji.config.template.splashCenteredImageHeight}
                  src={Koji.config.template.splashCenteredImage}
                />
            }
            {
              Koji.config.template.splashCenteredText && Koji.config.template.splashCenteredText !== '' &&
                <CenteredTextWrapper
                  splashCenteredTextColor={Koji.config.template.splashCenteredTextColor}
                  splashCenteredTextFontSize={Koji.config.template.splashCenteredTextFontSize}
                >
                  {Koji.config.template.splashCenteredText}
                </CenteredTextWrapper>
            }
            <PlayButton
              playButtonBackgroundColor={Koji.config.template.playButtonBackgroundColor}
              playButtonTextColor={Koji.config.template.playButtonTextColor}
              playButtonTextFontSize={Koji.config.template.playButtonTextFontSize}
            >
              {Koji.config.template.playButtonText}
            </PlayButton>
          </ContentWrapper>
        </FlexWrapper>
      </Container>
    );
  }
}

export default Splash;
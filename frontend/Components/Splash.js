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

  img {
    max-width: 70%;
    max-height: 20%;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  &:hover {
    background: ${({ playButtonBackgroundHoverColor }) => playButtonBackgroundHoverColor};
    color: ${({ playButtonTextHoverColor }) => playButtonTextHoverColor};
  }
`;

const CenteredTextWrapper = styled.div`
  font-size: ${({ splashCenteredTextFontSize }) => `${parseInt(splashCenteredTextFontSize)}px`};
  color: ${({ splashCenteredTextColor }) => splashCenteredTextColor};
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
          {
            Koji.config.template.splashCenteredImage &&
            <ContentWrapper>
              <img src={Koji.config.template.splashCenteredImage} />
              <PlayButton
                playButtonBackgroundColor={Koji.config.template.playButtonBackgroundColor}
                playButtonBackgroundHoverColor={Koji.config.template.playButtonBackgroundHoverColor}
                playButtonTextColor={Koji.config.template.playButtonTextColor}
                playButtonTextHoverColor={Koji.config.template.playButtonTextHoverColor}
                playButtonTextFontSize={Koji.config.template.playButtonTextFontSize}
              >
                {Koji.config.template.playButtonText}
              </PlayButton>
            </ContentWrapper>
          }
          {
            !Koji.config.template.splashCenteredImage &&
            <ContentWrapper>
              <CenteredTextWrapper
                splashCenteredTextColor={Koji.config.template.splashCenteredTextColor}
                splashCenteredTextFontSize={Koji.config.template.splashCenteredTextFontSize}
              >
                {Koji.config.template.splashCenteredText}
              </CenteredTextWrapper>
              <PlayButton
                playButtonBackgroundColor={Koji.config.template.playButtonBackgroundColor}
                playButtonBackgroundHoverColor={Koji.config.template.playButtonBackgroundHoverColor}
                playButtonTextColor={Koji.config.template.playButtonTextColor}
                playButtonTextHoverColor={Koji.config.template.playButtonTextHoverColor}
                playButtonTextFontSize={Koji.config.template.playButtonTextFontSize}
              >
                {Koji.config.template.playButtonText}
              </PlayButton>
            </ContentWrapper>
          }
        </FlexWrapper>
      </Container>
    );
  }
}

export default Splash;
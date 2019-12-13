import React, { PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: ${({ backgroundColor, backgroundImage, backgroundImageMode }) => {
    if (backgroundImage && backgroundImage !== '') {
      return `url("${backgroundImage}") no-repeat center center / ${backgroundImageMode}`;
    }
    return backgroundColor;
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
  height: ${({ centeredImageHeight }) => `${centeredImageHeight}vh`};
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
  font-size: ${({ centeredTextFontSize }) => `${parseInt(centeredTextFontSize)}px`};
  color: ${({ centeredTextColor }) => centeredTextColor};
  margin-bottom: 16px;
`;

const SoundIcon = styled.img`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

class HomeScreen extends PureComponent {
  handleSoundIconClick = () => {
    this.props.setTemplateConfig({
      soundEnabled: !this.props.templateConfig.soundEnabled,
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
              Koji.config.homeScreen.centeredImage && Koji.config.homeScreen.centeredImage !== '' &&
                <CenteredImage
                  centeredImageHeight={Koji.config.homeScreen.centeredImageHeight}
                  src={Koji.config.homeScreen.centeredImage}
                />
            }
            {
              Koji.config.homeScreen.centeredText && Koji.config.homeScreen.centeredText !== '' &&
                <CenteredTextWrapper
                  centeredTextColor={Koji.config.homeScreen.centeredTextColor}
                  centeredTextFontSize={Koji.config.homeScreen.centeredTextFontSize}
                >
                  {Koji.config.homeScreen.centeredText}
                </CenteredTextWrapper>
            }
            <PlayButton
              onClick={() => this.props.setAppView('game')}
              playButtonBackgroundColor={Koji.config.homeScreen.playButtonBackgroundColor}
              playButtonTextColor={Koji.config.homeScreen.playButtonTextColor}
              playButtonTextFontSize={Koji.config.homeScreen.playButtonTextFontSize}
            >
              {Koji.config.homeScreen.playButtonText}
            </PlayButton>
          </ContentWrapper>
        </FlexWrapper>
        <SoundIcon
          src={
            this.props.templateConfig.soundEnabled ?
            Koji.config.homeScreen.soundOnIcon :
            Koji.config.homeScreen.soundOffIcon
          }
          onClick={this.handleSoundIconClick}
        />
      </Container>
    );
  }
}

export default HomeScreen;
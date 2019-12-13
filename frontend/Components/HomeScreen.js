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
        backgroundColor={Koji.config.template.backgroundColor}
        backgroundImage={Koji.config.template.backgroundImage}
        backgroundImageMode={Koji.config.template.backgroundImageMode}
      >
        <FlexWrapper>
          <ContentWrapper>
            {
              Koji.config.template.centeredImage && Koji.config.template.centeredImage !== '' &&
                <CenteredImage
                  centeredImageHeight={Koji.config.template.centeredImageHeight}
                  src={Koji.config.template.centeredImage}
                />
            }
            {
              Koji.config.template.centeredText && Koji.config.template.centeredText !== '' &&
                <CenteredTextWrapper
                  centeredTextColor={Koji.config.template.centeredTextColor}
                  centeredTextFontSize={Koji.config.template.centeredTextFontSize}
                >
                  {Koji.config.template.centeredText}
                </CenteredTextWrapper>
            }
            <PlayButton
              onClick={() => this.props.setAppView('game')}
              playButtonBackgroundColor={Koji.config.template.playButtonBackgroundColor}
              playButtonTextColor={Koji.config.template.playButtonTextColor}
              playButtonTextFontSize={Koji.config.template.playButtonTextFontSize}
            >
              {Koji.config.template.playButtonText}
            </PlayButton>
          </ContentWrapper>
        </FlexWrapper>
        <SoundIcon
          src={
            this.props.templateConfig.soundEnabled ?
            Koji.config.template.soundOnIcon :
            Koji.config.template.soundOffIcon
          }
          onClick={this.handleSoundIconClick}
        />
      </Container>
    );
  }
}

export default HomeScreen;
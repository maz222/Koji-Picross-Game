import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import RubberBand from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import PostGameScreenForm from './PostGameScreenForm';

let Reveal = ({ children }) => (
  <div>{children}</div>
);

if (Koji.config.postGame.reveal === 'rubberBand') Reveal = ({ children }) => (<RubberBand>{children}</RubberBand>);
if (Koji.config.postGame.reveal === 'bounceTop') Reveal = ({ children }) => (<Bounce top>{children}</Bounce>);
if (Koji.config.postGame.reveal === 'bounceBottom') Reveal = ({ children }) => (<Bounce bottom>{children}</Bounce>);
if (Koji.config.postGame.reveal === 'fadeTop') Reveal = ({ children }) => (<Fade top>{children}</Fade>);
if (Koji.config.postGame.reveal === 'fadeBottom') Reveal = ({ children }) => (<Fade bottom>{children}</Fade>);
if (Koji.config.postGame.reveal === 'zoomTop') Reveal = ({ children }) => (<Zoom top>{children}</Zoom>);
if (Koji.config.postGame.reveal === 'zoomBottom') Reveal = ({ children }) => (<Zoom bottom>{children}</Zoom>);


const FlexWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  height: ${({ imageHeight }) => `${imageHeight}vh`};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  max-width: 90vw;

  background: ${({ cardBackdrop, secondaryColor }) => cardBackdrop ? secondaryColor : 'none'};
  border: ${({ cardBackdrop, primaryColor }) => cardBackdrop ? `4px solid ${primaryColor}` : 'none'};
  border-radius: ${({ cardBackdrop }) => cardBackdrop ? '4px' : '0'};
`;

const PlayButton = styled.button`
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

const ImageLinkWrapper = styled.a`
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

const TextWrapper = styled.div`
  font-size: ${({ textFontSize }) => `${parseInt(textFontSize)}px`};
  color: ${({ textColor }) => textColor};
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
    let CI = () => (
      <Image
        imageHeight={Koji.config.homeScreen.imageHeight}
        src={Koji.config.homeScreen.image}
      />
    );

    if (Koji.config.homeScreen.imageLink && Koji.config.homeScreen.imageLink !== '') {
      CI = () => (
        <ImageLinkWrapper
          href={Koji.config.homeScreen.imageLink}
          rel={'nofollow noreferrer'}
          target={'_blank'}
        >
          <Image
            imageHeight={Koji.config.homeScreen.imageHeight}
            src={Koji.config.homeScreen.image}
          />
        </ImageLinkWrapper>
      );
    }

    return (
      <Fragment>
        <FlexWrapper>
          <Reveal>
            <ContentWrapper
              primaryColor={Koji.config.general.primaryColor}
              cardBackdrop={Koji.config.homeScreen.cardBackdrop}
              secondaryColor={Koji.config.general.secondaryColor}
            >
              {
                Koji.config.homeScreen.image && Koji.config.homeScreen.image !== '' &&
                <CI />
              }
              {
                Koji.config.homeScreen.text && Koji.config.homeScreen.text !== '' &&
                  <TextWrapper
                    textColor={Koji.config.homeScreen.textColor}
                    textFontSize={Koji.config.homeScreen.textFontSize}
                  >
                    {Koji.config.homeScreen.text}
                  </TextWrapper>
              }
              <PlayButton
                onClick={() => this.props.setAppView('game')}
                primaryColor={Koji.config.general.primaryColor}
                playButtonTextFontSize={Koji.config.homeScreen.playButtonTextFontSize}
                textColor={Koji.config.general.textColor}
              >
                {Koji.config.homeScreen.playButtonText}
              </PlayButton>
            </ContentWrapper>
          </Reveal>
        </FlexWrapper>
        <SoundIcon
          src={
            this.props.templateConfig.soundEnabled ?
            Koji.config.homeScreen.soundOnIcon :
            Koji.config.homeScreen.soundOffIcon
          }
          onClick={this.handleSoundIconClick}
        />
      </Fragment>
    );
  }
}

export default HomeScreen;
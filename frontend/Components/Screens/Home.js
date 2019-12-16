import React, { Fragment, PureComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import Koji from '@withkoji/vcc';
import Bounce from 'react-reveal/Bounce';
import Fade from 'react-reveal/Fade';
import RubberBand from 'react-reveal/RubberBand';
import Zoom from 'react-reveal/Zoom';
import PropTypes from 'prop-types';
import PlayButton from '../Buttons/PlayButton';

let Reveal = ({ children }) => (
  <div>{children}</div>
);

if (Koji.config.postGameScreen.reveal === 'rubberBand') Reveal = ({ children }) => (<RubberBand>{children}</RubberBand>);
if (Koji.config.postGameScreen.reveal === 'bounceTop') Reveal = ({ children }) => (<Bounce top>{children}</Bounce>);
if (Koji.config.postGameScreen.reveal === 'bounceBottom') Reveal = ({ children }) => (<Bounce bottom>{children}</Bounce>);
if (Koji.config.postGameScreen.reveal === 'fadeTop') Reveal = ({ children }) => (<Fade top>{children}</Fade>);
if (Koji.config.postGameScreen.reveal === 'fadeBottom') Reveal = ({ children }) => (<Fade bottom>{children}</Fade>);
if (Koji.config.postGameScreen.reveal === 'zoomTop') Reveal = ({ children }) => (<Zoom top>{children}</Zoom>);
if (Koji.config.postGameScreen.reveal === 'zoomBottom') Reveal = ({ children }) => (<Zoom bottom>{children}</Zoom>);


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

class Home extends PureComponent {
  static propTypes = {
    setAppView: PropTypes.func,
    setTemplateConfig: PropTypes.func,
    templateConfig: PropTypes.object,
  };

  static defaultProps = {
    setAppView() {},
    setTemplateConfig() {},
    templateConfig: {},
  };

  componentDidMount() {
    const elem = document.getElementById('content-wrapper');
    if (elem && elem.offsetHeight > window.innerHeight) {
      elem.style.transform = `scale(${(window.innerHeight / elem.offsetHeight) * 0.9 })`;
    }
  }

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
              id={'content-wrapper'}
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
              <PlayButton onClick={() => this.props.setAppView('game')} />
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

export default Home;
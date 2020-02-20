import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import PropTypes from 'prop-types';
import Reveal from '../Components/Reveal';
import PrimaryButton from '../Buttons/Primary';

const FlexWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Image = styled.img`
  max-height: 50vh;
  max-width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  max-width: 100vw;

  background: none;
  border: none;
`;

const TextWrapper = styled.div`
  font-size: ${({ textFontSize }) => `${textFontSize}`};
  color: ${({ textColor }) => `${textColor}`};
  margin: ${({ textFontSize }) => `calc(${textFontSize} / 2) auto`};
`;

const SoundIcon = styled.img`
  position: absolute;
  bottom: 8px;
  right: 8px;
`;

const Divider = styled.div`
  height: ${({ height }) => height};
`;

class HomeScreen extends PureComponent {
  static propTypes = {
    setAppView: PropTypes.func,
    setTemplateConfig: PropTypes.func,
    templateConfig: PropTypes.object,
  };

  static defaultProps = {
    setAppView() { },
    setTemplateConfig() { },
    templateConfig: {},
  };

  componentDidMount() {
    const elem = document.getElementById('content-wrapper');
    if (elem && elem.offsetHeight > window.innerHeight * 0.8) {
      elem.style.transform = `scale(${(window.innerHeight / elem.offsetHeight) * 0.8})`;
    }
  }

  handleSoundIconClick = () => {
    this.props.setTemplateConfig({
      soundEnabled: !this.props.templateConfig.soundEnabled,
    });
  };

  render() {
    return (
      <Fragment>
        <FlexWrapper>
          <Reveal revealType={Koji.config.preGameScreen.reveal}>
            <ContentWrapper
              id={'content-wrapper'}
              secondaryColor={Koji.config.preGameScreen.cardBackgroundColor}
            >
              {
                Koji.config.preGameScreen.featuredImage && Koji.config.preGameScreen.featuredImage !== '' &&
                <Image
                  imageHeight={parseInt(Koji.config.preGameScreen.featuredImageSize, 10)}
                  src={Koji.config.preGameScreen.featuredImage}
                />
              }
              {
                Koji.config.preGameScreen.titleText && Koji.config.preGameScreen.titleText !== '' &&
                <TextWrapper
                  textColor={Koji.config.preGameScreen.titleColor}
                  textFontSize={'7.5vh'}
                >
                  {Koji.config.preGameScreen.titleText}
                </TextWrapper>
              }
              {
                (!Koji.config.preGameScreen.titleText || Koji.config.preGameScreen.titleText === '') &&
                <Divider height={'7.5vh'} />
              }
              <PrimaryButton
                fontSize={'7.5vh'}
                onClick={() => this.props.setAppView('game')}
                primaryColor={Koji.config.preGameScreen.playButtonColor}
                text={Koji.config.preGameScreen.playButtonText}
              />
            </ContentWrapper>
          </Reveal>
        </FlexWrapper>
        <SoundIcon
          src={
            this.props.templateConfig.soundEnabled ?
              Koji.config.general.soundOnIcon :
              Koji.config.general.soundOffIcon
          }
          onClick={this.handleSoundIconClick}
        />
      </Fragment>
    );
  }
}

export default HomeScreen;
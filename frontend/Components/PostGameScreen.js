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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

class PostGameScreen extends PureComponent {
  render() {
    return (
      <Container
        backgroundColor={Koji.config.general.backgroundColor}
        backgroundImage={Koji.config.general.backgroundImage}
        backgroundImageMode={Koji.config.general.backgroundImageMode}
      >
        <FlexWrapper>
          <ContentWrapper>

          </ContentWrapper>
        </FlexWrapper>
      </Container>
    );
  }
}

export default PostGameScreen;
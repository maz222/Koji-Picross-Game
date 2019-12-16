import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Koji from '@withkoji/vcc';
import Modal from 'react-modal';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 480px;
  margin: 0 auto;
  background: ${({ primaryColor }) => primaryColor};
  color: ${({ textColor }) => textColor};
`;

const ScoreContainer = styled.div`
  height: calc(100vh - 212px);
  overflow: auto;
`;

const Score = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${({ secondaryColor }) => secondaryColor};
  color: ${({ textColor }) => textColor};
  padding: 8px;
  margin-bottom: 4px;
`;

const ScoreIndex = styled.span`

`;

const ScoreName = styled.span`
  flex: 1;
  text-align: center;
`;

const ScorePoints = styled.span`

`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: 0;
  background: 0;
  padding: 16px;
  font-size: 24px;
  cursor: pointer;
  color: ${({ textColor }) => textColor};
`;

class Leaderboard extends PureComponent {
  static propTypes = {
    onCloseClick: PropTypes.func,
  };

  static defaultProps = {
    onCloseClick() {},
  };

  state = {
    scores: [],
    dataIsLoaded: false,
    error: false,
  };

  componentWillMount() {
    fetch(`${Koji.config.serviceMap.backend}/leaderboard`)
      .then((response) => response.json())
      .then(({ scores }) => {
        this.setState({ dataIsLoaded: true, scores });
      })
      .catch(err => {
        console.log('Fetch Error: ', err);
        this.setState({ error: true });
      });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        contentLabel={'Leaderboard'}
        style={{
          content: {
            background: Koji.config.general.primaryColor,
            color: Koji.config.general.textColor,
          }
        }}
      >
        <div>
          <CloseModalButton
            onClick={this.props.onCloseClick}
            textColor={Koji.config.general.textColor}
          >
            {'Close'}
          </CloseModalButton>
          {
            !this.state.dataIsLoaded &&
            <div>{'Loading...'}</div>
          }
          {
            this.state.error &&
            <div>{'Error'}</div>
          }
          {
            this.state.dataIsLoaded && !this.state.error &&
            <LeaderboardContainer
              primaryColor={Koji.config.general.primaryColor}
              secondaryColor={Koji.config.general.secondaryColor}
              textColor={Koji.config.homeScreen.textColor}
            >
              <h1>{'Leaderboard'}</h1>
              <ScoreContainer>
                {
                  this.state.scores.slice(0, 100).map((score, index) => (
                    <Score
                      primaryColor={Koji.config.general.primaryColor}
                      secondaryColor={Koji.config.general.secondaryColor}
                      textColor={Koji.config.homeScreen.textColor}
                    >
                      <ScoreIndex>{`${index + 1}`}</ScoreIndex>
                      <ScoreName>{score.name}</ScoreName>
                      <ScorePoints>{`${score.score.toLocaleString()} ${Koji.config.postGameScreen.leaderboardPointsText}`}</ScorePoints>
                    </Score>
                  ))
                }
              </ScoreContainer>
            </LeaderboardContainer>
          }
        </div>
      </Modal>
    );
  }
}

export default Leaderboard;
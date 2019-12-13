import React, { PureComponent } from 'react';
import Koji from '@withkoji/vcc';
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

class Leaderboard extends PureComponent {
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
    console.log('K', Koji.config);
    if (this.state.error) {
      return (
        <div>{'Error!'}</div>
      );
    }

    if (!this.state.dataIsLoaded) {
      return (
        <div>{'Loading...'}</div>
      );
    }

    return (
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
                <ScorePoints>{`${score.score.toLocaleString()} ${Koji.config.postGame.leaderboardPointsText}`}</ScorePoints>
              </Score>
            ))
          }
        </ScoreContainer>
      </LeaderboardContainer>
    );
  }
}

export default Leaderboard;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Game extends PureComponent {
  static propTypes = {
    getAppView: PropTypes.func,
    setAppView: PropTypes.func,
    setOutcome: PropTypes.func,
    setScore: PropTypes.func,
  };

  static defaultProps = {
    getAppView() {},
    setAppView() {},
    setOutcome() {},
    setScore() {},
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.setScore(10000);
            this.props.setAppView('postGame');
          }}
        >
          {'End the game with a score of 10,000'}
        </button>
        <button
          onClick={() => {
            this.props.setScore(10000);
            this.props.setOutcome('win');
            this.props.setAppView('postGame');
          }}
        >
          {'End the game with a winning score of 10,000'}
        </button>
        <button
          onClick={() => {
            this.props.setScore(10);
            this.props.setOutcome('lose');
            this.props.setAppView('postGame');
          }}
        >
          {'End the game with a losing score of 10'}
        </button>
      </div>
    );
  }
}

export default Game;
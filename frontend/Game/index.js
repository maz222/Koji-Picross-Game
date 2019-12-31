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

  initGame = () => {
    window.getAppView = this.props.getAppView;
    window.setAppView = this.props.setAppView;
    window.setScore = this.props.setScore;
    window.setOutcome = this.props.setOutcome;

    // Require the functions
    window.preload = require('./preload').default;
    window.setup = require('./setup').default;
    window.draw = require('./draw').default;

    // Create the game
    this.p5Game = new window.p5(null, document.getElementById('game-container'));
  }
  componentDidMount() {
    try {
      this.initGame();
    } catch (err) {
      console.log('Error starting game: ', err);
    }
  }

  componentDidUpdate() {
    try {
      // Allow refresh of game when the app changes
      this.p5Game.remove();
      this.initGame();
    } catch (err) {
      console.log('Error hot reloading game: ', err);
    }
  }

  componentWillUnmount() {
    try {
      this.p5Game.remove();
    } catch (err) {
      console.log('Error removing game: ', err)
    }
  }

  render() {
    return null;
  }
}

export default Game;
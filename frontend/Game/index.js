import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class GlobalP5Sketch extends PureComponent {
  static propTypes = {
    setAppView: PropTypes.func,
  };

  static defaultProps = {
    setAppView() {},
  };

  initGame = () => {
    // Still exposing this at the window level, but it should happen within scope
    window.setAppView = this.props.setAppView;

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

export default GlobalP5Sketch;
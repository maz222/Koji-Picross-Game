import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';
import WebFont from 'webfontloader';

import TitleScreen from './TitleScreen.js';
import LevelClearScreen from './LevelClearScreen.js';
import LevelPage from './LevelSelectScreen.js';
import GameScene from './GameScreen.js';
import TutorialScreen from './TutorialScreen.js';

import LevelFactory from './RandomLevelFactory.js';

import AudioManager from './AudioManager.js';

const GameScreenWrapper = styled.div`
  display: ${({ show }) => show ? 'block' : 'none'}
`;

// Note: Putting the image url inside the styled component
// causes the image to be re-downloaded even when re-renders
// aren't triggered
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

class App extends PureComponent {
  state = {
    view: 'title',
    audio:new AudioManager()
  };

  componentDidMount() {
    document.getElementById("root").style.height = window.innerHeight+'px';
    window.setAppView = view => { this.setState({ view }); }
    // Set the font; fallback to Roboto
    this.loadFont();
  }

  componentDidUpdate() {
    if (Koji.config.general.fontFamily.family !== document.body.style.fontFamily) {
      this.loadFont();
    }
  }

  loadFont = () => {
    WebFont.load({ google: { families: [Koji.config.general.fontFamily.family] } });
    document.body.style.fontFamily = Koji.config.general.fontFamily.family;
  };

  render() {
    if(this.state.view === 'title') {
      return(<TitleScreen audio={this.state.audio}/>);
    }
    if(this.state.view === 'levelClear') {
      return(<LevelClearScreen audio={this.state.audio}/>);
    }
    if(this.state.view === 'levelSelect') {
        return(<LevelPage audio={this.state.audio}/>);
    }
    if(this.state.view === 'game') {
        const VCC = Koji.config.levelSelect;
        const LEVEL_ID = parseInt(localStorage.getItem('currentLevel'));
        console.log(LEVEL_ID);
        let level = null;
        let title = null;
        if(LEVEL_ID >= 0) {
            level = VCC.gameLevels[LEVEL_ID].level;
            title = VCC.gameLevels[LEVEL_ID].title;
        }
        else {
            level = LevelFactory.build([(LEVEL_ID*-1)*5,(LEVEL_ID*-1)*5]);
            title = "Random Level";
        }
        return(<GameScene level={level} title={title} audio={this.state.audio}/>);
    }
    if(this.state.view === 'tutorial') {
        return(<TutorialScreen audio={this.state.audio}/>)
    }
    return null;
  }
}

export default App;

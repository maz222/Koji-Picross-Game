import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

import hextoHSL from './UtilityFunctions.js'

class LevelClearScreen extends React.Component {
	render() {
		const VCC = Koji.config.levelClearScreen;
        let pageColor = VCC.background.backgroundColor;
        let pageImage = VCC.background.backgroundImage;
        pageImage = pageImage == undefined ? "" : pageImage;
        let PageDiv = styled.div`
            width:100%;
            display:flex;
            justify-content:center;
            background-size:cover;
            background-color:${pageColor};
            background-image:url${pageImage};
        `;
        let WrapperDiv = styled.div`
            width:600px;
            height:100%;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-around;
            flex-direction:column;
        `;
		let Banner = styled.h1`
			font-size:2em;
			background-color:${VCC.banner.backgroundColor};
			color:${VCC.banner.color};
			text-align:center;
			padding:10px 0 10px 0;
			width:100%;
		`;
		let nextHoverColor = hextoHSL(VCC.nextButton.backgroundColor);
        nextHoverColor[2] = Math.max(0,nextHoverColor[2]-20);
        nextHoverColor = `hsl(${nextHoverColor[0]},${nextHoverColor[1]}%,${nextHoverColor[2]}%)`;
		let NextButton = styled.button`
			background-color:${VCC.nextButton.backgroundColor};
			font-size:1.25em;
			color:${VCC.nextButton.color};
			padding:10px;
			text-align:center;
			min-width:80%;
			border-radius:4px;
			border:0;
			box-shadow: 0 0 0 2pt rgba(0,0,0,.1);
			&:hover{
				background-color:${nextHoverColor};
            	box-shadow: 0 0 0 0;
			}
		`;
		let puzzleSelectHoverColor = hextoHSL(VCC.puzzleSelectButton.backgroundColor);
        puzzleSelectHoverColor[2] = Math.max(0,puzzleSelectHoverColor[2]-20);
        puzzleSelectHoverColor = `hsl(${puzzleSelectHoverColor[0]},${puzzleSelectHoverColor[1]}%,${puzzleSelectHoverColor[2]}%)`;
		let PuzzleSelectButton = styled.button`
			background-color:${VCC.puzzleSelectButton.backgroundColor};
			font-size:1.25em;
			color:${VCC.puzzleSelectButton.color};
			padding:10px;
			text-align:center;
			min-width:80%;
			border-radius:4px;
			border:0;
			box-shadow: 0 0 0 2pt rgba(0,0,0,.1);
			&:hover{
				background-color:${puzzleSelectHoverColor};
            	box-shadow: 0 0 0 0;
			}
		`;
		let quitHoverColor = hextoHSL(VCC.quitButton.backgroundColor);
        quitHoverColor[2] = Math.max(0,quitHoverColor[2]-20);
        quitHoverColor = `hsl(${quitHoverColor[0]},${quitHoverColor[1]}%,${quitHoverColor[2]}%)`;
		let QuitButton = styled.button`
			background-color:${VCC.quitButton.backgroundColor};
			font-size:1.25em;
			color:${VCC.quitButton.color};
			padding:10px;
			text-align:center;
			min-width:80%;
			border-radius:4px;
			border:0;
			box-shadow: 0 0 0 2pt rgba(0,0,0,.1);
			&:hover{
				background-color:${quitHoverColor};
            	box-shadow: 0 0 0 0;
			}
		`;
		let nextCallback = () => {
			this.props.audio.playAudio(2);
			let currentLevel = parseInt(localStorage.getItem('currentLevel'));
            if(currentLevel >= 0) {
			    localStorage.setItem('currentLevel',Math.min(currentLevel+1,Koji.config.levelSelect.gameLevels.length-1));
            }
			window.setAppView("game");
		}
		return(
			<PageDiv>
				<WrapperDiv>
					<Banner>{VCC.banner.content}</Banner>
					<PuzzleSelectButton onClick={() => {this.props.audio.playAudio(2); window.setAppView("levelSelect")}}>{VCC.puzzleSelectButton.content}</PuzzleSelectButton>
					<NextButton onClick={nextCallback}>{VCC.nextButton.content}</NextButton>
					<QuitButton onClick={() => {this.props.audio.playAudio(2); window.setAppView("title")}}>{VCC.quitButton.content}</QuitButton>
				</WrapperDiv>
			</PageDiv>
		);
	}
}

export default LevelClearScreen;
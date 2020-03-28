import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

import hextoHSL from './UtilityFunctions.js'

class LevelClearPopup extends React.Component {
	render() {
		const VCC = Koji.config.levelClearScreen;
        let WrapperDiv = styled.div`
        	position:absolute;
        	top:50%;
        	left:50%;
        	width:300px;
        	margin-left:-150px;
            height:500px;
            margin-top:-250px;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:space-around;
            flex-direction:column;
            background-color:rgb(240,240,240);
            padding:20px;
            z-index:16777271;
            box-shadow: 0 0 10px black;       
        `;
		let Banner = styled.h1`
			font-size:2em;
			background-color:${VCC.banner.backgroundColor};
			color:white;
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
			let currentLevel = parseInt(sessionStorage.getItem('currentLevel'));
			sessionStorage.setItem('currentLevel',currentLevel+1);
			window.setAppView("game");
		}
		return(
			<WrapperDiv>
				<Banner>{"Puzzle Clear"}</Banner>
				<PuzzleSelectButton onClick={() => {window.setAppView("puzzleSelect")}}>{VCC.puzzleSelectButton.content}</PuzzleSelectButton>
				<NextButton onClick={nextCallback}>{VCC.nextButton.content}</NextButton>
				<QuitButton onClick={() => {window.setAppView("title")}}>{VCC.quitButton.content}</QuitButton>
			</WrapperDiv>
		);
	}
}

export default LevelClearPopup;
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

import hextoHSL from './UtilityFunctions.js'

import Level from './Level.js';

class GameScene extends React.Component {
	constructor(props) {
		super(props);
		let level = [];
        for(var i=0;i<props.level.length;i++) {
            level.push([]);
            for(var j=0;j<props.level[0].length;j++) {
                level[i].push(0);                
            }
        }
		this.state = {
			playerLevel:[...level]
		};
		this.toggleCell = this.toggleCell.bind(this);
	}
    componentDidMount() {
        this.props.audio.playAudio(0);
    }
    componentWillUnmount() {
        this.props.audio.stopAudio(0);
    }
	checkWinState() {
		for(var i=0;i<this.state.playerLevel.length;i++) {
			for(var j=0;j<this.state.playerLevel[i].length;j++) {
				if(this.props.level[i][j] && this.state.playerLevel[i][j] != 1) {
					return false;
				}
			}
		}
        this.props.audio.playAudio(1);
		return true;
	}
	toggleCell(rowIndex,columnIndex) {
        this.props.audio.playAudio(2);
		this.state.playerLevel[rowIndex][columnIndex] = (this.state.playerLevel[rowIndex][columnIndex]+1) % 3;
		this.forceUpdate();
	}
	render() {
		if(this.checkWinState()) {
			window.setAppView("levelClear");
		}
        let PageDiv = styled.div`
            height:100%;
            width:100%;
            display:flex;
            align-items:center;
            flex-direction:column;
            background-color:rgb(80,80,80);
        `;
        let Banner = styled.div`
        	width:90%;
        	display:flex;
        	align-items:center;
        	background-color:rgb(40,40,40);
        	margin:40px 0 40px 0;
        `;
        let backHoverColor = hextoHSL("#f0f0f0");
        backHoverColor[2] = Math.max(0,backHoverColor[2]-20);
        let StyledBackButton = styled.button`
            border:0;
            background-color:rgba(0,0,0,0);
            border-radius:2px;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:20px;
            &:hover{
                background-color:black;
            }      
        `;
        let StyledBackImage = styled.img`
            height:30px;
            width:auto;
        `;
        let BackImage = <StyledBackImage src={Koji.config.general.backButton.buttonImage}/>;
        let BackButton = <StyledBackButton onClick={() =>{this.props.audio.playAudio(2); window.setAppView('levelSelect')}}>{BackImage}</StyledBackButton>;

        let BannerTitle = styled.h1`
        	width:90%;
        	height:100%;
    		text-align:center;
    		color:white;
    		font-size:1.5em;
    		display:flex;
    		justify-content:center;
    		align-items:center;
        `
		return(
			<PageDiv>
				<Banner>
					{BackButton}
					<BannerTitle>{this.props.title}</BannerTitle>
				</Banner>
				<Level level={this.props.level} playerLevel={this.state.playerLevel} callBack={this.toggleCell}/>
			</PageDiv>
		);
	}
} 

export default GameScene;
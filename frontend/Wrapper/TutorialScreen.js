import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

import hextoHSL from './UtilityFunctions.js';


class TutorialScreen extends React.Component {
	render() {
		let text = [`In order to complete a picross puzzle, you must correctly fill out a number of squares on a grid to reveal a hidden image or pattern.`,
        `Cells can either be filled, marked with a red X, or empty.`,
		`The numbers on the sides of each row and column represent the number of continuous filled squares present in that section.`, 
		`-For example: "2" indicates that, somewhere within that section, there are 2 continuous filled squares.`, 
		`If there are multiple numbers for a single row or column, that section contains multiple groups of squares, with each group containing that number of squares, and with each group being separated by at least one empty square.`, 
		`-For example: "5 1 2" indicates a group of 5 filled squares, at least one empty square,  1 filled square, at least one empty square, and 2 filled squares.`, 
		`Generally speaking, it is usually easiest to start by filling out sections with larger counts of filled squares.`];
        const VCC = Koji.config.levelSelect;
        let pageColor = VCC.background.backgroundColor;
        let pageImage = VCC.background.backgroundImage;
        pageImage = pageImage == undefined ? "" : pageImage;
        let PageDiv = styled.div`
            height:100%;
            width:100%;
            display:flex;
            justify-content:center;
            background-size:cover;
            background-color:${pageColor};
            background-image:url${pageImage};
        `;

        let bannerColor = VCC.banner.backgroundColor;
        let Banner = styled.div`
            width:100%;
            display:flex;
            align-items:center;
            position:fixed;
            background-color:${bannerColor};
            top:0px;
            border-bottom:1px solid rgba(0,0,0,.25);
        `;

        let backHoverColor = hextoHSL(bannerColor);
        backHoverColor[2] = Math.max(0,backHoverColor[2]-20);
        let StyledBackButton = styled.button`
            float:left;
            padding:20px;
            border:0;
            background-color:${bannerColor};
            border-radius:2px;
            display:flex;
            justify-content:center;
            align-items:center;
            &:hover{
                background-color:${`hsl(${backHoverColor[0]},${backHoverColor[1]}%,${backHoverColor[2]}%)`};
            }      
        `;
        let StyledBackImage = styled.img`
            height:30px;
            width:auto
        `;
        let BackImage = <StyledBackImage src={Koji.config.general.backButton.buttonImage}/>;
        let BackButton = <StyledBackButton onClick={() => {this.props.audio.playAudio(2); window.setAppView('title')}}>{BackImage}</StyledBackButton>;

        let TitleWrapper = styled.div`
            float: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        `;
        let titleText = VCC.banner.content;
        let titleColor = VCC.banner.textColor;
        let Title = styled.h1`
            color:${titleColor};
            font-size:2em;
            white-space: nowrap;
        `;	
        let TutorialText = styled.p`
        	padding:5px 10px 5px 10px;
        	color:rgb(10,10,10);
        `;	
		return(
			<PageDiv>
                <Banner>
                    {BackButton}
                    <TitleWrapper><Title>{titleText}</Title></TitleWrapper>
                    <div />
                </Banner>
                <div style={{width:'100%',marginTop:'100px'}}>
                	{text.map((t,i) => {
                		return(<TutorialText>{t}</TutorialText>)
                		}
                	)}
                </div>
            </PageDiv>
		);
	}
}

export default TutorialScreen;
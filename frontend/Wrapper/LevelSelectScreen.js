import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

import hextoHSL from './UtilityFunctions.js'

class LevelPage extends React.Component {
    render() {
        const VCC = Koji.config.levelSelect;
        let pageColor = VCC.background.backgroundColor;
        let pageImage = VCC.background.backgroundImage;
        pageImage = pageImage == undefined ? "" : pageImage;
        let PageDiv = styled.div`
            width:100%;
            height:100%;
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

        let levelColor = VCC.level.backgroundColor;
        let levelHoverColor = hextoHSL(levelColor);
        levelHoverColor[2] = Math.max(0,levelHoverColor[2]-20);
        levelHoverColor = `hsl(${levelHoverColor[0]},${levelHoverColor[1]}%,${levelHoverColor[2]}%)`;
        let levelTitleColor = VCC.level.color;
        let levelCallback = (index) => {
            localStorage.setItem('currentLevel',index);
            window.setAppView('game');
        };
        let StyledLevelButton = styled.button`
            background-color:${levelColor};
            color:${levelTitleColor};
            padding:10px;
            margin:10px;
            border-radius:4px;
            border:1px solid rgba(0,0,0,.15);
            box-shadow:0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            transition:all 0.3s cubic-bezier(.25,.8,.25,1);
            display:flex;
            align-items:center;
            justify-content:space-between;
            font-size:1.25em;
            &:hover{
                background-color:${levelHoverColor}
            }
        `;

        return(
            <PageDiv>
                <Banner>
                    {BackButton}
                    <TitleWrapper><Title>{titleText}</Title></TitleWrapper>
                    <div />
                </Banner>
                <div style={{width:'100%',display:'flex',flexDirection:'column',marginTop:'80px'}}>
                    {VCC.gameLevels.map((level,index) => {
                        let name = level.title == "" || level.title == undefined ? `Level ${index+1}` : level.title;
                        return(
                            <StyledLevelButton onClick={() => {this.props.audio.playAudio(2); levelCallback(index)}}>{name}</StyledLevelButton>
                        );
                    })}
                </div>
            </PageDiv>
        );
    }
}

export default LevelPage;
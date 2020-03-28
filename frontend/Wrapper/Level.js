import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Koji from '@withkoji/vcc';

let EmptyCell = styled.div`
    background-color:rgb(240,240,240);
    border:1px solid rgba(0,0,0,.1);
    box-shadow: 5px 10px black;
`;

let FilledCell = styled.div`
    padding:2px;
    background-color:rgb(20,20,20);
    border:1px solid rgba(0,0,0,.1);
    box-shadow: 5px 10px black;
`;

let XCell = styled.div`
    color:red;
    background-color:rgb(240,240,240);
    border:1px solid rgba(0,0,0,.1);
    box-shadow: 5px 10px black;
    justify-content:center;
    align-items:center;
    display:flex;
`

let IncorrectSectionTag = styled.h2`
    background-color:rgb(255,255,255);
    color:red;
    padding:4px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0;
    font-size:1em;
    box-shadow: 5px 10px black;
`;

let CorrectSectionTag = styled.h2`
    background-color:rgb(255,255,255);
    padding:4px;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0;
    font-size:1em;
    box-shadow: 5px 10px black;
`;

//props
    //level : [[false,false,true,...],[...],...] (the level solution - used for tags)
    //playerLevel : [[false,false,true,...],[...],...] (based on player input - rendered in the actual grid)
    //callBack : callback function for when player clicks/toggles a cell
class Level extends React.Component {
    constructor(props) {
        super(props);
    }    
    parseSection(cellList) {
        let counts = [];
        let cellCount = 0;
        for(var c in cellList) {
            if(cellList[c] == true || cellList[c] == 1) {
                cellCount += 1;
            }
            else {
                if(cellCount > 0) {
                    counts.push(cellCount);
                    cellCount = 0;
                }
            }
        }
        if(cellCount > 0) {
            counts.push(cellCount);
        }
        return counts.length > 0 ? counts : [0];
    }
    getColumn(level,columnIndex) {
        return level.map(x => x[columnIndex]);
    }
    getMaxLabels() {
        let maxRows = 0;
        let maxCols = 0;
        for(var i=0;i<this.props.level.length;i++) {
            maxRows=Math.max(this.parseSection(this.props.level[i]).length,maxRows);
            maxCols=Math.max(this.parseSection(this.getColumn(this.props.level,i)).length,maxCols);
        }
        return [maxRows,maxCols];
    }
    checkLabels(labels,section) {
        let parsedSectionLabels = this.parseSection(section);
        let results = [];
        if(parsedSectionLabels.length > labels.length) {
            for(var i in labels) {
                results.push(false);
            }
            return results;
        }
        for(var i in labels) {
            results.push(i<parsedSectionLabels.length && labels[i] == parsedSectionLabels[i]);
        }
        return results;
    }
    buildLevel() {
        let labelSizes = this.getMaxLabels();
        let gridHeight = this.props.level.length + labelSizes[1];
        let gridWidth = this.props.level[0].length + labelSizes[0];

        let cellSize = Math.max(gridHeight,gridWidth) > 10 ? .7 : 1;
        cellSize = window.innerWidth > 1000 ? 1 : cellSize;

        return(this.props.level.map((row,rowIndex) => {
            let tags = this.parseSection(this.props.level[this.props.level.length-rowIndex-1]);
            let tagChecks = this.checkLabels(tags,this.props.playerLevel[this.props.level.length-rowIndex-1]);
            return(
                //row tags
                tags.map((tag,tagIndex) => {
                    let colStart = labelSizes[0]-tags.length+tagIndex;
                    let rowStart = labelSizes[1]+this.props.level.length-rowIndex-1;
                    let gridStyle = {
                        gridColumnStart:colStart,
                        gridColumnEnd:colStart+1,
                        gridRowStart:rowStart,
                        gridRowEnd:rowStart+1,
                        zIndex:this.props.level.length-rowIndex,
                        width:`${cellSize*2}em`,
                        height:`${cellSize*2}em`,
                        fontSize:`${cellSize}em`
                    };
                    return(tagIndex<tagChecks.length&&tagChecks[tagIndex] ? <CorrectSectionTag style={gridStyle}>{tag}</CorrectSectionTag> : <IncorrectSectionTag style={gridStyle}>{tag}</IncorrectSectionTag>);
                }).concat(
                    //grid
                    row.map((isCellFilled,cellIndex) => {
                        let cellValue = this.props.playerLevel[rowIndex][cellIndex];
                        let colStart = labelSizes[0]+cellIndex;
                        let rowStart = labelSizes[1]+rowIndex;
                        let gridStyle = {
                            gridColumnStart:colStart,
                            gridColumnEnd:colStart+1,
                            gridRowStart:rowStart,
                            gridRowEnd:rowStart+1,
                            zIndex:this.props.level.length+1,
                            width:`${cellSize*2}em`,
                            height:`${cellSize*2}em`,
                            fontSize:`${cellSize}em`
                        };
                            switch(cellValue) {
                                case 0:
                                    return <EmptyCell style={gridStyle} onClick={() => {this.props.callBack(rowIndex,cellIndex)}} />;
                                case 1:
                                    return <FilledCell style={gridStyle} onClick={() => {this.props.callBack(rowIndex,cellIndex)}} />;
                                case 2:
                                    return <XCell style={gridStyle} onClick={() => {this.props.callBack(rowIndex,cellIndex)}}>{'x'}</XCell>;
                            } 
                    })
                )
            );
        }).concat(
            //column tags
            this.props.level[0].map((val,colIndex) => {
                let tags = this.parseSection(this.getColumn(this.props.level,colIndex));
                let tagChecks = this.checkLabels(tags,this.getColumn(this.props.playerLevel,colIndex));
                //console.log(tagChecks);
                return(
                    tags.map((tag,tagIndex) => {
                        let colStart = labelSizes[0]+colIndex;
                        let rowStart = labelSizes[1]-tags.length+tagIndex;
                        let gridStyle = {
                            gridColumnStart:colStart,
                            gridColumnEnd:colStart+1,
                            gridRowStart:rowStart,
                            gridRowEnd:rowStart+1,                        
                            width:`${cellSize*2}em`,
                            height:`${cellSize*2}em`,
                            fontSize:`${cellSize}em`
                        };
                        return(tagIndex<tagChecks.length&&tagChecks[tagIndex] ? <CorrectSectionTag style={gridStyle}>{tag}</CorrectSectionTag> : <IncorrectSectionTag style={gridStyle}>{tag}</IncorrectSectionTag>);
                    })
                );
            })
        ));
    }
    render() {
        let gridSize = this.getMaxLabels();
        gridSize = [gridSize[0]+this.props.level[0].length, gridSize[1]+this.props.level.length];
        let Grid = styled.div`
            display:grid;
            margin:10px;
            grid-template-columns:repeat(${gridSize[0]-1}, 1fr);
            grid-template-rows:repeat(${gridSize[1]-1}, 1fr);
        `;
        return(
            <Grid>
                {this.buildLevel()}
            </Grid>
        );
    }
}

export default Level;
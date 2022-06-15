import React, { useState, useEffect } from 'react';
import { BearSet } from './BearBox';
import { ElkSet } from './ElkSet';
import { SalmonSet } from './SalmonSet';
import { HawkSet } from './HawkSet'
import { FoxSet } from './FoxSet';
import { EnvironSet } from './EnvironsSet';
import { PineconeSetter } from './PineconeSetter';
import { ShowButton, HideButton } from './showhide';


//functional component that renders all the scoring elements and collects their states to track score
export function ScoreBoard (props) {

    //const [totals, setTotals] = useState ({player1: 0, player2: 0, player3: 0, player4: 0});
    
    const [bears, setBears ] = useState ([]);
    const [elk, setElk] = useState ([]);
    const [salmon, setSalmon] = useState ([]);
    const [birds, setBirds] = useState ([]);
    const [foxes, setFoxes] = useState ([]);
    const [animalTotal, setAnimalTotal] = useState ([]);
    const [environs, setEnvirons] = useState ([]);
    const [environScores, setEnvironScores] = useState({"mountains": [0,0,0,0], "forests": [0,0,0,0], "prairies": [0,0,0,0], "wetlands": [0,0,0,0], "rivers": [0,0,0,0]})
    const [pinecones, setPinecones] = useState([])
    const [grandTotals, setGrandTotals] = useState([])
    const [showBoard, setShowBoard] = useState(true)

    useEffect(() => {
        const p1 = bears[0] + elk[0] + salmon [0] + birds[0] + foxes[0]
        const p2 = bears[1] + elk[1] + salmon [1] + birds[1] + foxes[1]
        const p3 = bears[2] + elk[2] + salmon [2] + birds[2] + foxes[2]
        const p4 = bears[3] + elk[3] + salmon [3] + birds[3] + foxes[3]

        setAnimalTotal([p1,p2,p3,p4])
        
    },[bears,elk,salmon,birds,foxes])
    
    useEffect(() => {
        const p1 = animalTotal[0] + environs[0] + pinecones[0]
        const p2 = animalTotal[1] + environs[1] + pinecones[1]
        const p3 = animalTotal[2] + environs[2] + pinecones[2]
        const p4 = animalTotal[3] + environs[3] + pinecones[3]

        setGrandTotals([p1,p2,p3,p4])
    }, [animalTotal, environs, pinecones])    

    function handleBearChange (score) {
        setBears ([score[0], score[1], score[2], score[3]]);
    }

    function handleElkChange (score) {
        setElk ([score[0], score[1], score[2], score[3]]);
    }

    function handleSalmonChange (score) {
        setSalmon ([score[0], score[1], score[2], score[3]]);
    }

    function handleBirdChange (score) {
        setBirds ([score[0], score[1], score[2], score[3]])
    }

    function handleFoxChange (score) {
        setFoxes ([score[0], score[1], score[2], score[3]])
    }

    function handleEnvironChange (totals,scores) {
        setEnvirons ([totals[0], totals[1], totals[2], totals[3]])
        setEnvironScores(scores)
        console.log(scores)
    }

    function handlePineconeChange (score) {
        setPinecones([score[0], score[1], score[2], score[3]])
    }

    function handleBoardChange () {
        if (showBoard === true) { 
            setShowBoard(false) 
        } else if (showBoard === false) {
            setShowBoard(true) 
        }
    }

    return (
        <div>
            
            <div class="score-table-div">
                <div class = "showHideDiv">
                    {showBoard === false && <ShowButton class = "showHideButton" onChange = {handleBoardChange} />}
                    {showBoard === true && <HideButton class = "showHideButton" onChange = {handleBoardChange} />}
                </div>
                {showBoard === true &&  
                <table className = "scoreTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Player 1</th>
                            <th>Player 2</th>
                            <th>Player 3</th>
                            <th>Player 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><img id = "score-icon" src={require("./media/icons/bear_icon.png")} alt = "Bears"/></td>
                            <td>{bears[0]}</td>
                            <td>{bears[1]}</td>
                            <td>{bears[2]}</td>
                            <td>{bears[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "score-icon" src={require("./media/icons/elk_icon.png")} alt = "Elk"/></td>
                            <td>{elk[0]}</td>
                            <td>{elk[1]}</td>
                            <td>{elk[2]}</td>
                            <td>{elk[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "score-icon" src={require("./media/icons/salmon_icon.png")} alt = "Salmon"/></td>
                            <td>{salmon[0]}</td>
                            <td>{salmon[1]}</td>
                            <td>{salmon[2]}</td>
                            <td>{salmon[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "score-icon" src={require("./media/icons/hawk_icon.png")} alt = "Hawk"/></td>
                            <td>{birds[0]}</td>
                            <td>{birds[1]}</td>
                            <td>{birds[2]}</td>
                            <td>{birds[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "score-icon" src={require("./media/icons/fox_icon.png")} alt = "Foxes"/></td>
                            <td>{foxes[0]}</td>
                            <td>{foxes[1]}</td>
                            <td>{foxes[2]}</td>
                            <td>{foxes[3]}</td>
                        </tr>
                        <tr>
                            <td>---</td>
                            <td>{animalTotal[0]}</td>
                            <td>{animalTotal[1]}</td>
                            <td>{animalTotal[2]}</td>
                            <td>{animalTotal[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "environ-icon" src={require("./media/icons/mountain_icon.png")} alt = "Mountains"/></td>
                            <td>{environScores.mountains[0]}</td>
                            <td>{environScores.mountains[1]}</td>
                            <td>{environScores.mountains[2]}</td>
                            <td>{environScores.mountains[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "environ-icon" src={require("./media/icons/forest_icon.png")} alt = "Forests"/></td>
                            <td>{environScores.forests[0]}</td>
                            <td>{environScores.forests[1]}</td>
                            <td>{environScores.forests[2]}</td>
                            <td>{environScores.forests[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "environ-icon" src={require("./media/icons/prairie_icon.png")} alt = "Prairie"/></td>
                            <td>{environScores.prairies[0]}</td>
                            <td>{environScores.prairies[1]}</td>
                            <td>{environScores.prairies[2]}</td>
                            <td>{environScores.prairies[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "environ-icon" src={require("./media/icons/wetland_icon.png")} alt = "Wetland"/></td>
                            <td>{environScores.wetlands[0]}</td>
                            <td>{environScores.wetlands[1]}</td>
                            <td>{environScores.wetlands[2]}</td>
                            <td>{environScores.wetlands[3]}</td>
                        </tr>
                        <tr>
                            <td><img id = "environ-icon" src={require("./media/icons/river_icon.png")} alt = "Rivers"/></td>
                            <td>{environScores.rivers[0]}</td>
                            <td>{environScores.rivers[1]}</td>
                            <td>{environScores.rivers[2]}</td>
                            <td>{environScores.rivers[3]}</td>
                        </tr>
                        <tr>
                            <td>---</td>
                            <td>{environs[0]}</td>
                            <td>{environs[1]}</td>
                            <td>{environs[2]}</td>
                            <td>{environs[3]}</td>
                        </tr>
                        <tr>
                            <td>Pinecones</td>
                            <td>{pinecones[0]}</td>
                            <td>{pinecones[1]}</td>
                            <td>{pinecones[2]}</td>
                            <td>{pinecones[3]}</td>
                        </tr>
                    </tbody>
                    <tfoot> 
                        <tr>
                            <td>TOTAL</td>
                            <td>{grandTotals[0]}</td>
                            <td>{grandTotals[1]}</td>
                            <td>{grandTotals[2]}</td>
                            <td>{grandTotals[3]}</td>
                        </tr>
                    </tfoot>
                </table>}  
            </div>


            <div key =  {"Bear" + props.bears} class= "page-section" id = "bear-section">
                <div class = "fake-banner"></div>           
                <BearSet class = "bear-box"
                playerCount = {props.players} 
                cardValue = {props.bears} 
                onScoreChange = {handleBearChange} />   
                <div className='banner' id = "bear-banner">
                    <hr/>
                    <h2>GRIZZLY BEARS</h2>
                    <hr id = "text-break"/>
                    <p>Ursos arctos horribilis</p>
                </div>         
            </div>

            <div key = {"Elk" + props.elk} class= "page-section" id = "elk-section">
                <div class = "fake-banner"></div>
                
                 
                    <ElkSet class = "elk-box"
                    playerCount = {props.players}
                    cardValue = {props.elk}
                    onScoreChange = {handleElkChange} />
                
                <div className='banner' id = "elk-banner">
                    <hr/>
                    <h2>ROOSEVELT ELK</h2>
                    <hr id = "text-break"/>
                    <p>Cervus canadensis roosevelti</p>
                </div>   
            </div>

            <div key = {"Salmon" + props.salmon} class = "page-section" id ="salmon-section">
                <div class = "fake-banner"></div>
                <SalmonSet class = "salmon-box"
                playerCount = {props.players}
                cardValue = {props.salmon}
                onScoreChange = {handleSalmonChange} />
                <div className="banner" id="salmon-banner">
                    <hr/>
                    <h2>CHINOOK SALMON</h2>
                    <hr id = "text-break"/>
                    <p>Oncorhynchus tshawytscha</p>
                </div>
            </div>

            <div key = {"Hawk" + props.birds} class = "page-section" id="bird-section">
                <div class = "fake-banner"></div>
                <HawkSet class = "bird-box"
                playerCount = {props.players}
                cardValue = {props.birds}
                onScoreChange = {handleBirdChange} />
                <div className="banner" id="bird-banner">
                    <hr/>
                    <h2>RED-TAILED HAWK</h2>
                    <hr id = "text-break"/>
                    <p>Buteo jamaicensis</p>
                </div>
            </div>

            <div key = {"Fox" + props.foxes} class = "page-section" id="fox-section">
                <div class = "fake-banner"></div>
                <FoxSet
                playerCount ={props.players} 
                cardValue = {props.foxes} 
                onScoreChange = {handleFoxChange} />
                <div className="banner" id="fox-banner">
                    <hr/>
                    <h2>RED FOX</h2>
                    <hr id = "text-break"/>
                    <p>Vulpes vulpes</p>
                </div>
            </div>

            <div className='page-section'>
                <EnvironSet 
                playerCount ={props.players}
                onTotalChange = {handleEnvironChange} />
                <PineconeSetter 
                playerCount = {props.players}
                onScoreChange = {handlePineconeChange}
                />
            </div>
        </div>
    )
}
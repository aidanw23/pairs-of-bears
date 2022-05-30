import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";

/*
BEARBOX COMPONENT
Bear box will be render 1 to 4 bear elements with inputs depending on card and player count set initially. 
Each box will handle score differently.
Score should be raised to parent level

currently A and B score simply using dropdowns, so they handle scores in the handleChange
C and D have mulitple different groups to be scored so they both manipulate cPlayer1 to show amount of groups.

scores are then calculated used cPlayer states in functions cScoreUpdate and dScoreUpdate.
when scores are updated for ABC or D, useEffect listening for changes fires and passes scores to parent component ScoreBoard

*/

export function BearSet (props) {
    const [aScore, setAScore] = useState([0,0,0,0])

    const [bScore, setBScore] = useState([0,0,0,0])

    const [cPlayer1, setCPlayer1] = useState([0,0,0]);
    const [cPlayer2, setCPlayer2] = useState([0,0,0]);
    const [cPlayer3, setCPlayer3] = useState([0,0,0]);
    const [cPlayer4, setCPlayer4] = useState([0,0,0]);
    const [cScore,setCScore] =useState([0,0,0,0])


    const [dScore, setDScore] = useState([0,0,0,0])

    //useEffect that passes changed scores to parent
    useEffect (() => {
        if (props.cardValue === "A") {
            props.onScoreChange(aScore)
        }
        if (props.cardValue === "B") {
            props.onScoreChange(bScore)
        }
        if (props.cardValue === "C") {

            props.onScoreChange(cScore)
            console.log(`passing to parent ${cScore}`)
        }
        if (props.cardValue === "D") {           
            props.onScoreChange(dScore)
        }
    }, [aScore, bScore, cScore, dScore]);

    //useEffect listening for changes in playerStates that then calculates scores accordingly
    useEffect (() => {
        if (props.cardValue === "C") {
            cScoreUpdate(cPlayer1, "1")
            cScoreUpdate(cPlayer2, "2")
            cScoreUpdate(cPlayer3, "3")
            cScoreUpdate(cPlayer4, "4")
        }
        if (props.cardValue === "D") {
            dScoreUpdate(cPlayer1, "1")
            dScoreUpdate(cPlayer2, "2")
            dScoreUpdate(cPlayer3, "3")
            dScoreUpdate(cPlayer4, "4") 
        }
    },[cPlayer1,cPlayer2,cPlayer3,cPlayer4])
    
    //fucntion called by useEffect is cPlayer1 changes, it calculates score and passes it to scoreStateChange which sets cScore state or dScore state
    function cScoreUpdate (player, strplayer) {
        let score = player[0] * 2 + player[1] * 5 + player[2] * 8;
        if (!player.includes(0)) {
            score += 3;
        }
        scoreStateChange(setCScore, strplayer, score);
    }
    function dScoreUpdate (player, strPlayer) {
        let score = player[0] * 5 + player[1] * 8 + player[2] * 13;
        scoreStateChange(setDScore, strPlayer, score);
    }

    //function that edits num in score array corresponding to player number
    function scoreStateChange (setScoreState, playernum, score) {
        switch (playernum) {
            case "1":
                setScoreState (prevState => [score, prevState[1], prevState[2], prevState[3]])
                break;
            case "2":
                setScoreState (prevState => [prevState[0], score, prevState[2], prevState[3]])
                break;
            case "3":
                setScoreState (prevState => [prevState[0], prevState[1], score, prevState[3]])
                break;
            case "4":
                setScoreState (prevState => [prevState[0], prevState[1], prevState[2], score])
                break;
        }
    }

    //eventhandler for changes in inputs 
    function handleChange (e) {
        //calculates score for the bear A card, passes it to scoreStateChange which will set aScore state
        if (props.cardValue === "A"){
            const playerAndGroup = e.target.name.split('%')
            let score = 0;
            console.log(playerAndGroup[0].slice(-1))
            switch (e.target.value) {
                case "1":
                    score = 4;
                    break;
                case '2':
                    score = 11;
                    break;
                case '3':
                    score = 19;
                    break;
                case '4':
                    score = 27;
                    break;
            }
            scoreStateChange(setAScore, playerAndGroup[0].slice(-1), score)  
        }

        //calculates score for the bear B card, passes it to scoreStateChange which will set bScore state
        if (props.cardValue === "B"){
            const playerAndGroup = e.target.name.split('%')
            let score = parseInt(e.target.value) * 10;
            scoreStateChange(setBScore, playerAndGroup[0].slice(-1), score);
        }

        //DOES NOT CALCULATE POINTS instead edits cPlayer1-4 to reflect inputs, score is calculated by useEffect listening for changes
        if (props.cardValue === "C"){
            const playerAndGroup = e.target.name.split('%')

            //these statements edit cPlayer1 through 4 respectively, changing the array input to the new value
            if(playerAndGroup[1] === "smallGroups1") {
                switch (playerAndGroup[0]) {
                    case "player1":
                        setCPlayer1(prevState => ([e.target.value, prevState[1], prevState[2]]));                    
                        break;
                    case "player2":
                        setCPlayer2(prevState => ([e.target.value, prevState[1], prevState[2]]))
                        break;
                    case "player3":
                        setCPlayer3(prevState => ([e.target.value, prevState[1], prevState[2]]))
                        break;
                    case "player4":
                        setCPlayer4(prevState => ([e.target.value, prevState[1], prevState[2]]))
                }
            } 
            if (playerAndGroup[1] === "smallGroups2") {
                switch (playerAndGroup[0]) {
                    case "player1":
                        setCPlayer1(prevState => ([prevState[0] ,e.target.value, prevState[2]]))
                        break;
                    case "player2":
                        setCPlayer2(prevState => ([prevState[0], e.target.value, prevState[2]]))
                        break;
                    case "player3":
                        setCPlayer3(prevState => ([prevState[0], e.target.value, prevState[2]]))
                        break;
                    case "player4":
                        setCPlayer4(prevState => ([prevState[0], e.target.value, prevState[2]]))
                        break;
                }
            }  
            if (playerAndGroup[1] === "smallGroups3") {
                switch (playerAndGroup[0]) {
                    case "player1":
                        setCPlayer1(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                    case "player2":
                        setCPlayer2(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                    case "player3":
                        setCPlayer3(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                    case "player4":
                        setCPlayer4(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                }
            }              

        }
        //works same as C, does not calculate instead palms it off to useEffect
        if (props.cardValue === "D"){
            const playerAndGroup = e.target.name.split('%')
            //these statements edit cPlayer1 through 4 respectively, changing the array input to the new value
            if(playerAndGroup[1] === "bigGroups2") {
                switch (playerAndGroup[0]) {
                    case "player1":
                        setCPlayer1(prevState => ([e.target.value, prevState[1], prevState[2]]));                    
                        break;
                    case "player2":
                        setCPlayer2(prevState => ([e.target.value, prevState[1], prevState[2]]))
                        break;
                    case "player3":
                        setCPlayer3(prevState => ([e.target.value, prevState[1], prevState[2]]))
                        break;
                    case "player4":
                        setCPlayer4(prevState => ([e.target.value, prevState[1], prevState[2]]))
                }
            } 
            if (playerAndGroup[1] === "bigGroups3") {
                switch (playerAndGroup[0]) {
                    case "player1":
                        setCPlayer1(prevState => ([prevState[0] ,e.target.value, prevState[2]]))
                        break;
                    case "player2":
                        setCPlayer2(prevState => ([prevState[0], e.target.value, prevState[2]]))
                        break;
                    case "player3":
                        setCPlayer3(prevState => ([prevState[0], e.target.value, prevState[2]]))
                        break;
                    case "player4":
                        setCPlayer4(prevState => ([prevState[0], e.target.value, prevState[2]]))
                        break;
                }
            }  
            if (playerAndGroup[1] === "bigGroups4") {
                switch (playerAndGroup[0]) {
                    case "player1":
                        setCPlayer1(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                    case "player2":
                        setCPlayer2(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                    case "player3":
                        setCPlayer3(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                    case "player4":
                        setCPlayer4(prevState => ([prevState[0], prevState[1], e.target.value]))
                        break;
                }
            }
   
        }
    }


    return (
        <div>
            <div class = "animal-box" id = "bear-box">
                <Bear player = "player1" card={props.cardValue} onChange = {handleChange} />
                {props.playerCount >= 2 && <Bear player = "player2" card={props.cardValue}  onChange = {handleChange} />}
                {props.playerCount >= 3 && <Bear player = "player3" card={props.cardValue}  onChange = {handleChange} />}
                {props.playerCount >= 4 && <Bear player = "player4" card={props.cardValue}  onChange = {handleChange} />}
            </div>
        </div>
    )

}

//component used for conditional rendering. depending on card passed as prop will render A, B, C, or D.
//name is set as playernum%scoregroup for use in event handler. by splitting on % can have array of strings, first is player, second is group
function Bear (props) {
    return(
        <span>
            {props.card === "A" &&
                <div class = "box-column">
                    <p>How many pairs of bears for {props.player}?</p>
                    
                    <select className="animal-select" name= {props.player + "%bearpairs"} id="bearpairs" onChange = {props.onChange}>
                        <option value={0}>No pairs</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        <option value={4}>Four plus</option>
                    </select>
                </div>}

            {props.card === "B" &&
                <div class = "box-column">
                    <p>How many groups of three for {props.player}?</p>
                        <input type = "number" 
                        name= {props.player + "%bearstrios"} 
                        id="beartrios" 
                        player = {props.player} 
                        onChange = {props.onChange}/>
                </div>}

            {props.card === "C" &&
                <div class = "box-column">
                    <p>Groups for {props.player}</p>
                        <label for = "smallGroups1">Groups of one</label>
                        <input type = "number" 
                        id ="smallGroups1" 
                        name = {props.player + "%smallGroups1"} 
                        onChange = {props.onChange}/><br/>

                        <label for = "smallGroups2">Groups of two</label>
                        <input type = "number" 
                        id ="smallGroups2" 
                        name = {props.player + "%smallGroups2"} 
                        player = {props.player}
                        onChange = {props.onChange}/><br/>

                        <label for = "smallGroups">Groups of three</label>
                        <input type = "number" 
                        id ="smallGroups3" 
                        name = {props.player + "%smallGroups3"}
                        player = {props.player}
                        onChange = {props.onChange}/><br/>
                </div>}

            {props.card === "D" &&
                <div class = "box-column">
                    <p>Groups for {props.player}</p>
                    <form>
                        <label for = "bigGroups2">Groups of two</label> <br/>
                        <input type = "number" 
                        id ="bigGroups2" 
                        name = {props.player +"%bigGroups2"} 
                        onChange = {props.onChange}/><br/>

                        <label for = "bigGroups3">Groups of three</label> <br/>
                        <input type = "number" 
                        id ="bigGroups3" 
                        name = {props.player + "%bigGroups3"} 
                        onChange = {props.onChange}/><br/>

                        <label for = "bigGroups4">Groups of four</label> <br/>
                        <input type = "number" 
                        id ="bigGroups4" 
                        name = {props.player + "%bigGroups4"} 
                        onChange = {props.onChange}/><br/>
                    </form>
                </div>}
        </span>
    )
}


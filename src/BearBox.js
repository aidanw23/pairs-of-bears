import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";

/*
BEARBOX COMPONENT
Bear box will be render 1 to 4 bear elements with inputs depending on card and player count set initially. 
Each box will handle score differently.
Score should be raised to parent level and tracked, possibly in side sheet?

*/

export function BearSet (props) {
    const [AState, setAState] = useState([0,0,0,0])

    const [BState, setBState] = useState([0,0,0,0])

    const [cPlayer1, setCPlayer1] = useState([0,0,0]);
    const [cPlayer2, setCPlayer2] = useState([0,0,0]);
    const [cPlayer3, setCPlayer3] = useState([0,0,0]);
    const [cPlayer4, setCPlayer4] = useState([0,0,0]);

    const [DState, setDState] = useState([0,0,0,0])

    useEffect (() => {
        //console.log("bears changed")
    });

    function handleChange (e) {
        //calculates score for the bear A card, passes it to handleScoreChange in ScoreBoard with player and score
        if (props.cardValue === "A"){
            const playerAndGroup = e.target.name.split('%')
            let score = 0;

            console.log(typeof e.target.value)
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

            setAState(score)
        }

        // NOT FINISHED INPUTS ARE WRONG IN COMPONENT NEEDS NUMBER INPUT
        if (props.cardValue === "B"){
            const playerAndGroup = e.target.name.split('%')
            let score = parseInt(e.target.value) * 10;
            console.log(`${playerAndGroup[0]} scored ${score} for ${e.target.value} A bears`);
            props.onScoreChange (playerAndGroup[0], score);
        }

        //NOT FINISHED FUCKING BONUS POINTS
        if (props.cardValue === "C"){
            const playerAndGroup = e.target.name.split('%')
            let score = 0;

            //this stuff is all for affecting the cPlayer states for keeping track for the bonus 3 points
            if(playerAndGroup[1] === "smallGroups1") {
                score += parseInt(e.target.value) * 2;
                switch (playerAndGroup[0]) {
                    case "player1":
                        setCPlayer1(prevState => ([e.target.value, prevState[1], prevState[2]]))
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
                score += parseInt(e.target.value) * 5;
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
                score += parseInt(e.target.value) * 8;
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
            console.log(score)
            props.onScoreChange (playerAndGroup[0], score)
        }

        //NOT FINISHED
        if (props.cardValue === "D"){
            console.log(`e.target.value is ${e.target.value}`)
            console.log(`e.target.name is ${e.target.name}`)
        }
    }

    return (
        <div>
            <p>cstate: {cPlayer1} {cPlayer2} {cPlayer3} {cPlayer4}</p>
            <Bear player = "player1" card={props.cardValue} onChange = {handleChange} />
            {props.playerCount >= 2 && <Bear player = "player2" card={props.cardValue}  onChange = {handleChange}/>}
            {props.playerCount >= 3 && <Bear player = "player3" card={props.cardValue}  onChange = {handleChange}/>}
            {props.playerCount >= 4 && <Bear player = "player4" card={props.cardValue}  onChange = {handleChange}/>}
            <input type ="submit" value ="Score Bears"></input>
        </div>
    )

}

function Bear (props) {
    return(
        <span>
            {props.card === "A" &&
                <div>
                    <p>How many pairs of bears for {props.player}?</p>
                    <select name="bearpairs" id="bearpairs" onChange = {props.onChange}>
                        <option value={0}>No pairs</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        <option value={4}>Four +</option>
                    </select>
                </div>}

            {props.card === "B" &&
                <div>
                    <p>How many groups of three for {props.player}?</p>
                    <select name="bearstrios" id="beartrios" player = {props.player} onChange = {props.onChange}>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                        <option value={4}>Four +</option>
                    </select>
                </div>}

            {props.card === "C" &&
                <div>
                    <p>Groups for {props.player}</p>
                    <form player = {props.player}>
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
                    </form>
                </div>}

            {props.card === "D" &&
                <div>
                    <p>Groups for {props.player}</p>
                    <form>
                        <label for = "bigGroups2">Groups of two</label>
                        <input type = "number" 
                        id ="bigGroups2" 
                        name = "bigGroups2" 
                        onChange = {props.onChange}/><br/>

                        <label for = "bigGroups3">Groups of three</label>
                        <input type = "number" 
                        id ="bigGroups3" 
                        name = "bigGroups3" 
                        onChange = {props.onChange}/><br/>

                        <label for = "bigGroups4">Groups of four</label>
                        <input type = "number" 
                        id ="bigGroups4" 
                        name = "bigGroups4" 
                        onChange = {props.onChange}/><br/>
                    </form>
                </div>}
        </span>
    )
}


import React, { useEffect, useState } from "react";

/*
ELKSET COMPONENT
Elk set renders 1-4 number inputs depending on player count. 
Number input renders input value amount of select inputs, value of these is then stored in object.
Object values are passed to value change function which uses switchcase to work out scores.
useEffect listens for changes in scores and then passes it to parent scoreboard.

this layout is so much better than bears, possible rework bears?

*/

export function ElkSet (props) {
    const [aScore, setAScore] = useState([0,0,0,0])

    useEffect(() => {
        props.onScoreChange(aScore);
    },[aScore])

    function valueChange(elkLengths, player) {
        //console.log(`array ${elkLengths} passed to onValueChange for ${player}`)
        let score = 0;

        //functions to calculate score based on array passed of lengths of elk groups
        //A and B score the same and both have 4 options and have been grouped
        if (props.cardValue === "A" || props.cardValue === "B") {
            for (let group of elkLengths) {
                switch (group) {
                    case "1":
                        score += 2;
                        break;
                    case "2":
                        score += 5;
                        break;
                    case "3":
                        score += 9;
                        break;
                    case "4":
                        score += 14
                }
            }
        }
        if (props.cardValue === "C") {
            for (let group of elkLengths) {
                switch (group) {
                    case "1":
                        score += 2;
                        break;
                    case "2":
                        score += 4;
                        break;
                    case "3":
                        score += 7;
                        break;
                    case "4":
                        score += 10;
                        break;
                    case "5":
                        score += 14;
                        break;
                    case "6":
                        score += 18;
                        break;
                    case "7":
                        score += 23;
                        break;
                    case "8":
                        score += 28;   
                }
            }
        }
        if (props.cardValue === "D") {
            for (let group of elkLengths) {
                switch (group) {
                    case "1":
                        score += 2;
                        break;
                    case "2":
                        score += 5;
                        break;
                    case "3":
                        score += 8;
                        break;
                    case "4":
                        score += 12;
                        break;
                    case "5":
                        score += 16;
                        break;
                    case "6":
                        score += 21;
                }
            }
        }

        //switchcase to add score to score array, position in array correlates to player
        switch (player) {
            case "player1":
                setAScore (prevState => [score, prevState[1], prevState[2], prevState[3]])
                break;
            case "player2":
                setAScore (prevState => [prevState[0], score, prevState[2], prevState[3]])
                break;
            case "player3":
                setAScore (prevState => [prevState[0], prevState[1], score, prevState[3]])
                break;
            case "player4":
                setAScore (prevState => [prevState[0], prevState[1], prevState[2], score])
        }

    }

    return(
        <div>
            <p>astate: {aScore}</p>
            <div class = "animal-box">
                <Elk player = "player1" card={props.cardValue} onChange = {valueChange} />
                {props.playerCount >= 2 && <Elk player = "player2" card={props.cardValue} onChange = {valueChange} /> }
                {props.playerCount >= 3 && <Elk player = "player3" card={props.cardValue} onChange = {valueChange} /> }
                {props.playerCount >= 4 && <Elk player = "player4" card={props.cardValue} onChange = {valueChange} /> }
            </div>
        </div>
    )
}

function Elk (props) {
    //line state is used to conditionally render no. of inputs boxes
    //elklengths is object that stores value of inputs as value with key being no. assigned to input in for loop
    const [lines, setLines] = useState()
    const [elkLengths, setElkLengths] = useState({})

    //hook to pass length to parent if elklength changes
    useEffect (() => {
        props.onChange(Object.values(elkLengths), props.player)
    }, [elkLengths])

    //event handler that uses input value to overwrite object value relating to key from input.
    function onLengthChange (e) {
        const splitName = e.target.name.split("%")
        setElkLengths(prevState => ({...prevState, [splitName[2]]: e.target.value }))
    }
    
    //array of input options that conditionally render depending on card
    const boxes = [];
    for (let i=1; i <= lines; i++){
        boxes.push(
        <select key = {"elklength" + i} defaultValue ={0} name = {props.player + "%length%" + i} onChange = {onLengthChange}>
            <option disabled selected value = {0}>---</option>
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            {(props.card === "C" || props.card === "D") && <option value={5}>Five</option>}
            {(props.card === "C" || props.card === "D") && <option value={6}>Six</option>}
            {props.card === "C" && <option value={7}>Seven</option>}
            {props.card === "C" && <option value={8}>Eight</option>}
        </select>)
    }

    return (
        <span>
            {props.card === "A" &&
            <div className = "box-column">
                <p>How many lines of elk for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%lines"}
                id = "elklines"
                player = {props.player}
                onChange = {(e) => setLines(e.target.value)}/>
                <p>Line lengths:</p>
                {boxes}
            </div>}

            {props.card === "B" &&
            <div className = "box-column">
                <p>How many formations of elk for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%formations"}
                id = "elkformations"
                player = {props.player}
                onChange = {(e) => setLines(e.target.value)}/>
                <p>Formation size:</p>
                {boxes}
            </div>}

            {props.card === "C" &&
            <div className = "box-column">
                <p>How many herds of elk for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%herds"}
                id = "elkherds"
                player = {props.player}
                onChange = {(e) => setLines(e.target.value)}/>
                <p>Herd size:</p>
                {boxes}
            </div>}

            {props.card === "D" &&
            <div className = "box-column">
                <p>How many rings of elk for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%rings"}
                id = "elkrings"
                player = {props.player}
                onChange = {(e) => setLines(e.target.value)}/>
                <p>Ring size:</p>
                {boxes}
            </div>}
        </span>
    )
}

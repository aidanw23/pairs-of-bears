import React, {useEffect, useState } from "react";

export function SalmonSet (props) {
    const [score, setScore] = useState([0,0,0,0])

    useEffect (() => {
        props.onScoreChange (score);
    },[score])

    function valueChange (salmonLengths, player) {
        //console.log(`array ${salmonLengths} passed to onValueChange for ${player}`)
        let score = 0;

        if (props.cardValue === "A") {
            for (let group of salmonLengths) {
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
                        score += 20;
                        break;
                    case "7":
                        score += 25;
                }
            }
        }

        if (props.cardValue === "B") {
            for (let group of salmonLengths) {
                switch (group) {
                    case "1":
                        score += 2;
                        break;
                    case "2":
                        score += 4;
                        break;
                    case "3":
                        score += 9;
                        break;
                    case "4":
                        score += 11;
                        break;
                    case "5":
                        score += 17;
                }
            }
        }

        if (props.cardValue === "C") {
            for (let group of salmonLengths) {
                switch (group) {
                    case "3":
                        score += 10;
                        break;
                    case "4":
                        score += 12;
                        break;
                    case "5":
                        score += 15;
                }
            }
        }

        if (props.cardValue === "D") {
            for (let group of salmonLengths) {
                score += parseInt(group);
            }
        }

        //switchcase to add score to score array, position in array correlates to player
        switch (player) {
            case "player1":
                setScore (prevState => [score, prevState[1], prevState[2], prevState[3]])
                break;
            case "player2":
                setScore (prevState => [prevState[0], score, prevState[2], prevState[3]])
                break;
            case "player3":
                setScore (prevState => [prevState[0], prevState[1], score, prevState[3]])
                break;
            case "player4":
                setScore (prevState => [prevState[0], prevState[1], prevState[2], score])
        }
    }    

    return (
        <div>
            <p>card is: {props.cardValue}</p>
            <p>score: {score}</p>
            <div className = "animal-box">
                <Salmon player = "player1" card={props.cardValue} onChange = {valueChange} />
                {props.playerCount >= 2 && <Salmon player = "player2" card={props.cardValue} onChange = {valueChange} /> }
                {props.playerCount >= 3 && <Salmon player = "player3" card={props.cardValue} onChange = {valueChange} /> }
                {props.playerCount >= 4 && <Salmon player = "player4" card={props.cardValue} onChange = {valueChange} /> }
            </div>
        </div>
    )
}

function Salmon (props) {
    const [runs, setRuns] = useState()
    const [salmonLengths, setSalmonLengths] = useState({})

    useEffect (() => {
        props.onChange(Object.values(salmonLengths), props.player)
    }, [salmonLengths])

    function onLengthChange(e) {
        const splitName = e.target.name.split("%")
        setSalmonLengths(prevState => ({...prevState, [splitName[2]]: e.target.value}))
    }

    const boxes=[];
    for (let i=1; i <= runs; i++) {
        boxes.push(
            <select key = {"salmonlength" + i} defaultValue ={0} name={props.player + "%length%" + i} onChange = {onLengthChange}>
                <option disabled value ={0}>---</option>
                {props.card !== "C" && <option value={1}>One</option>}
                {props.card !== "C" && <option value={2}>Two</option>}
                <option value={3}>Three</option>
                <option value={4}>Four</option>
                <option value={5}>Five {(props.card === "B" || props.card === "C" && "or more")}</option>
                {props.card === "A" && <option value={6}>Six</option>}
                {props.card === "A" && <option value={7}>Seven or more</option>}
            </select>
        )
    }

    const adjacents=[];
    for (let i=1; i<=runs; i++) {
        adjacents.push(
            <div>
                <p>No. of salmon:</p>
                <input type = "number"
                key = {"count" + i}
                name = {props.player + "%salmon%" + "s" + i}
                id = "salmonsurrounded"
                onChange = {onLengthChange} />
                <p>No. of adjacent:</p>
                <input type = "number"
                key = {"adjacent" + i}
                name = {props.player + "%adjacent%" +"a" + i}
                id = "salmonsurrounded"
                onChange = {onLengthChange} />
            </div>
        )
    }

    return (
        <span>
            {props.card === "A" &&
            <div className = "box-column">
                <p>How many runs of salmon for {props.player}?</p>
                <input type = "number"
                key = {props.player + "%longruns"}
                name = {props.player + "%longruns"}
                id = "salmonlongruns"
                player = {props.player}
                onChange = {(e) => setRuns(e.target.value)}/>
                <p>Run lengths:</p>
                {boxes}
            </div>}

            {props.card === "B" &&
            <div className = "box-column">
                <p>How many runs of salmon for {props.player}?</p>
                <input type = "number"
                key = {props.player + "%shortruns"}
                name = {props.player + "%shortruns"}
                id = "salmonshortruns"
                player = {props.player}
                onChange = {(e) => setRuns(e.target.value)}/>
                <p>Run lengths:</p>
                {boxes}
            </div>}

            {props.card === "C" &&
            <div className = "box-column">
                <p>How many runs of salmon for {props.player}?</p>
                <input type = "number"
                key = {props.player + "%families"}
                name = {props.player + "%families"}
                id = "salmonfamilies"
                player = {props.player}
                onChange = {(e) => setRuns(e.target.value)}/>
                <p>Run lengths:</p>
                {boxes}
            </div>}

            {props.card === "D" &&
            <div className = "box-column">
                <p>How many runs of surrounded salmon for {props.player}?</p>
                <input type = "number"
                key = {props.player + "%surrounded"}
                name = {props.player + "%surrounded"}
                id = "salmonsurrounded"
                player = {props.player}
                onChange = {(e) => setRuns(e.target.value)}/>
                {adjacents}
            </div>}
        </span>
    )
}
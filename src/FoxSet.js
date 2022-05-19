import React, { useEffect, useState } from "react";

export function FoxSet (props) {
    const [score, setScore] = useState([0,0,0,0])

    useEffect (() => {
        props.onScoreChange(score);
    },[score])

    function valueChange (foxGroups, player) {
        //console.log(`FOX array ${foxGroups} passed for ${player}`)
        let score = 0;

        //if scoring bits
        if (props.cardValue === "A" || props.cardValue === "C") {
            for (let group of foxGroups) {
                console.log(group)
                switch (group) {
                    case "1":
                        score += 1;
                        break;
                    case "2":
                        score += 2;
                        break;
                    case "3":
                        score += 3;
                        break;
                    case "4":
                        score += 4;
                        break;
                    case "5":
                        score += 5;
                        break;
                    case "6":
                        score += 6;
                        break;
                }
            }
        }

        if (props.cardValue === "B") {
            for (let group of foxGroups) {
                switch (group) {
                    case "1":
                        score += 3;
                        break;
                    case "2":
                        score += 5;
                        break;
                    case "3":
                        score += 7;
                }
            }
        }

        if (props.cardValue === "D") {
            for (let group of foxGroups) {
                switch (group) {
                    case "1":
                        score += 5;
                        break;
                    case "2":
                        score += 7;
                        break;
                    case "3":
                        score += 9;
                        break;
                    case "4":
                        score += 11;
                }
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
            <p>score: {score}</p>
            <div className = "animal-box">
                <Fox player = "player1" card={props.cardValue} onChange = {valueChange} />
                {props.playerCount >= 2 && <Fox player = "player2" card={props.cardValue} onChange = {valueChange} />}
                {props.playerCount >= 3 && <Fox player = "player3" card={props.cardValue} onChange = {valueChange} />}
                {props.playerCount >= 4 && <Fox player = "player4" card={props.cardValue} onChange = {valueChange} />}
            </div>
        </div>
    )
}

function Fox (props) {
    const [groups, setGroups] = useState();
    const [foxGroups, setFoxGroups] = useState({});

    useEffect(() => {
        props.onChange(Object.values(foxGroups), props.player)
    },[foxGroups])

    function onSizeChange (e) {
        const splitName = e.target.name.split("%")
        setFoxGroups(prevState => ({...prevState, [splitName[2]]: e.target.value }))
    }

    const boxes = [];
    for (let i=1; i <= groups; i++) {
        boxes.push(
            <select key = {"foxsize" + i} defaultValue = {0} name = {props.player + "%size%" + i} onChange = {onSizeChange} >
                <option disabled value = {0}>---</option>
                <option value = {1}>One</option>
                <option value = {2}>Two</option>
                <option value = {3}>Three</option>
                {props.card !== "B" && <option value = {4}>Four</option>}
                {(props.card === "A" || props.card ==="C") && <option value = {5}>Five</option>}
                {props.card ==="C" && <option value = {6}>Six</option>}
            </select>
        )
    }

    return (
        <span>
            {props.card === "A" &&
            <div className = "box-column">
                <p>How many foxes for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%size"}
                id = "foxUnique"
                player = {props.player}
                onChange = {(e) => setGroups(e.target.value)}/>
                <p>Different nearby animals:</p>
                {boxes}
            </div>}

            {props.card === "B" &&
            <div className = "box-column">
                <p>How many foxes for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%size"}
                id = "foxPairs"
                player = {props.player}
                onChange = {(e) => setGroups(e.target.value)}/>
                <p>Different nearby pairs:</p>
                {boxes}
            </div>}

            {props.card === "C" &&
            <div className = "box-column">
                <p>How many foxes for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%size"}
                id = "foxNearbys"
                player = {props.player}
                onChange = {(e) => setGroups(e.target.value)}/>
                <p>No. of surrounding animal:</p>
                {boxes}
            </div>}

            {props.card === "D" &&
            <div className = "box-column">
                <p>How many pairs of foxes for {props.player}?</p>
                <input type = "number"
                name = {props.player + "%size"}
                id = "foxDuos"
                player = {props.player}
                onChange = {(e) => setGroups(e.target.value)}/>
                <p>No. of pairs around:</p>
                {boxes}
            </div>}
        </span>
    )
}
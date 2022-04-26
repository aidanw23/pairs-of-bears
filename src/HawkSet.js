import React, { useEffect, useState } from 'react';

export function HawkSet (props) {
    const [score, setScore] = useState([0,0,0,0])

    useEffect(() => {
        props.onScoreChange(score);
    },score)

    function valueChange (birdAmounts, player) {
        console.log(`BIRD array ${birdAmounts} passed to valueChange for ${player}, card ${props.cardValue}`)
        let score = 0;

        if (props.cardValue === "A") {
            for(let amount of birdAmounts) {
                switch (amount) {
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
                        score += 11;
                        break;
                    case "5":
                        score += 14;
                        break;
                    case "6":
                        score += 18;
                        break;
                    case "7":
                        score += 22;
                        break;
                    case "8":
                        score += 26;    
                }
            }
        }

        if (props.cardValue === "B") {
            for(let amount of birdAmounts) {
                console.log(typeof amount)
                switch (amount) {
                    case "2":
                        score += 5;
                        break;
                    case "3":
                        score += 9;
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
                        score += 24;
                        break;
                    case "8":
                        score += 28;    
                }
            }
        }

        if (props.cardValue === "C") {
            for(let amount of birdAmounts) {
                score = amount *3;
            }
        }

        if (props.cardValue === "D") {
            for (let amount of birdAmounts) {
                switch (amount) {
                    case "1":
                        score += 4;
                        break;
                    case "2":
                        score += 7;
                        break;
                    case "3":
                        score += 9;
                }
            }
        }
        
        
        console.log(`score should be ${score}`)
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
            <p>card is : {props.cardValue}</p>
            <p>score is: {score}</p>
            <div className = "animal-box">
                <Bird player = "player1" card = {props.cardValue} onChange = {valueChange} />
                {props.playerCount >= 2 && <Bird player = "player2" card = {props.cardValue} onChange = {valueChange} />}
                {props.playerCount >= 3 && <Bird player = "player3" card = {props.cardValue} onChange = {valueChange} />}
                {props.playerCount >= 4 && <Bird player = "player4" card = {props.cardValue} onChange = {valueChange} />}
            </div>
        </div>
    )
}

function Bird (props) {
    const [lines, setLines] = useState()
    const [birdAmounts, setBirdAmounts] = useState({})

    useEffect (() => {
        props.onChange(Object.values(birdAmounts), props.player)
    },[birdAmounts])

    function onAmountChange (e) {
        const splitName = e.target.name.split("%")
        setBirdAmounts(prevState => ({...prevState, [splitName[2]]: e.target.value}))
    }

    const boxes=[];
    for (let i=1; i<=lines; i++) {
        boxes.push(
           <select key = {"birdamount" + i} defaultValue = {0} name = {props.player + "%amount%" +i} onChange = {onAmountChange}>
               <option disabled value ={0}>---</option>
                <option value = {1}>One</option>
                <option value = {2}>Two</option>
                <option value = {3}>Three</option>
           </select>
        )
    }

    return (
        <span>
            {props.card === "A" &&
            <div className = "box-column">
                <p>How many solitary hawks for {props.player}?</p>
                <select name = {props.player + "%solitarybirds%a"} defaultValue={0} onChange = {onAmountChange}>
                    <option disabled value ={0}>---</option>
                    <option value = {1}>One</option>
                    <option value = {2}>Two</option>
                    <option value = {3}>Three</option>
                    <option value = {4}>Four</option>
                    <option value = {5}>Five</option>
                    <option value = {6}>Six</option>
                    <option value = {7}>Seven</option>
                    <option value = {8}>Eight or more</option>
                </select>
            </div>}

            {props.card === "B" &&
            <div className = "box-column">
                <p>How many hawks with line of sight for {props.player}?</p>
                <select name = {props.player + "%losbirds%b"} defaultValue={0} onChange = {onAmountChange}>
                    <option disabled value ={0}>---</option>
                    <option value = {2}>Two</option>
                    <option value = {3}>Three</option>
                    <option value = {4}>Four</option>
                    <option value = {5}>Five</option>
                    <option value = {6}>Six</option>
                    <option value = {7}>Seven</option>
                    <option value = {8}>Eight or more</option>
                </select>
            </div>}

            {props.card === "C" &&
            <div className = "box-column">
                <p>How many lines of sight for {props.player}?</p>
                <input type = "number"
                key = {props.player + "%network"}
                name = {props.player + "%network%c"}
                id = "birdnetwork"
                player = {props.player}
                onChange = {onAmountChange}/>
            </div>}

            {props.card === "D" &&
            <div className = "box-column">
                <p>How many hawk pairs for {props.player}?</p>
                <input type = "number"
                key = {props.player + "%territorial"}
                name = {props.player + "%territorial"}
                id = "birdterritorial"
                player = {props.player}
                onChange = {(e) => setLines(e.target.value)} /> <br />
                <p>No. of unique animals between:</p>
                {boxes}
            </div>}
        </span>
    )
}
import React , {useEffect , useState } from 'react';

//BUGS: when turning down player count scores from players above new count still exist

// need to do: two player bonus
//  input change for environ boxes
//  score changer for the environset that will update in scoreboard

export function EnvironSet (props) {
    const [score, setScore]  = useState({"mountains": [0,0,0,0], "forests": [0,0,0,0], "prairies": [0,0,0,0], "wetlands": [0,0,0,0], "rivers": [0,0,0,0]})
    const [total, setTotal] = useState([0,0,0,0])

    useEffect (() => {
        props.onTotalChange(total,score)
    }, [total])

    useEffect(() => {
        setScore({"mountains": [0,0,0,0], "forests": [0,0,0,0], "prairies": [0,0,0,0], "wetlands": [0,0,0,0], "rivers": [0,0,0,0]})
    },[props.playerCount])

    function confirmTotal () {
        const scoreArrs = Object.values(score)
        const totals = [0,0,0,0]
        for (let group of scoreArrs) {
            if (props.playerCount >= 1) {
                totals[0] += parseInt(group[0])
            }
            if (props.playerCount >= 2) {
                totals[1] += parseInt(group[1])
            }  
            if (props.playerCount >= 3) {
                totals[2] += parseInt(group[2])
            } 
            if (props.playerCount == 4) {
                totals[3] += parseInt(group[3])
            } 
        }
        console.log(`totals is ${totals}`)
        for (let num of totals) {
            console.log(typeof num)
        }
        setTotal(totals)
    }

    function scoreChange (name, score) {
        //console.log(`set score change ${name}: ${JSON.stringify(score)}`)
        setScore (prevState => ({...prevState, [name]: score}))
    }

    const mountains = score.mountains
    return (
        <div>
            <p>mountains: {mountains}</p>
            <p>forests: {score.forests}</p>
            <p>prairies: {score.prairies}</p>
            <p>wetlands: {score.wetlands}</p>
            <p>rivers: {score.rivers}</p>
            <Environ playerCount = {props.playerCount}
            name = "mountains"
            onScoreChange = {scoreChange} />
            <Environ playerCount = {props.playerCount}
            name = "forests"
            onScoreChange = {scoreChange} />
            <Environ playerCount = {props.playerCount}
            name = "prairies"
            onScoreChange = {scoreChange} />
            <Environ playerCount = {props.playerCount}
            name = "wetlands"
            onScoreChange = {scoreChange} />
            <Environ playerCount = {props.playerCount}
            name = "rivers"
            onScoreChange = {scoreChange} />
            <button onClick = {confirmTotal}>Total</button>
        </div>
    )
}




function Environ (props) {
    const [score, setScore] = useState([])
    const [environ, setEnviron] = useState({[`${props.name}1`]:0, [`${props.name}2`]:0,[`${props.name}3`]:0, [`${props.name}4`]:0})

    //when environ changes, uses functions to calculate bonus points depending on playercount
    //and these functions set the score
    useEffect(() => {
        if(props.playerCount === "1") {
            soloBonus()
        }
        if (props.playerCount === "2") {
            twoPlayerBonus()
        }
        if (props.playerCount >= "3") {
            threeOrFourBonus()
        }
    },[environ])

    //on score change updates score into parent EnvironSet
    useEffect (() => {
        //console.log(`environ ${props.name} sending score ${JSON.stringify(score)}`)
        props.onScoreChange(props.name, score)
    }, [score])

    //function to caculate bonus points if a player is solo, called in useEffect for environs if player count is 1
    function soloBonus () {
        const environArr = Object.entries(environ)
        const key = environArr[0][0]
        const value = parseInt(environArr[0][1])
        if (value >= 7) {
            console.log(`${key} : ${value} `)
            setScore([value + 2],0,0,0)
        } else {
            console.log(`${key} : ${value} `)
            setScore([value],0,0,0)
        }       
    }

    //function to caculate bonus points in a twoplayer game, called in useEffect for environs if player count is 2
    function twoPlayerBonus () {
        let environs = Object.entries(environ)

        environs.sort(function(a,b) {
            return b[1] - a[1]
        })
    
        const first = [environs[0][0], parseInt(environs[0][1])]
        const second = [environs[1][0], parseInt(environs[1][1])]

        if (first[1] === second [1]) {
            environs[0][1] = parseInt(environs[0][1]) + 1
            environs[1][1] = parseInt(environs[1][1]) +1
        } else {
            environs[0][1] = parseInt(environs[0][1]) + 2
        }

        environs.sort(function(a,b) {
            const nameA = a[0].toUpperCase();
            const nameB = b[0].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        })

        setScore([environs[0][1], environs[1][1],0,0])
    }

    function threeOrFourBonus () {
        let environs = Object.entries(environ)

        environs.sort(function(a,b) {
            return b[1] - a[1]
        })
    
        const first = environs[0]
        const second = environs[1]
        const third = environs[2]
        const fourth = (environs.length === 4 ? environs[3] : [0,0])
    
        if(first[1] !== second[1]) {
            environs[0][1] = parseInt(environs[0][1]) + 3
            if (second[1] !== third[1]){
                environs[1][1] = parseInt(environs[1][1]) + 1
            }
        } else if (first[1] === second[1] && second[1] !== third[1]) {
            environs [0][1] = parseInt(environs [0][1]) + 2
            environs [1][1] = parseInt(environs [1][1]) + 2
        } else if (first[1] === second[1] && second[1] === third[1]){
            if(third[1] === fourth[1]) {
                environs[3][1] = parseInt(environs[3][1]) + 1
            }
            environs [0][1] = parseInt(environs [0][1]) + 1
            environs [1][1] = parseInt(environs [1][1]) + 1
            environs [2][1] = parseInt(environs [2][1]) + 1
        }

        environs.sort(function(a,b) {
            const nameA = a[0].toUpperCase();
            const nameB = b[0].toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
        })

        //console.log(`three/four player bonus, with ${environs}`)
        
        environs.length === 4 ? 
            setScore ([environs[0][1], environs[1][1], environs[2][1], environs[3][1]]) :
            setScore ([environs[0][1], environs[1][1], environs[2][1],0])
    }

    function environChange(e){
        setEnviron(prevState => ({...prevState, [e.target.name] : e.target.value }))
    }

    return (
        <div>
            <p>{props.name}</p>
            <input type = "number"
            name = {props.name + "1"}
            onChange =  {environChange}
            defaultValue = {0} />
            {props.playerCount >= 2 && 
            <input type = "number"
            name = {props.name + "2"} 
            onChange =  {environChange} 
            defaultValue = {0} />}
            {props.playerCount >= 3 && 
            <input type = "number"
            name = {props.name + "3"} 
            onChange =  {environChange} 
            defaultValue = {0} />}
            {props.playerCount >= 4 && 
            <input type = "number"
            name = {props.name + "4"} 
            onChange =  {environChange}
            defaultValue = {0} />}
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { BearSet } from './BearBox';
import { ElkSet } from './ElkSet';

export function ScoreBoard (props) {

    //const [totals, setTotals] = useState ({player1: 0, player2: 0, player3: 0, player4: 0});
    
    const [bears, setBears ] = useState ([]);
    const [elk, setElk] = useState ([]);



    //TODO should I be passsing setBears a func? maybe? it works so idk maybe just leave it
    function handleBearChange (score) {
        setBears ([score[0], score[1], score[2], score[3]]);
    }

    function handleElkChange (score) {
        setElk ([score[0], score[1], score[2], score[3]]);
    }

    return (
        <div>
            <h1>Aidans Scoreboard of Sadness</h1>
            <p>P1 bears: {bears[0]} P2 bears: {bears[1]} P3 bears: {bears[2]} P4 bears: {bears[3]}</p>
            <p>P1 elk: {elk[0]} P2 elk: {elk[1]} P3 elk: {elk[2]} P4 elk: {elk[3]}</p>
            <h1>Bear-ea</h1>
            <div key =  {"Bear" + props.bears}>           
                <BearSet 
                playerCount = {props.players} 
                cardValue = {props.bears} 
                onScoreChange = {handleBearChange} />            
            </div>
            <h1>Elk area</h1>
            <div key = {"Elk" + props.elk} >
                <ElkSet
                playerCount = {props.players}
                cardValue = {props.elk}
                onScoreChange = {handleElkChange} />
            </div>
        </div>
    )
    
}
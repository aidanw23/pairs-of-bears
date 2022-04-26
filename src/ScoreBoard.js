import React, { useState, useEffect } from 'react';
import { BearSet } from './BearBox';
import { ElkSet } from './ElkSet';
import { SalmonSet } from './SalmonSet';
import { HawkSet } from './HawkSet'
import { FoxSet } from './FoxSet';

export function ScoreBoard (props) {

    //const [totals, setTotals] = useState ({player1: 0, player2: 0, player3: 0, player4: 0});
    
    const [bears, setBears ] = useState ([]);
    const [elk, setElk] = useState ([]);
    const [salmon, setSalmon] = useState ([]);
    const [birds, setBirds] = useState ([]);
    const [foxes, setFoxes] = useState ([]);

    //TODO should I be passsing setBears a func? maybe? it works so idk maybe just leave it
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

    return (
        <div>
            <h1>Aidans Scoreboard of Sadness</h1>
            <p>P1 bears: {bears[0]} P2 bears: {bears[1]} P3 bears: {bears[2]} P4 bears: {bears[3]}</p>
            <p>P1 elk: {elk[0]} P2 elk: {elk[1]} P3 elk: {elk[2]} P4 elk: {elk[3]}</p>
            <p>P1 salmon: {salmon[0]} P2 salmon: {salmon[1]} P3 salmon: {salmon[2]} P4 salmon: {salmon[3]}</p>
            <p>P1 birds: {birds[0]} P2 birds: {birds[1]} P3 birds: {birds[2]} P4 birds: {birds[3]}</p>
            <h1>Bear-ea</h1>
            <div key =  {"Bear" + props.bears} class= "page-section">           
                <BearSet 
                playerCount = {props.players} 
                cardValue = {props.bears} 
                onScoreChange = {handleBearChange} />            
            </div>
            <h1>Elk area</h1>
            <div key = {"Elk" + props.elk} class= "page-section">
                <ElkSet
                playerCount = {props.players}
                cardValue = {props.elk}
                onScoreChange = {handleElkChange} />
            </div>
            <h1>Salmon Zone</h1>
            <div key = {"Salmon" + props.salmon} class = "page-section">
                <SalmonSet 
                playerCount = {props.players}
                cardValue = {props.salmon}
                onScoreChange = {handleSalmonChange} />
            </div>
            <h1>CA CAW</h1>
            <div key = {"Hawk" + props.birds} class = "page-section">
                <HawkSet 
                playerCount = {props.players}
                cardValue = {props.birds}
                onScoreChange = {handleBirdChange} />

            </div>
            <h1>Foxes</h1>
            <div key = {"Fox" + props.foxes} class = "page-section">
                <FoxSet
                playerCount ={props.players} 
                cardValue = {props.foxes} 
                onScoreChange = {handleFoxChange} />
            </div>
        </div>
    )
    
}
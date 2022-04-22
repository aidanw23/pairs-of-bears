import React from 'react';
import { BearSet } from './BearBox';

export class ScoreBoard extends React.Component {
    constructor (props) {
        super (props)
        this.handleBearChange = this.handleBearChange.bind(this);
        this.state = {
        totals: {player1: 0, player2: 0, player3: 0, player4: 0},
        bears: {p1bears: 0, p2bears: 0, p3bears: 0, p4bears: 0}
        }
    }


    handleBearChange (score) {
        console.log(`Scoreboard - bears now ${score}`)
        this.setState( prevState =>
            ({...prevState, bears: {p1bears: score[0], p2bears: score[1], p3bears: score[2], p4bears: score[3] }}))
    }

    render () {
        return (
            <div>
                <h1>Aidans Scoreboard of Sadness</h1>
                
                <p>Player 1's score is : {this.state.player1}    Player 2's score is : {this.state.player2}    Player 3's score is : {this.state.player3}    Player 4's score is : {this.state.player4}</p>               
                <h1>Bear-ea</h1>
            
                <div key = {this.props.bears}>
                <p>P1 bears: {this.state.bears.p1bears} P2 bears: {this.state.bears.p2bears} P3 bears: {this.state.bears.p3bears} P4 bears: {this.state.bears.p4bears}</p>
                    <BearSet 
                    playerCount = {this.props.players} 
                    cardValue = {this.props.bears} 
                    onScoreChange = {this.handleBearChange} />            
                </div>
            </div>
        )
    }
}
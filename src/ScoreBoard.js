import React from 'react';
import { BearSet } from './BearBox';

export class ScoreBoard extends React.Component {
    constructor (props) {
        super (props)
        this.handleScoreChange = this.handleScoreChange.bind(this);
        this.state = {player1: 0, player2: 0, player3: 0, player4: 0,
        p1bears: 0, p2bears: 0, p3bears: 0, p4bears: 0}
    }

    handleScoreChange (player, score) {
        console.log(`Scoreboard - player ${player} got ${score}`)
        this.setState( prevState =>
            ({...prevState, [player]: score}))
    }

    render () {
        return (
            <div>
                <div>
                    <h1>Aidans Scoreboard of Sadness</h1>
                    <p>Player 1's score is : {this.state.player1}</p>
                    <p>Player 2's score is : {this.state.player2}</p>
                    <p>Player 3's score is : {this.state.player3}</p>
                    <p>Player 4's score is : {this.state.player4}</p>
                </div>
                <div>
                    <h1>Bear-ea</h1>
                    <BearSet 
                    playerCount = {this.props.players} 
                    cardValue = {this.props.bears} 
                    onScoreChange = {this.handleScoreChange} />
                </div>
            </div>
        )
    }
}
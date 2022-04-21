import './App.css';
import { PlayerSelector, CardSelector } from './Setup'
import { BearSet } from './BearBox';
import {ScoreBoard} from './ScoreBoard'
import React from 'react';

class App extends React.Component {
  constructor (props){
    super(props);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.state = {playerCount: 1, 
      bears: "A", elk: "A", salmon: "A", birds: "A" , foxes:"A"}
  }

  handlePlayerChange(players) {
    this.setState( prevState => ({...prevState, playerCount: players}))
  }

  handleCardChange(name, value) {
    this.setState( prevState => ({...prevState, [name] : value }))
  }

  

  render() {
    const players = this.state.playerCount;
    const bearVal = this.state.bears;
    const elkVal = this.state.elk;
    const salmonVal = this.state.salmon;
    const birdVal = this.state.birds;
    const foxVal = this.state.foxes;
    return (
      <div className="App">
        <div id = "AidansStateTracker">
          <h1>Aidans State Box of Safety</h1>
          <p>
            Player Count is set to: {this.state.playerCount}
          </p>
          <p>
            Bear card is set to: {this.state.bears}
          </p>
          <p>
            Elk card is set to: {this.state.elk}
          </p>
          <p>
            Salmon card is set to: {this.state.salmon}
          </p>
          <p>
            Hawk card is set to: {this.state.birds}
          </p>
          <p>
            Fox card is set to: {this.state.foxes}
          </p>
        </div>
        <div id="SetupBox">
          <h1>Setup Box</h1>
          <PlayerSelector players={players} onPlayerChange={this.handlePlayerChange} />
          <CardSelector cardValue = {bearVal} onCardChange = {this.handleCardChange} name = "bears" />
          <CardSelector cardValue = {elkVal} onCardChange = {this.handleCardChange} name = "elk" />
          <CardSelector cardValue = {salmonVal} onCardChange = {this.handleCardChange} name = "salmon" />
          <CardSelector cardValue = {birdVal} onCardChange = {this.handleCardChange} name = "birds" />
          <CardSelector cardValue = {foxVal} onCardChange = {this.handleCardChange} name = "foxes" />
        </div>
        <div>
          <ScoreBoard players = {players}
            bears = {bearVal}/>
        </div>
      </div>
    );
  }
}

export default App;

import './App.css';
import { PlayerSelector, CardSelector } from './Setup'
import {ScoreBoard} from './ScoreBoard'
import React from 'react';

class App extends React.Component {
  constructor (props){
    super(props);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.state = {playerCount: "1", 
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
        <div class = "page-section" id = "landing">
          <h1>Casscoria</h1>
          <p>A fanmade casscadia scoring app</p>
        </div>
        <div class= "page-section" id = "setup-section">
          <div class="setup-box">
            
            <PlayerSelector players={players} onPlayerChange={this.handlePlayerChange} />
            <CardSelector cardValue = {bearVal} onCardChange = {this.handleCardChange} name = "bears" />
            <CardSelector cardValue = {elkVal} onCardChange = {this.handleCardChange} name = "elk" />
            <CardSelector cardValue = {salmonVal} onCardChange = {this.handleCardChange} name = "salmon" />
            <CardSelector cardValue = {birdVal} onCardChange = {this.handleCardChange} name = "birds" />
            <CardSelector cardValue = {foxVal} onCardChange = {this.handleCardChange} name = "foxes" />
          </div>
        </div>
        <div >
            <ScoreBoard players = {players}
              bears = {bearVal}
              elk = {elkVal}
              salmon = {salmonVal}
              birds = {birdVal}
              foxes = {foxVal} />
          </div>
      </div>
    );
  }
}

export default App;

import './App.css';
import { PlayerSelector, CardSelector } from './Setup'
import React from 'react';

class App extends React.Component {
  constructor (props){
    super(props);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleCardChange = this.handleCardChange.bind(this);
    this.state = {playerCount: 1}
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
        </div>
        <div id="SetupBox">
          <h1>Setup Box</h1>
          <PlayerSelector players={players} onPlayerChange={this.handlePlayerChange} />
          <CardSelector cardValue = {bearVal} onCardChange = {this.handleCardChange} name = "bears" />
        </div>
      </div>
    );
  }
}

export default App;

import React from "react";

/* functions for setup of game.
    PlayerSelector is for setting the number of players in a game. min of 1 max of 4.
    the player count will be passed to parent and used for subsequent components to work out how many inputs are required.

    CardSelector is an A to D radio input for card types used in game.
    the card value will be used to determine what/ how many types of input and what function is used to calculate the scores
*/

export function PlayerSelector (props) {

    function handleChange (e) {
        props.onPlayerChange(e.target.value)
    }

    return (
        <div class = "box-column">
            <label for ="players">Number of players:</label>
            <select name="players" id="players" onChange={handleChange} >
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
                <option value={4}>Four</option>
            </select>
        </div>
    )
}

export function CardSelector (props) {

    function handleChange (e) {
        props.onCardChange(e.target.name, e.target.value)
    }

    return (            
        <div class = "box-column" >
            <form onChange = {handleChange} id = "setup-element">
                <p>{props.name}</p>
                <input type="radio" value="A" name = {props.name} defaultChecked />
                <label>A</label><br />
                <input type="radio" value="B" name = {props.name} />
                <label>B</label><br />
                <input type="radio" value="C" name = {props.name} />
                <label>C</label><br />
                <input type="radio" value="D" name = {props.name} />
                <label>D</label><br />
            </form>
        </div>
    ) 
}
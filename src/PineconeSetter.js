import React, { useEffect, useState } from 'react';

export function PineconeSetter (props) {
    const [pinecones, setPinecones] = useState([0,0,0,0])
    
    useEffect(() => {
        props.onScoreChange(pinecones)
    },[pinecones])

    function pineconeChange(e) {
        
        switch(e.target.name) {
            case "1pinecone":
                setPinecones(prev => [e.target.value, prev[1],prev[2],prev[3]])
                break;
            case "2pinecone":
                setPinecones(prev => [prev[0], e.target.value,prev[2],prev[3]])
                break;
            case "3pinecone":
                setPinecones(prev => [prev[0], prev[1],e.target.value,prev[3]])
                break;
            case "4pinecone":
                setPinecones(prev => [prev[0], prev[1],prev[2],e.target.value])
        }
        
    }

    return (
        <div>
            <p>Pinecones?</p>
            <input type="number"
            name = "1pinecone"
            onChange = {pineconeChange}
            defaultValue ={0} />
            {props.playerCount >= 2 && 
            <input type="number"
            name = "2pinecone"
            onChange = {pineconeChange}
            defaultValue ={0} />}
            {props.playerCount >= 3 && 
            <input type="number"
            name = "3pinecone"
            onChange = {pineconeChange}
            defaultValue ={0} />}
            {props.playerCount == 4 && 
            <input type="number"
            name = "4pinecone"
            onChange = {pineconeChange}
            defaultValue ={0} />}
        </div>
    )
}
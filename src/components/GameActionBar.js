import React, { useState } from 'react';
import MovementPhase from './MovementPhase.js'


const GameActionBar = ( { setSelectedCharacter, currentPhase, setCurrentPhase } ) =>{

    return (
        <div>
            <p>GameActionBar</p>
            <MovementPhase 
                setSelectedCharacter={setSelectedCharacter}
                setCurrentPhase={setCurrentPhase}
            />
        </div>
    )

}


export default GameActionBar
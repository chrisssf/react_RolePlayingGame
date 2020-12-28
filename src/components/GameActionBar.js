import React, { useState } from 'react';
import MovementPhase from './MovementPhase.js'


const GameActionBar = ( { setSelectedCharacter, currentPhase, setCurrentPhase, calculateMovementLocations } ) =>{

    return (
        <div>
            <p>GameActionBar</p>
            <MovementPhase 
                setSelectedCharacter={setSelectedCharacter}
                setCurrentPhase={setCurrentPhase}
                calculateMovementLocations={calculateMovementLocations}
            />
        </div>
    )

}


export default GameActionBar
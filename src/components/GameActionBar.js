import React, { useState } from 'react';
import MovementPhase from './MovementPhase.js'


const GameActionBar = ( { setSelectedCharacter, currentPhase, setCurrentPhase, calculateMovementLocations, setMovableSquares, playerCharacters, setPlayerCharacters } ) =>{

    return (
        <div>
            <p>GameActionBar</p>
            <MovementPhase 
                setSelectedCharacter={setSelectedCharacter}
                setCurrentPhase={setCurrentPhase}
                calculateMovementLocations={calculateMovementLocations}
                setMovableSquares={setMovableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
            />
        </div>
    )

}


export default GameActionBar
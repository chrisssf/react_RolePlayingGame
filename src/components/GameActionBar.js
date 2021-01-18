import React, { useState } from 'react';
import MovementPhase from './MovementPhase.js'


const GameActionBar = ( { 
    setSelectedCharacter, 
    currentPhase, 
    setCurrentPhase, 
    calculateMovementLocations, 
    setMovableSquares, 
    playerCharacters, 
    setPlayerCharacters,
    setEnemyMovementPhase } ) =>{

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
                setEnemyMovementPhase={setEnemyMovementPhase}
            />
        </div>
    )

}


export default GameActionBar
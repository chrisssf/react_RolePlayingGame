import React, { useState, useRef } from 'react';
import './GameActionBar.css'
import MovementPhase from './MovementPhase.js'
import AttackPhase from './AttackPhase.js'




const GameActionBar = ( { 
    setSelectedCharacter, 
    currentPhase, 
    setCurrentPhase, 
    calculateMovementLocations, 
    calculateAttackLocations,
    setMovableSquares, 
    setAttackableSquares,
    playerCharacters, 
    setPlayerCharacters,
    // enemyMovementPhase,
    setEnemyMovementPhase } ) =>{

    // testing
    const testBox = useRef()
    const test = () => {
        const element = document.getElementById("testBox")
        element.classList.toggle("transform")
        // element.classList.add("transform")
        
        testBox.current.classList.toggle("transform")
        testBox.current.classList.toggle("right")
        console.log(testBox)
        // Both of the above do the same thing BUT using REF is the correct react way of doing it
    }
    // end of testing


    return (
        <div>
            <p>GameActionBar</p>
            {currentPhase === "playerMovement" && <MovementPhase 
                setSelectedCharacter={setSelectedCharacter}
                setCurrentPhase={setCurrentPhase}
                calculateMovementLocations={calculateMovementLocations}
                setMovableSquares={setMovableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                setEnemyMovementPhase={setEnemyMovementPhase}
            />}
            {currentPhase === "enemyMovement" && 
                <div>
                    <h1>Enemy Movement Phase</h1>
                    <p>Please Wait...</p>
                </div>
            }
            {currentPhase === "playerAttack" && <AttackPhase 
                setSelectedCharacter={setSelectedCharacter}
                setCurrentPhase={setCurrentPhase}
                calculateAttackLocations={calculateAttackLocations}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                setAttackableSquares={setAttackableSquares}
            />}

            {/* testing  */}
            <div id="testBox" className="box transform" onClick={() => test()}></div>
            <div className="box" ref={testBox} onClick={() => test()}></div>
            <input type="button" id="button" value="Click Me" onClick={() => test()}></input>
            {/* end of testing  */}

        </div>
    )
}


export default GameActionBar
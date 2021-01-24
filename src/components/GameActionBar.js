import React, { useState, useEffect, useRef } from 'react';
import './GameActionBar.css'
import CharacterTurnSelect from './CharacterTurnSelect.js'
import MovementPhase from './MovementPhase.js'
import AttackPhase from './AttackPhase.js'


const GameActionBar = ( { 
    selectedCharacter,
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
    setEnemyMovementPhase,
    usedCharacters,
    setUsedCharacters} ) =>{

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

    const startingPosition = useRef(null)
    // this didnt need to be useRef, also work with state
    // const [ startingPosition, setStartingPosition ] = useState(null)

    useEffect(() =>{
        if(selectedCharacter) startingPosition.current = playerCharacters[selectedCharacter]["position"]
    }, [selectedCharacter])

    return (
        <div>
            <p>GameActionBar</p>
            {currentPhase === "characterTurnSelect" && <CharacterTurnSelect
                playerCharacters={playerCharacters} 
                setSelectedCharacter={setSelectedCharacter}
                usedCharacters={usedCharacters}
                setCurrentPhase={setCurrentPhase}
                calculateMovementLocations={calculateMovementLocations}
            />}
            {currentPhase === "playerMovement" && <MovementPhase 
                selectedCharacter={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter}
                setCurrentPhase={setCurrentPhase}
                calculateMovementLocations={calculateMovementLocations}
                setMovableSquares={setMovableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                setEnemyMovementPhase={setEnemyMovementPhase}
                calculateAttackLocations={calculateAttackLocations}
                startingPosition={startingPosition}
            />}
            {currentPhase === "enemyMovement" && 
                <div>
                    <h1>Enemy Movement Phase</h1>
                    <p>Please Wait...</p>
                </div>
            }
            {currentPhase === "playerAttack" && <AttackPhase 
                selectedCharacter={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter}
                setCurrentPhase={setCurrentPhase}
                calculateAttackLocations={calculateAttackLocations}
                calculateMovementLocations={calculateMovementLocations}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                setAttackableSquares={setAttackableSquares}
                startingPosition={startingPosition}
                usedCharacters={usedCharacters}
                setUsedCharacters={setUsedCharacters}
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
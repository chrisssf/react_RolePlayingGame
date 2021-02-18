import React, { useEffect, useRef } from 'react';
import './GameActionBar.css'
import CharacterTurnSelect from './CharacterTurnSelect.js'
import MovementPhase from './MovementPhase.js'
import AttackPhase from './AttackPhase.js'

import sword from '../assets/fireball.png'
import background from '../assets/mage.png'

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
    const testImage = useRef()
    const test = () => {
        const element = document.getElementById("testBox")
        element.classList.toggle("transform")
        element.classList.toggle("right")
        // element.classList.add("transform")
        
        testBox.current.classList.toggle("transform")
        testBox.current.classList.toggle("right")
        console.log(testBox)
        // Both of the above do the same thing BUT using REF is the correct react way of doing it

        testImage.current.classList.toggle("right")
        // testImage.current.classList.toggle("transform")
        setTimeout(() => testImage.current.classList.toggle("right"), 501)
    }
    const up = () => {
        testImage.current.classList.toggle("up")
        testImage.current.classList.toggle("hidden")
        setTimeout(() => {
            testImage.current.classList.toggle("up")
            testImage.current.classList.toggle("hidden")
        }, 501)
    }
    const down = () => {
        testImage.current.classList.toggle("down")
        testImage.current.classList.toggle("hidden")
        setTimeout(() => {
            testImage.current.classList.toggle("down")
            testImage.current.classList.toggle("hidden")
        }, 501)
    }
    const left = () => {
        testImage.current.classList.toggle("left")
        testImage.current.classList.toggle("hidden")
        setTimeout(() => {
            testImage.current.classList.toggle("left")
            testImage.current.classList.toggle("hidden")
        }, 501)
    }
    const right = () => {
        testImage.current.classList.toggle("right")
        testImage.current.classList.toggle("hidden")
        setTimeout(() => {
            testImage.current.classList.toggle("right")
            testImage.current.classList.toggle("hidden")
        }, 501)
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
                setUsedCharacters={setUsedCharacters}
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
            <div id="testBox" className="box transform right" onClick={() => test()}></div>
            <div className="box" ref={testBox} onClick={() => test()}></div>
            {/* <div className="box transform" ref={testBox} onClick={() => test()}></div> */}
            <input type="button" id="button" value="Click Me" onClick={() => test()}></input>
            {/* end of testing  */}
            <input type="button" id="button" value="UP" onClick={() => up()}></input>
            <input type="button" id="button" value="DOWN" onClick={() => down()}></input>
            <input type="button" id="button" value="LEFT" onClick={() => left()}></input>
            <input type="button" id="button" value="RIGHT" onClick={() => right()}></input>
            <div className="container-container" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
                <div ref={testImage} className="test-image-container hidden">
                    <img src={sword} alt={"image"}  className="test-image" onClick={() => test()}></img> 
                </div>
            </div>
        </div>
    )
}


export default GameActionBar
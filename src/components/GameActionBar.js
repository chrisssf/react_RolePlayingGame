import React, { useState, useEffect, useRef } from 'react';
import './GameActionBar.css'
import CharacterTurnSelect from './CharacterTurnSelect.js'
import MovementPhase from './MovementPhase.js'
import AttackPhase from './AttackPhase.js'

import sword from '../assets/axe.png'
import background from '../assets/knight.png'

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
    setUsedCharacters,
    equipModalIsOpen,
    setEquipModalIsOpen }) =>{

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
                equipModalIsOpen={equipModalIsOpen}
                setEquipModalIsOpen={setEquipModalIsOpen}
            />}
            {currentPhase === "battleWin" && <h2>You won this battle, click the chest for your reward!</h2>}
            {currentPhase === "battleLose" && <h2>Game Over! Please Try Again</h2>}

            <div className="info-box main-info-box">
                <h2>Basic Info</h2>
                <p>Click a character at any time to get its current status</p>
                <p>All player's characters act first and then all enemy characters will take their turn</p>
                <p>Select a character to control ={'>'} Move them ={'>'} change equipment/spells if necessary ={'>'} then attack if in range of an enemy</p>
                <p>Repeat until all characters have completed their turn</p>
                <p>Win by killing all enemies before they kill you!</p>

                <h3>Movement</h3>
                <p>All player characters can move 2 squares non-diagonally</p> 
                <p>All enemy characters can move 3 squares non-diagonally</p> 
                <p>All characters can move through other characters but cannot finish on the same square as another character</p> 
                
                <h3>Attack</h3>
                <p>All player characters can attack a single target within 2 squares either straight up, down, left or right</p>
                <p>All enemy characters can attack a single target in an adjacent square either straight up, down, left or right</p>
            </div>
            <div className="bibliography-container">
                <p><b>Bibliography</b></p>
                <div className="bibliography-item">
                    <img src={require('../assets/armour break.png').default} alt="armour break" className="bibliography-image"></img> 
                    <p>Shield broken by johartcamp from the Noun Project</p>
                </div>
                <div className="bibliography-item">
                    <img src={require('../assets/attack break.png').default} alt="attack break" className="bibliography-image"></img> 
                    <p>Sword Broken by João Filipe F. Rocha from the Noun Project</p>
                </div>
            </div>
            {/* testing!!!!!!!!!!!!!!!!!!!!!!!!!!  */}
            <br/><br/><br/><br/><br/><br/><br/><br/><br/>
            <p>IGNORE THIS..... IT'S JUST TESTING</p>
            {/* <div id="testBox" className="box transform right" onClick={() => test()}></div>
            <div className="box" ref={testBox} onClick={() => test()}></div> */}
            {/* <div className="box transform" ref={testBox} onClick={() => test()}></div> */}
            {/* <input type="button" id="button" value="Click Me" onClick={() => test()}></input> */}


            <input type="button" id="button" value="UP" onClick={() => up()}></input>
            <input type="button" id="button" value="DOWN" onClick={() => down()}></input>
            <input type="button" id="button" value="LEFT" onClick={() => left()}></input>
            <input type="button" id="button" value="RIGHT" onClick={() => right()}></input>
            {/* <div className="container-container" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}> */}
            <div className="container-container">
                {/* <div className="test-background-image-container">
                    <img src={background} alt={"image"}  className="test-background-image" onClick={() => test()}></img> 
                </div>
                <div ref={testImage} className="test-image-container hidden">
                    <img src={sword} alt={"image"}  className="test-image" onClick={() => test()}></img> 
                </div> */}
                <img src={background} alt={"image"}  className="test-background-image" onClick={() => test()}></img> 
                <img src={sword} ref={testImage} alt={"image"}  className="test-image hidden" onClick={() => test()}></img> 
            </div>

            {/* end of testing  */}

        </div>
    )
}


export default GameActionBar
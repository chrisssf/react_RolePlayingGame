import React, { useState, useRef } from 'react';

const MovementPhase = ({ setSelectedCharacter, setCurrentPhase, calculateMovementLocations, setMovableSquares, playerCharacters, setPlayerCharacters  }) =>{

    const [ movedCharacters, setMovedCharacters ] = useState([])
    const [ characterMoving, setCharacterMoving ] = useState("")
    const startingPosition = useRef(null)
    // this didnt need to be useRef, also work with state
    // const [ startingPosition, setStartingPosition ] = useState(null)

    const handleSelectCharacter = (character) => {
        startingPosition.current = playerCharacters[character]["position"]
        // setStartingPosition(playerCharacters[character]["position"])

        setSelectedCharacter(character)
        setCurrentPhase("movement")
        calculateMovementLocations(character, 2)
        setCharacterMoving(character)
    }

    const handleFinishedCharacterMovement = () => {
        // NEED TO DECIDE HOW CHARACTERS WILL BE NAMED/ REFERED TO AND STICK WITH IT!
        setMovedCharacters([...movedCharacters, characterMoving])
        console.log("after push", movedCharacters)
        setCharacterMoving("")
        setMovableSquares([])
    }

    const handleCancel = () => {
        const tempPlayerCharacters = JSON.parse(JSON.stringify(playerCharacters))
        tempPlayerCharacters[characterMoving]["position"] = startingPosition.current
        // tempPlayerCharacters[characterMoving]["position"] = startingPosition
        setPlayerCharacters(tempPlayerCharacters)
        setCharacterMoving("")
        setMovableSquares([])

    }

    return (
        <div>
            <p>Movement Phase</p>
            {characterMoving !== "" ? 
                <div>
                    <p>Currently Moving {characterMoving}</p> 
                    <button onClick={() => handleFinishedCharacterMovement()}>Finish Moving {characterMoving}</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                    <p>After finishing movement for this character it cannot be moved again until next movement phase, canceling doesn't use characters movement for this turn</p>
                </div>
            :
                <div>
                    <p>Select a character to move...</p>
                    <button disabled={movedCharacters.includes("meleePlayer")} onClick={() => handleSelectCharacter("meleePlayer")}>Knight</button>
                    <button disabled={movedCharacters.includes("magicPlayer")} onClick={() => handleSelectCharacter("magicPlayer")}>Mage</button>
                    <button disabled={movedCharacters.includes("healerPlayer")} onClick={() => handleSelectCharacter("healerPlayer")}>Healer</button>
                </div>
            }
        </div>
    )

}

export default MovementPhase
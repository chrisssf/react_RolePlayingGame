import React, { useState } from 'react';

const CharacterTurnSelect = ({
    playerCharacters,
    setSelectedCharacter,
    usedCharacters,
    setCurrentPhase,
    calculateMovementLocations }) => {


    const handleSelectCharacter = (character) => {
        setSelectedCharacter(character)
        calculateMovementLocations(playerCharacters[character].position, 2)
        setCurrentPhase("playerMovement")
    }

    return (
        <div>
            <p>Select a character to control...</p>
            <button disabled={usedCharacters.includes("meleePlayer")} onClick={() => handleSelectCharacter("meleePlayer")}>Knight</button>
            <button disabled={usedCharacters.includes("magicPlayer")} onClick={() => handleSelectCharacter("magicPlayer")}>Mage</button>
            <button disabled={usedCharacters.includes("healerPlayer")} onClick={() => handleSelectCharacter("healerPlayer")}>Healer</button>
            {/* <button onClick={() => handleEndMovementPhase()}>End Movement Phase</button> */}
        </div>
    )
}

export default CharacterTurnSelect
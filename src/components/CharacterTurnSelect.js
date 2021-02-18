import React from 'react';

const CharacterTurnSelect = ({
    playerCharacters,
    setSelectedCharacter,
    usedCharacters,
    setUsedCharacters,
    setCurrentPhase,
    calculateMovementLocations }) => {


    const handleSelectCharacter = (character) => {
        setSelectedCharacter(character)
        calculateMovementLocations(playerCharacters[character].position, 2)
        setCurrentPhase("playerMovement")
    }

    const classDeadAllyAsUsed = (deadAlly) => {
        if (!usedCharacters.includes(deadAlly)) {
            const newUsedCharacters = [...usedCharacters, deadAlly]
            setUsedCharacters(newUsedCharacters)
        }
    }

    return (
        <div>
            <p>Select a character to control...</p>
            {playerCharacters["meleePlayer"]["healthPoints"] > 0 ? <button disabled={usedCharacters.includes("meleePlayer")} onClick={() => handleSelectCharacter("meleePlayer")}>Knight</button> : classDeadAllyAsUsed("meleePlayer")}
            {playerCharacters["magicPlayer"]["healthPoints"] > 0 ? <button disabled={usedCharacters.includes("magicPlayer")} onClick={() => handleSelectCharacter("magicPlayer")}>Mage</button> : classDeadAllyAsUsed("magicPlayer")}
            {playerCharacters["healerPlayer"]["healthPoints"] > 0 ? <button disabled={usedCharacters.includes("healerPlayer")} onClick={() => handleSelectCharacter("healerPlayer")}>Healer</button> : classDeadAllyAsUsed("healerPlayer")}
            {/* <button onClick={() => handleEndMovementPhase()}>End Movement Phase</button> */}
        </div>
    )
}

export default CharacterTurnSelect
import React from 'react';

const MovementPhase = ({ setSelectedCharacter, setCurrentPhase, calculateMovementLocations  }) =>{


    const handleSelectCharacter = (character) => {
        setSelectedCharacter(character)
        setCurrentPhase("movement")
        calculateMovementLocations(character, 2)
    }

    return (
        <div>
            <p>Movement Phase</p>
            <p>Select a character to move...</p>
            <button onClick={() => handleSelectCharacter("meleePlayer")}>Knight</button>
            <button onClick={() => handleSelectCharacter("magicPlayer")}>Mage</button>
            <button onClick={() => handleSelectCharacter("healerPlayer")}>Healer</button>
        </div>
    )

}

export default MovementPhase
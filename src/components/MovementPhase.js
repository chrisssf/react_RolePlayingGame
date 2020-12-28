import React from 'react';

const MovementPhase = ({ setSelectedCharacter, setCurrentPhase }) =>{


    const handleSelectCharacter = (character) => {
        setSelectedCharacter(character)
        setCurrentPhase("movement")
    }

    return (
        <div>
            <p>Movement Phase</p>
            <p>Select a character to move...</p>
            <button onClick={() => handleSelectCharacter("knight")}>Knight</button>
            <button onClick={() => handleSelectCharacter("mage")}>Mage</button>
            <button onClick={() => handleSelectCharacter("healer")}>Healer</button>
        </div>
    )

}

export default MovementPhase
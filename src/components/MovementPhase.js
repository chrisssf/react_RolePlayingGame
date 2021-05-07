import React from 'react';

const MovementPhase = ({ 
    selectedCharacter,
    setSelectedCharacter, 
    setCurrentPhase, 
    calculateMovementLocations, 
    setMovableSquares, 
    playerCharacters, 
    setPlayerCharacters,
    setEnemyMovementPhase,
    calculateAttackLocations,
    startingPosition  }) =>{


    const handleFinishedCharacterMovement = () => {
        setMovableSquares([])
        calculateAttackLocations(selectedCharacter, 2)
        setCurrentPhase("playerAttack")
    }

    const handleCancel = () => {
        const updateableCharacter = playerCharacters[selectedCharacter]
        updateableCharacter.position = startingPosition.current
        setPlayerCharacters(prevState => ({...prevState, [selectedCharacter]: updateableCharacter }))
        setMovableSquares([])
        setCurrentPhase("characterTurnSelect")
    }

    return (
        <div>
            <p className="phase-text">Movement Phase</p>
            <div className="phase-content">
                <p>Currently Moving {playerCharacters[selectedCharacter].type}</p> 
                <button onClick={() => handleFinishedCharacterMovement()}>Finish Moving </button>
                <button onClick={() => handleCancel()}>Cancel</button>
                <p>Select a highlighted square to move to then click <b>Finish Moving</b> to begin {playerCharacters[selectedCharacter].type}'s 
                attack phase, selecting <b>Cancel</b> will not use this character's movement for this turn</p>
                {/* <p>After finishing movement for this character it cannot be moved again until next movement phase, canceling doesn't use characters movement for this turn</p> */}
            </div>
        </div>
    )
}

export default MovementPhase
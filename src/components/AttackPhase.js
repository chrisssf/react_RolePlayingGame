import React from 'react';

const AttackPhase = ({ 
    selectedCharacter,
    setSelectedCharacter, 
    setCurrentPhase, 
    calculateAttackLocations, 
    calculateMovementLocations,
    setAttackableSquares,
    playerCharacters, 
    setPlayerCharacters,
    setEnemyMovementPhase,
    startingPosition,
    usedCharacters,
    setUsedCharacters }) =>{

    const handleFinishedCharacterAttack = () => {
        setAttackableSquares([])
        setCurrentPhase("characterTurnSelect")
        const updatedUsedCharacters = [...usedCharacters, selectedCharacter]
        setUsedCharacters(updatedUsedCharacters)
    }

    const handleCancel = () => {
        setCurrentPhase("playerMovement")
        calculateMovementLocations(startingPosition.current, 2)
        setAttackableSquares([])
    }

    const handleUseCurrentSpell = () => {
        console.log("spell")
    }

    return (
        <div>
            <p>Attack Phase</p>
                <div>
                    <p>Currently Attacking with {playerCharacters[selectedCharacter].type}</p> 
                    <button onClick={() => handleFinishedCharacterAttack()}>End {playerCharacters[selectedCharacter].type}'s turn without attacking </button>
                    {selectedCharacter === "meleePlayer" && <button onClick={() => handleUseCurrentSpell()}>Change Equiped Weapon</button>}
                    {selectedCharacter === "magicPlayer" && <button onClick={() => handleUseCurrentSpell()}>Use Spell</button>}
                    <button onClick={() => handleCancel()}>Back</button>
                    <p>After finishing movement for this character it cannot be moved again until next movement phase, canceling doesn't use characters movement for this turn</p>
                </div>
        </div>
    )

}

export default AttackPhase
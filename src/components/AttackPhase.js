import React, { useState } from 'react';

const AttackPhase = ({ 
    setSelectedCharacter, 
    setCurrentPhase, 
    calculateAttackLocations, 
    setAttackableSquares,
    playerCharacters, 
    setPlayerCharacters,
    setEnemyMovementPhase  }) =>{


    const [ attackedCharacters, setAttackedCharacters ] = useState([])
    const [ characterAttacking, setCharacterAttacking ] = useState("")

    const handleSelectCharacter = (character) => {
        calculateAttackLocations(character, 2)
        setSelectedCharacter(character)
        setCharacterAttacking(character)
    }

    const handleFinishedCharacterAttack = () => {
        setAttackedCharacters([...attackedCharacters, characterAttacking])
        setCharacterAttacking("")
        setAttackableSquares([])
    }

    const handleCancel = () => {
        setCharacterAttacking("")
        setAttackableSquares([])
    }

    const handleEndAttackPhase = () => {
        setCurrentPhase("playerMovement")
    }

    return (
        <div>
            <p>Attack Phase</p>
            {characterAttacking !== "" ? 
                <div>
                    <p>Currently Attacking with {characterAttacking}</p> 
                    <button onClick={() => handleFinishedCharacterAttack()}>Finish Attacking with {characterAttacking}</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                    <p>After finishing movement for this character it cannot be moved again until next movement phase, canceling doesn't use characters movement for this turn</p>
                </div>
            :
                <div>
                    <p>Select a character to Attack with...</p>
                    <button disabled={attackedCharacters.includes("meleePlayer")} onClick={() => handleSelectCharacter("meleePlayer")}>Knight</button>
                    <button disabled={attackedCharacters.includes("magicPlayer")} onClick={() => handleSelectCharacter("magicPlayer")}>Mage</button>
                    <button disabled={attackedCharacters.includes("healerPlayer")} onClick={() => handleSelectCharacter("healerPlayer")}>Healer</button>
                    <button onClick={() => handleEndAttackPhase()}>End Attack Phase</button>
                </div>
            }
        </div>
    )

}

export default AttackPhase
import React, { useState } from 'react';

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


    const [ attackedCharacters, setAttackedCharacters ] = useState([])
    const [ characterAttacking, setCharacterAttacking ] = useState("")

    const handleSelectCharacter = (character) => {
        calculateAttackLocations(character, 2)
        setSelectedCharacter(character)
        setCharacterAttacking(character)
    }

    const handleFinishedCharacterAttack = () => {
        // setAttackedCharacters([...attackedCharacters, characterAttacking])
        // setCharacterAttacking("")
        setAttackableSquares([])
        setCurrentPhase("characterTurnSelect")
        const updatedUsedCharacters = [...usedCharacters, selectedCharacter]
        setUsedCharacters(updatedUsedCharacters)
    }

    const handleCancel = () => {
        // setCharacterAttacking("")
        setCurrentPhase("playerMovement")
        calculateMovementLocations(startingPosition.current, 2)
        console.log("startingPosition", startingPosition)
        setAttackableSquares([])
    }

    const handleEndAttackPhase = () => {
        setCurrentPhase("playerMovement")
    }

    // need to fix turn order and stuff and decide how canst spells / using items are going to work!!!!!
    // 1. pick character to control
    // 2. move character
    // 3. perform action with character => EITHER attack, use spell, change weapon/spell (maybe add items)
    // 4. finish with this character => select another character and do the same!
    const handleUseCurrentSpell = () => {
        console.log(characterAttacking)
    }

    return (
        <div>
            <p>Attack Phase</p>
            {/* {characterAttacking !== "" ?  */}
                <div>
                    <p>Currently Attacking with {playerCharacters[selectedCharacter].type}</p> 
                    <button onClick={() => handleFinishedCharacterAttack()}>End {playerCharacters[selectedCharacter].type}'s turn without attacking </button>
                    {selectedCharacter === "meleePlayer" && <button onClick={() => handleUseCurrentSpell()}>Change Equiped Weapon</button>}
                    {selectedCharacter === "magicPlayer" && <button onClick={() => handleUseCurrentSpell()}>Use Spell</button>}
                    <button onClick={() => handleCancel()}>Back</button>
                    <p>After finishing movement for this character it cannot be moved again until next movement phase, canceling doesn't use characters movement for this turn</p>
                </div>
            {/* :
                <div>
                    <p>Select a character to Attack with...</p>
                    <button disabled={attackedCharacters.includes("meleePlayer")} onClick={() => handleSelectCharacter("meleePlayer")}>Knight</button>
                    <button disabled={attackedCharacters.includes("magicPlayer")} onClick={() => handleSelectCharacter("magicPlayer")}>Mage</button>
                    <button disabled={attackedCharacters.includes("healerPlayer")} onClick={() => handleSelectCharacter("healerPlayer")}>Healer</button>
                    <button onClick={() => handleEndAttackPhase()}>End Attack Phase</button>
                </div>
            } */}
        </div>
    )

}

export default AttackPhase
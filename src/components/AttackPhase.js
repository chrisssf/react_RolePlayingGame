import React, { useState } from 'react';
import './AttackPhase.css'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import swordImage from '../assets/sword.png'
import WeaponImages from '../assets/WeaponImages.js'

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

    const [ weaponChangeModalIsOpen, setWeaponChangeModalIsOpen ] = useState(false)
    const [ equipedWeapon, setEquipedWeapon ] = useState(playerCharacters[selectedCharacter].equipedWeapon)

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

    const handleChangeWeapon = () => {
        setWeaponChangeModalIsOpen(true)
    }

    const handleUseCurrentSpell = () => {
        console.log("spell")
    }

    const displayWeaponInventory = () => {
        const weapons = playerCharacters[selectedCharacter].weapons
        console.log(weapons)
        const displayWeaponOptions = weapons.map(weapon => {
            let equipedStyle = false
            if(playerCharacters[selectedCharacter].equipedWeapon && playerCharacters[selectedCharacter].equipedWeapon.name === weapon.name) equipedStyle = true
            return (
                <div className={equipedStyle ? "weapon-select-modal-weapon equipedStyle" : "weapon-select-modal-weapon"} onClick={() => handleEquipWeapon(weapon)}>
                    {/* <img src={swordImage} alt='sword' className="weapon-select-modal-image"></img>  */}
                    {/* <img src={WeaponImages[weapon.name].default} alt='sword' className="weapon-select-modal-image"></img>  */}
                    <p>{weapon.name}</p>
                    <img src={require('../assets/' + weapon.name + '.png').default} alt={weapon.name} className="weapon-select-modal-image"></img> 
                    <p>Damage: {weapon.attackPower}</p>
                    {/* <button onClick={() => handleEquipWeapon(weapon)}>Equip</button> */}
                </div>
            )
        })
        return displayWeaponOptions
    }

    const handleEquipWeapon = (weapon) => {
        const updateableCharacter = playerCharacters[selectedCharacter]
        updateableCharacter.equipedWeapon = weapon
        setPlayerCharacters(prevState => ({...prevState, [selectedCharacter]: updateableCharacter }))
    }

    return (
        <div>
            <p>Attack Phase</p>
                <div>
                    <p>Currently Attacking with {playerCharacters[selectedCharacter].type}</p> 
                    <button onClick={() => handleFinishedCharacterAttack()}>End {playerCharacters[selectedCharacter].type}'s turn without attacking </button>
                    {selectedCharacter === "meleePlayer" && <button onClick={() => handleChangeWeapon()}>Change Equiped Weapon</button>}
                    {selectedCharacter === "magicPlayer" && <button onClick={() => handleUseCurrentSpell()}>Use Spell</button>}
                    <button onClick={() => handleCancel()}>Back</button>
                    <p>After finishing movement for this character it cannot be moved again until next movement phase, canceling doesn't use characters movement for this turn</p>
                </div>

                {selectedCharacter && <Modal
                className="weapon-select-modal-container"
                appElement={document.getElementById('root')}
                isOpen={weaponChangeModalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }
                }}
                >
                <p>Change Weapon</p>
                {playerCharacters[selectedCharacter].equipedWeapon ? 
                    <p>Currently Equiped weapon {playerCharacters[selectedCharacter].equipedWeapon.name}</p>
                :
                    <p>No Weapon Currently Equiped</p>
                }
                <div className="weapon-select-modal-weapons-container">
                    {displayWeaponInventory()}
                </div>
                <button className="weapon-select-modal-button" onClick={() => handleEquipWeapon(null)}>Unequip Weapon</button>
                <button className="weapon-select-modal-button" onClick={() => setWeaponChangeModalIsOpen(false)}>Confirm</button>
            </Modal>}
        </div>
    )

}

export default AttackPhase
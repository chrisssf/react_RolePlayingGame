import React, { useState } from 'react';
import './AttackPhase.css'
import EquipModal from './EquipModal.js'
// import ReactDOM from 'react-dom'
// import Modal from 'react-modal'
// import swordImage from '../assets/sword.png'
// import WeaponImages from '../assets/WeaponImages.js'

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

    // const [ weaponChangeModalIsOpen, setWeaponChangeModalIsOpen ] = useState(false)
    const [ equipModalIsOpen, setEquipModalIsOpen ] = useState(false)

    let equipType = ""
    if (selectedCharacter === "meleePlayer") equipType = "Weapon"
    else if (selectedCharacter === "magicPlayer") equipType = "Spell"
    else if (selectedCharacter === "healerPlayer") equipType = "Heal"


    // const [ equippedWeapon, setEquippedWeapon ] = useState(playerCharacters[selectedCharacter].equippedWeapon)

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

    const handleChangeEquipped = () => {
        // setWeaponChangeModalIsOpen(true)
        setEquipModalIsOpen(true)
    }

    // MOVED TO EQUIP MODAL!!!
    // const displayWeaponInventory = () => {
    //     const weapons = playerCharacters[selectedCharacter].weapons
    //     const displayWeaponOptions = weapons.map(weapon => {
    //         let equippedStyle = false
    //         if(playerCharacters[selectedCharacter].equippedWeapon && playerCharacters[selectedCharacter].equippedWeapon.name === weapon.name) equippedStyle = true
    //         return (
    //             <div className={equippedStyle ? "weapon-select-modal-weapon equippedStyle" : "weapon-select-modal-weapon"} onClick={() => handleEquipWeapon(weapon)}>
    //                 {/* <img src={swordImage} alt='sword' className="weapon-select-modal-image"></img>  */}
    //                 {/* <img src={WeaponImages[weapon.name].default} alt='sword' className="weapon-select-modal-image"></img>  */}
    //                 <p>{weapon.name}</p>
    //                 <img src={require('../assets/' + weapon.name + '.png').default} alt={weapon.name} className="weapon-select-modal-image"></img> 
    //                 <p>Damage: {weapon.attackPower}</p>
    //                 {/* <button onClick={() => handleEquipWeapon(weapon)}>Equip</button> */}
    //             </div>
    //         )
    //     })
    //     return displayWeaponOptions
    // }
    // const handleEquipWeapon = (weapon) => {
    //     const updateableCharacter = playerCharacters[selectedCharacter]
    //     updateableCharacter.equippedWeapon = weapon
    //     setPlayerCharacters(prevState => ({...prevState, [selectedCharacter]: updateableCharacter }))
    // }

    return (
        <div>
            <p className="phase-text">Attack Phase</p>
                <div className="phase-content">
                    <p>Currently Attacking with {playerCharacters[selectedCharacter].type}</p> 
                    <button onClick={() => handleFinishedCharacterAttack()}>End {playerCharacters[selectedCharacter].type}'s turn without attacking </button>
                    {/* {selectedCharacter === "meleePlayer" && <button onClick={() => handleChangeEquipped()}>Change Equipped Weapon</button>}
                    {selectedCharacter === "magicPlayer" && <button onClick={() => handleChangeEquipped()}>Change Equipped Spell</button>}
                    {selectedCharacter === "healerPlayer" && <button onClick={() => handleChangeEquipped()}>Change Equipped Heal</button>} */}
                    <button onClick={() => handleChangeEquipped()}>Change Equipped {equipType}</button>
                    <button onClick={() => handleCancel()}>Back To Movement Phase</button>
                    <p>You can <b>Change Equipped {equipType}</b>, <b>click a highlighted</b> enemy to attack, <b>End Turn Without attacking</b> or go <b>Back To Movement Phase</b></p>
                </div>
            {console.log("equipmentType111111", selectedCharacter)}

                {selectedCharacter && <EquipModal 
                    equipModalIsOpen={equipModalIsOpen} 
                    setEquipModalIsOpen={setEquipModalIsOpen}
                    playerCharacters={playerCharacters}
                    setPlayerCharacters={setPlayerCharacters}
                    selectedCharacter={selectedCharacter}
                />}



                {/* {selectedCharacter === "meleePlayer" && <Modal
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
                {playerCharacters[selectedCharacter].equippedWeapon ? 
                    <p>Currently Equipped weapon {playerCharacters[selectedCharacter].equippedWeapon.name}</p>
                :
                    <p>No Weapon Currently Equipped</p>
                }
                <div className="weapon-select-modal-weapons-container">
                    {displayWeaponInventory()}
                </div>
                <button className="weapon-select-modal-button" onClick={() => handleEquipWeapon(null)}>Unequip Weapon</button>
                <button className="weapon-select-modal-button" onClick={() => setWeaponChangeModalIsOpen(false)}>Confirm</button>
            </Modal>} */}
        </div>
    )

}

export default AttackPhase
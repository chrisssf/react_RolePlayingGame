import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import './AttackPhase.css'


    
    
const EquipModal = ({
    equipModalIsOpen, 
    setEquipModalIsOpen, 
    playerCharacters,
    setPlayerCharacters,
    selectedCharacter}) => {

    // const [ equipmentType, setEquipmentType ] = useState("")
    // useEffect(() =>{
    //     console.log("selectedCharacter", selectedCharacter);
    //     if(selectedCharacter === "meleePlayer") setEquipmentType("Weapon")
    //     else if(selectedCharacter === "magicPlayer") setEquipmentType("Spell")
    //     else if(selectedCharacter === "healerPlayer") setEquipmentType("Heal")
    // }, selectedCharacter)


    let equipmentType = ""
    if(selectedCharacter === "meleePlayer") equipmentType = "Weapon"
    else if(selectedCharacter === "magicPlayer") equipmentType= "Spell"
    else if(selectedCharacter === "healerPlayer") equipmentType = "Heal"


    const displayItemsInventory = () => {
        let itemType = ""
        if(selectedCharacter === "meleePlayer") itemType = "weapons"
        else if(selectedCharacter === "magicPlayer") itemType= "spells"
        else if(selectedCharacter === "healerPlayer") itemType = "heals"

        const items = playerCharacters[selectedCharacter][itemType]
        const displayItemOptions = items.map(item => {
            let equippedStyle = false
            if(playerCharacters[selectedCharacter]["equipped" + equipmentType] && playerCharacters[selectedCharacter]["equipped" + equipmentType].name === item.name) equippedStyle = true
            return (
                <div className={equippedStyle ? "weapon-select-modal-weapon equippedStyle" : "weapon-select-modal-weapon"} onClick={() => handleEquipItem(item)}>
                    {/* <img src={swordImage} alt='sword' className="weapon-select-modal-image"></img>  */}
                    {/* <img src={WeaponImages[weapon.name].default} alt='sword' className="weapon-select-modal-image"></img>  */}
                    <p>{item.name}</p>
                    <img src={require('../assets/' + item.name + '.png').default} alt={item.name} className="weapon-select-modal-image"></img> 
                    { itemType === "weapons" && <p>Damage: {item.attackPower}</p>}
                    { itemType === "spells" && <p>Damage: {item.spellPower}</p>}
                    { itemType === "spells" && <p>Effect: {item.debuffName} with {item.activationChance}% chance for {item.duration} turns</p>}
                    {/* { itemType === "heals" && <p>Damage: {item.attackPower}</p>} */}
                    {/* <button onClick={() => handleEquipItem(item)}>Equip</button> */}
                </div>
            )
        })
        return displayItemOptions
    }

    const handleEquipItem = (item) => {
        const updateableCharacter = playerCharacters[selectedCharacter]
        updateableCharacter["equipped" + equipmentType] = item
        setPlayerCharacters(prevState => ({...prevState, [selectedCharacter]: updateableCharacter }))
    }
    
    return (
        <>
            {console.log("equipmentType", selectedCharacter)}
            {equipmentType && <Modal
                className="weapon-select-modal-container"
                appElement={document.getElementById('root')}
                isOpen={equipModalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }
                }}
                >
                <p>Change {equipmentType}</p>
                {playerCharacters[selectedCharacter]["equipped" + equipmentType] ? 
                    <p>Currently Equipped {equipmentType} {playerCharacters[selectedCharacter]["equipped" + equipmentType].name}</p>
                :
                    <p>No {equipmentType} Currently Equipped</p>
                }
                <div className="weapon-select-modal-weapons-container">
                    {displayItemsInventory()}
                </div>
                <button className="weapon-select-modal-button" onClick={() => handleEquipItem(null)}>Unequip {equipmentType}</button>
                <button className="weapon-select-modal-button" onClick={() => setEquipModalIsOpen(false)}>Confirm</button>
            </Modal>}
        </>
    )
}

export default EquipModal
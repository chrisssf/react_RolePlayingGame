import React, { useState } from 'react';
// import ReactDOM from 'react-dom'     ----->DONT KNOW IF THIS IS NEEDED!!!
import Modal from 'react-modal'
        
const RewardModal = ({rewardModalIsOpen, 
    setRewardModalIsOpen,
    randomHeal,
    randomWeapon,
    randomSpell,
    weaponsCollection,
    spellsCollection,
    healsCollection,
    playerCharacters,
    setPlayerCharacters,
    setAllChestStatus,
    allChestStatus,
    currentMapArea,
    handleOpenMap }) => {

    const [ selectedUpgrade, setSelectedUpgrade ] = useState(null)
    const [ upgradeCharacter, setUpgradeCharacter ] = useState(null)

    const displayWeaponUpgrade = () => {
        let meleeType = ""
        if (randomWeapon.type === "axe") meleeType = "Dismember"
        if (randomWeapon.type === "sword") meleeType = "Pierce"
        if (randomWeapon.type === "club") meleeType = "Stun"
        return (
            <div className={selectedUpgrade === randomWeapon ? "weapon-select-modal-weapon equippedStyle" : "weapon-select-modal-weapon"} onClick={() => {
                setSelectedUpgrade(randomWeapon)
                setUpgradeCharacter("meleePlayer")}
            }>
                <p>{randomWeapon.name}</p>
                <img src={require('../assets/' + randomWeapon.name + '.png').default} alt={randomWeapon.name} className="weapon-select-modal-image"></img> 
                <p>Damage: +{randomWeapon.attackPower}</p>
                <p>{meleeType} Chance: {randomWeapon.activationChance}%</p>
            </div>
        )
    }

    const displaySpellUpgrade = () => {
        return (
            <div className={selectedUpgrade === randomSpell ? "weapon-select-modal-weapon equippedStyle" : "weapon-select-modal-weapon"} onClick={() => {
                setSelectedUpgrade(randomSpell)
                setUpgradeCharacter("magicPlayer")
                }}>
                <p>{randomSpell.name}</p>
                <img src={require('../assets/' + randomSpell.name + '.png').default} alt={randomSpell.name} className="weapon-select-modal-image"></img> 
                <p>Damage: +{randomSpell.spellPower}</p>
                <p>Effect: {randomSpell.effectName} with {randomSpell.activationChance}% chance for {randomSpell.duration} turns</p>
            </div>
        )
    }

    const displayHealUpgrade = () => {
        return (
            <div className={selectedUpgrade === randomHeal ? "weapon-select-modal-weapon equippedStyle" : "weapon-select-modal-weapon"} onClick={() => {
                setSelectedUpgrade(randomHeal)
                setUpgradeCharacter("healerPlayer")}
            }>
                <p>{randomHeal.name}</p>
                <img src={require('../assets/' + randomHeal.name + '.png').default} alt={randomHeal.name} className="weapon-select-modal-image"></img> 
                <p>Heal: +{randomHeal.healPower} HP</p>
                {randomHeal.effectName !== undefined && <p>Effect: {randomHeal.effectName}</p>}
            </div>
        )
    }

    const handleAddUpgrade = () => {
        if(selectedUpgrade !== null) {
            let inventoryType = ""
            if(upgradeCharacter === "meleePlayer") {
                inventoryType = "weapons"
                weaponsCollection = weaponsCollection.filter(weapon => weapon.name !== selectedUpgrade.name)
            }
            else if(upgradeCharacter === "magicPlayer") {
                inventoryType = "spells"
                spellsCollection = spellsCollection.filter(spell => spell.name !== selectedUpgrade.name)
            }
            else if(upgradeCharacter === "healerPlayer") {
                inventoryType = "heals"
                healsCollection = healsCollection.filter(heal => heal.name !== selectedUpgrade.name)
            }
            const updateableCharacter = playerCharacters[upgradeCharacter]
            updateableCharacter[inventoryType].push(selectedUpgrade)
            setPlayerCharacters(prevState => ({...prevState, [upgradeCharacter]: updateableCharacter }))
            setRewardModalIsOpen(false)
            console.log("allChestStatus1", allChestStatus);
            allChestStatus[currentMapArea - 1].status = "open"
            console.log("allChestStatus2", allChestStatus);
            setAllChestStatus(allChestStatus)
            setTimeout(() => handleOpenMap(), 700)
        }
        // might need to reset randomWeapon, randomSpell and randomHeal back to null here
    }

    return (
        <>  
            {<Modal
                className="weapon-select-modal-container"
                appElement={document.getElementById('root')}
                isOpen={rewardModalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }
                }}
            >
                <h2>Select An upgrade</h2>
                <p>{playerCharacters.meleePlayer.type} upgrade:</p>
                {displayWeaponUpgrade()}
                <p>{playerCharacters.magicPlayer.type} upgrade:</p>
                {displaySpellUpgrade()}
                <p>{playerCharacters.healerPlayer.type} upgrade:</p>
                {displayHealUpgrade()}
                <button className="weapon-select-modal-button" onClick={() => {
                    setRewardModalIsOpen(false)
                    setSelectedUpgrade(null)
                }}>Cancel</button>
                <button className="weapon-select-modal-button" onClick={() => handleAddUpgrade()}>Confirm</button>    
            </Modal>}
        </>
    )
}

export default RewardModal
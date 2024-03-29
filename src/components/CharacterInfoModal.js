import React from 'react';
// import ReactDOM from 'react-dom'    ----->DONT KNOW IF THIS IS NEEDED!!!
import Modal from 'react-modal'
// TESTING 
import EquipModal from './EquipModal.js'

const CharacterInfoModal = ({
    modalIsOpen,
    setModalIsOpen,
    modalCharacter,
    displayStatusEffects,
    character,
    playerCharacters,
    selectedCharacter,
    handleModalAttack,

    equipModalIsOpen,
    setEquipModalIsOpen,
    setSelectedCharacter }) => {

    const clickedCharacter = modalCharacter || character 

    const isAttackModal = () => {
        let sectionToDisplay = null
        console.log("character1", character)
        if ( character ) {
            sectionToDisplay = <> 
                {selectedCharacter === "healerPlayer" && playerCharacters["healerPlayer"]["equippedHeal"] !== null ? <p>Heal {character.name} with {playerCharacters["healerPlayer"]["equippedHeal"].name}</p> : 
                <p>Attack {character.name} with {playerCharacters[selectedCharacter].type}?</p>}
                {selectedCharacter === "meleePlayer" && playerCharacters[selectedCharacter].equippedWeapon && <p>Current equipped Weapon is {playerCharacters[selectedCharacter].equippedWeapon.name}</p>}
                {selectedCharacter === "magicPlayer" && playerCharacters[selectedCharacter].equippedSpell && <p>Current equipped Spell is {playerCharacters[selectedCharacter].equippedSpell.name}</p>}
                {selectedCharacter === "healerPlayer" && playerCharacters[selectedCharacter].equippedHeal && <p>Current equipped heal is {playerCharacters[selectedCharacter].equippedHeal.name}</p>}
                <p>This will end this characters turn</p>
                <button onClick={() => handleModalAttack()}>Yes</button>
                <button onClick={() => setModalIsOpen(false)}>No</button>
            </>
        } else sectionToDisplay = <> 
            <button className="modal-close-button" onClick={() => setModalIsOpen(false)}>
                Close
            </button>
        </>
        return sectionToDisplay
        // console.log("character", selectedCharacter);
    }

    // TESTING added eqip modal and fragment below
    return (
        <>
        <Modal
            className="modal-container"
            appElement={document.getElementById('root')}
            isOpen={modalIsOpen}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.7)'
                }
            }}
        >   
            {console.log("character", character)}
            {/* <button className="modal-close-button" onClick={() => setModalIsOpen(false)}>
                Close
            </button> */}
            {isAttackModal()}

            <p>{clickedCharacter.name}</p>
            <p>Attack: {clickedCharacter.attackPoints}</p>
            <p>Health: {clickedCharacter.healthPoints} / {clickedCharacter.maxHealthPoints}</p>
            {/* <p>status: {modalCharacter.statusEffects[0] ? modalCharacter.statusEffects[0].effect : ""}</p> */}
            {displayStatusEffects(clickedCharacter)}
            <button className="modal-close-button" onClick={() => {
                // setSelectedCharacter(modalCharacter)
                setEquipModalIsOpen(true)
            }}>
                meh
            </button>
        </Modal>
        <EquipModal />
        </>
    )
}

export default CharacterInfoModal
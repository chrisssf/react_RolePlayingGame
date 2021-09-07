import React, { useState, useEffect } from 'react'
// import ReactDOM from 'react-dom'
// import Modal from 'react-modal'
import EquipModal from '../components/EquipModal.js' // REMOVE!!!!!!!!!!!
import MapModal from '../components/MapModal.js'


import './GameScreen.css'
import GameBoard from '../components/GameBoard.js'
import GameActionBar from '../components/GameActionBar.js'
import CharacterInfoModal from '../components/CharacterInfoModal.js'

import MeleePlayer from '../models/MeleePlayer.js'
import MagicPlayer from '../models/MagicPlayer.js'
import HealerPlayer from '../models/HealerPlayer.js'
import MeleeWeapon from '../models/MeleeWeapon.js'
import Enemy from '../models/Enemy.js'
import Spell from '../models/Spell.js'
import Heal from '../models/Heal.js'

const boardWidth = 5
const boardHeight = 5

const GameScreen = () =>{

    const ken = new MeleePlayer("ken", 35, 100, 11, "knight")
    const matt = new MagicPlayer("matt", 25, 100, 6, "mage")
    const peter = new HealerPlayer("peter", 15, 100, 16, "priest")
    const sword = new MeleeWeapon("sword-5", 5, "sword")
    const club = new MeleeWeapon("club-6", 6, "club")
    const axe = new MeleeWeapon("axe-4", 4, "axe")
    const fireball = new Spell("fireball", 3, "burn", 10, 3) // no logic for burn yet
    const armourBreak = new Spell("armour break", 0, "armour down", 80, 3)
    const attackBreak = new Spell("attack break", 0, "attack down", 80, 3)
    const freeze = new Spell("freeze", 0, "frozen", 70 , 1)
    const heal = new Heal("heal", 10)
    const shield = new Heal("shield", 0, "shield", 20)
    peter.heals.push(heal)
    peter.heals.push(shield)
    matt.spells.push(fireball)
    matt.spells.push(armourBreak)
    matt.spells.push(attackBreak)
    matt.spells.push(freeze)
    ken.weapons.push(sword)
    ken.weapons.push(club)
    ken.weapons.push(axe)
    matt.equippedSpell = fireball
    // peter.equippedHeal = heal
    // ken.equippedWeapon = sword
    const sword2 = new MeleeWeapon("sword-5", 7, "sword")
    const club2 = new MeleeWeapon("club-6", 8, "club")
    const axe2 = new MeleeWeapon("axe-4", 6, "axe")
    const weaponsCollection = [sword2, club2, axe2]
    const fireball2 = new Spell("fireball", 10, "burn", 10, 3) // no logic for burn yet
    // const armourBreak2 = new Spell("armour break", 0, "armour down", 100, 3)
    const attackBreak2 = new Spell("attack break", 0, "attack down", 100, 3) 
    const freeze2 = new Spell("freeze", 0, "frozen", 85 , 1)
    const spellsCollection = [fireball2, attackBreak2, freeze2]
    const heal2 = new Heal("heal", 30)
    const shield2 = new Heal("shield", 0, "shield", 40)
    const attackUp = new Heal("attack up", 0, "attack up", 3)
    const healsCollection = [heal2, shield2, attackUp]

    let startingPlayerCharacters = {
        meleePlayer: ken,
        magicPlayer: matt,
        healerPlayer: peter
    }

    // HAVE AN ARRAY OF MANY PRE-MADE ENEMIES, WHEN STARTING A NEW ROOM, PICK 3 
    // TO RANDOMLY PUT IN BY SETTING THEIR POSITIONS
    const enemy1 = new Enemy("ORCenemy1", 35, 1, 10, "enemy1", "orc")
    const enemy2 = new Enemy("ORCenemy2", 35, 1, 15, "enemy2", "orc")
    const enemy3 = new Enemy("ORCenemy3", 35, 1, 20, "enemy3", "orc")

    let startingEnemyCharacters = {
        enemy1: enemy1,
        enemy2: enemy2,
        enemy3: enemy3
    }

    const [ playerCharacters, setPlayerCharacters ] = useState(startingPlayerCharacters)
    const [ enemyCharacters, setEnemyCharacters ] = useState(startingEnemyCharacters)

    const [ enemyMovementPhase, setEnemyMovementPhase ] = useState(false) // dont think this being used any more
    const [ selectedCharacter, setSelectedCharacter ] = useState(null)
    const [ usedCharacters, setUsedCharacters ] = useState([])
    const [ currentPhase, setCurrentPhase ] = useState("characterTurnSelect")
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const [ modalCharacter, setModalCharacter ] = useState(null)
    const [ movableSquares, setMovableSquares ] = useState([])
    const [ attackableSquares, setAttackableSquares ] = useState([])
    const [ equipModalIsOpen, setEquipModalIsOpen ] = useState(false)
    const [ mapModalIsOpen, setMapModalIsOpen ] = useState(false)
    const [ allChestStatus, setAllChestStatus ] = useState(["", "", "", "", "", "", "", "", ""])




    // MAP STUFF!!!!!!!!!!!!!!!!!!!!!!!!!!!! needs moved later!
    const [ currentMapArea, setCurrentMapArea ] = useState(4)
    // everytime currentArea changes, need to check if completed, if not => populate with enemies
    const [ discoveredMapAreas, setDiscoveredMapAreas ] = useState([4])
    // if pushing new areas the last index will always be uncompleted unless .length = 9 and token is available
    // so if currentArea === last discovered index => need to populate with enemies and an upgrade
    const [ areaUnlockTokenAvailable, setAreaUnlockTokenAvailable ] = useState(false)


    const handleMapClick = (clickedArea) => {
        console.log("clickedArea", clickedArea);
        if (areaUnlockTokenAvailable) {
            document.getElementById("map-cover-item" + clickedArea).classList.remove("map-cover-item-black")
            setAreaUnlockTokenAvailable(false)
        }
    }
    // END OF MAP STUFF!!!!!!!!!!!!!!!!!!!!!



    useEffect(() =>{
        if(usedCharacters.length === 3) {
            setCurrentPhase("enemyMovement")
            setUsedCharacters([])
        }
    }, [usedCharacters])

    useEffect(() =>{

        let timeout = 0
        let timeout2 = 0
        let timeout3 = 0

        if (currentPhase === "enemyMovement") {
            setTimeout(() => { 
                timeout = enemy1.takeTurn(playerCharacters, setPlayerCharacters, enemyCharacters, setEnemyCharacters)
                setTimeout(() => {
                    timeout2 = enemy2.takeTurn(playerCharacters, setPlayerCharacters, enemyCharacters, setEnemyCharacters)
                    setTimeout(() => {
                        timeout3 = enemy3.takeTurn(playerCharacters, setPlayerCharacters, enemyCharacters, setEnemyCharacters)
                        setTimeout(() => setCurrentPhase("characterTurnSelect"), (timeout3 + 500))
                    }, (timeout2))
                }, timeout)
            }, 800) 
        }
        console.log("playerssssss", playerCharacters);
        console.log("currentPhase", currentPhase)

        if ( playerCharacters.meleePlayer.healthPoints <= 0 && playerCharacters.magicPlayer.healthPoints <= 0 && playerCharacters.healerPlayer.healthPoints <= 0 ){
            // alert("GAME OVER!!!")
            console.log("GAME OVER!!!")
            setCurrentPhase("battleLose")
        } else if ( enemyCharacters.enemy1.healthPoints <= 0 && enemyCharacters.enemy2.healthPoints <= 0 && enemyCharacters.enemy3.healthPoints <= 0 ){
            // alert("YOU WIN!!!")
            console.log("YOU WIN!!!")
            setCurrentPhase("battleWin")
            handleBattleWin()
        }
    }, [currentPhase])

    const handleBattleWin = () => {
        setAreaUnlockTokenAvailable(true)
        const allLocations = [];

        for (let i = 1; i <= 25; i++) {
            allLocations.push(i);
        }
        const playerPositions = []
        playerPositions.push(playerCharacters.meleePlayer.position)
        playerPositions.push(playerCharacters.magicPlayer.position)
        playerPositions.push(playerCharacters.healerPlayer.position)

        const possibleChestLocations = allLocations.filter(location => !playerPositions.includes(location))
        const randomLocationIndex = Math.floor(Math.random() * possibleChestLocations.length)
        const randomChestPosition = possibleChestLocations[randomLocationIndex]

        const chest = {status: "closed", position: randomChestPosition}
        const allChestStatusForState = allChestStatus
        allChestStatusForState[currentMapArea - 1] = chest
        // OLD!!!!!!!!!!!
        // const allChestStatusForState = allChestStatus.map((chestStatus, index) => {
        //     if ( currentMapArea === index + 1) return chest
        //     else return chestStatus
        // })
        setAllChestStatus(allChestStatusForState)

    }


    const calculateMovementLocations = (startingPosition, numberOfStepsAllowed) => {

        const movableLocations = []
        movableLocations.push(startingPosition)

        for (let i = 1; i <= numberOfStepsAllowed; i++){
            movableLocations.forEach( movableLocation => {
                const currentRow = Math.ceil(movableLocation / boardWidth)
                // if ((movableLocation + boardWidth) < (boardWidth * boardHeight) && !movableLocations.includes(movableLocation + boardWidth)) movableLocations.push(movableLocation + boardWidth)
                if ((movableLocation + boardWidth) < (boardWidth * boardHeight)) {
                    if (!movableLocations.includes(movableLocation + boardWidth)) movableLocations.push(movableLocation + boardWidth)
                } 
                if ((movableLocation - boardWidth) > 0) {
                    if (!movableLocations.includes(movableLocation - boardWidth)) movableLocations.push(movableLocation - boardWidth)
                }
                const nextSquareRow = Math.ceil(((movableLocation + 1) / boardWidth))
                if (nextSquareRow === currentRow) {
                    if (!movableLocations.includes(movableLocation + 1)) movableLocations.push(movableLocation + 1)
                }
                const previousSquareRow = Math.ceil(((movableLocation - 1) / boardWidth))
                if (previousSquareRow === currentRow) {
                    if (!movableLocations.includes(movableLocation - 1)) movableLocations.push(movableLocation - 1)
                }
            })
        }
        setMovableSquares(movableLocations)
    }

    const calculateAttackLocations = (characterToAttack, attackRange) => {
        const currentPosition = playerCharacters[characterToAttack]["position"]
        const currentRow = Math.ceil(currentPosition / boardWidth)
        const attackableLocations = []

        for (let i = 1 ; i <= attackRange ; i++) {
            if( currentPosition + (i * 5) < boardWidth * boardHeight ) attackableLocations.push(currentPosition + (i * 5))
            if( currentPosition - (i * 5) > 0 ) attackableLocations.push(currentPosition - (i * 5))
            if( Math.ceil((currentPosition + (i * 1)) / boardWidth) === currentRow ) attackableLocations.push(currentPosition + (i * 1))
            if( Math.ceil((currentPosition - (i * 1)) / boardWidth) === currentRow ) attackableLocations.push(currentPosition - (i * 1))
        }
        setAttackableSquares(attackableLocations)
    }

    const handleImageClick = (character) => {
        if(!attackableSquares.includes(character.position)){
            setModalIsOpen(true)
            setModalCharacter(character)
        }
    }

    const displayStatusEffects = (clickedCharacter) => {
        const display = clickedCharacter.statusEffects.map(statusEffect => {
            return statusEffect.effect + 'x' + statusEffect.duration
        })
        const finished = display.join(", ")
        return <p>status: {finished}</p>
    }

    const handleOpenMap = () => {
        setMapModalIsOpen(true)
    }

    return (
        <div>
            <p>GameScreen</p>
            <h1 onClick={() => handleOpenMap()}>MAP!</h1>
            <GameBoard 
                selectedCharacter={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter}
                currentPhase={currentPhase}
                setCurrentPhase={setCurrentPhase}
                movableSquares={movableSquares}
                attackableSquares={attackableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                enemyCharacters={enemyCharacters}
                setEnemyCharacters={setEnemyCharacters}
                handleImageClick={handleImageClick}
                usedCharacters={usedCharacters}
                setUsedCharacters={setUsedCharacters}
                setAttackableSquares={setAttackableSquares}
                displayStatusEffects={displayStatusEffects}
                allChestStatus={allChestStatus}
                setAllChestStatus={setAllChestStatus}
                currentMapArea={currentMapArea}
                weaponsCollection={weaponsCollection}
                spellsCollection={spellsCollection}
                healsCollection={healsCollection}
                handleOpenMap={handleOpenMap}
            />
            <GameActionBar 
                selectedCharacter={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter} 
                currentPhase={currentPhase} 
                setCurrentPhase={setCurrentPhase}
                calculateMovementLocations={calculateMovementLocations}
                calculateAttackLocations={calculateAttackLocations}
                setMovableSquares={setMovableSquares}
                setAttackableSquares={setAttackableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                enemyMovementPhase={enemyMovementPhase}
                setEnemyMovementPhase={setEnemyMovementPhase}
                usedCharacters={usedCharacters}
                setUsedCharacters={setUsedCharacters}
                equipModalIsOpen={equipModalIsOpen}
                setEquipModalIsOpen={setEquipModalIsOpen}
            />
            {modalCharacter && 
            <CharacterInfoModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                modalCharacter={modalCharacter}
                displayStatusEffects={displayStatusEffects}
                equipModalIsOpen={equipModalIsOpen}
                setEquipModalIsOpen={setEquipModalIsOpen}
                
                setSelectedCharacter={setSelectedCharacter}
            />}
            {/* {modalCharacter && <Modal
                className="modal-container"
                appElement={document.getElementById('root')}
                isOpen={modalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }
                }}
            >
                <button className="modal-close-button" onClick={() => setModalIsOpen(false)}>
					Close
				</button>
                <p>{modalCharacter.name}</p>
                <p>Attack: {modalCharacter.attackPoints}</p>
                <p>Health: {modalCharacter.healthPoints}</p>
                <p>status: {modalCharacter.statusEffects[0] ? modalCharacter.statusEffects[0].effect : ""}</p>
                {displayStatusEffects()}
            </Modal>} */}

            {/* WORKING MAP CODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            {/* <div className="full-map-container">
                <div className="map-cover-container">
                    <div className={"map-cover-item map-cover-item-black"} id="map-cover-item1" onClick={() => handleMapClick(1)}></div>
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item2" onClick={() => handleMapClick(2)}></div>
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item3" onClick={() => handleMapClick(3)}></div>  
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item4" onClick={() => handleMapClick(4)}></div>
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item5" onClick={() => handleMapClick(5)}></div>
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item6" onClick={() => handleMapClick(6)}></div>  
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item7" onClick={() => handleMapClick(7)}></div>
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item8" onClick={() => handleMapClick(8)}></div>
                    <div className="map-cover-item map-cover-item-black" id="map-cover-item9" onClick={() => handleMapClick(9)}></div>  
                </div>
                <img src={require('../assets/full desert.jpg').default} alt="full map" className="full-map-image"></img> 
            </div> */}
            {/* END WORKING MAP CODE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}


            {/* REMOVE!!!!! OR FIX */}
            {/* <EquipModal 
                    equipModalIsOpen={equipModalIsOpen} 
                    setEquipModalIsOpen={setEquipModalIsOpen}
                    playerCharacters={playerCharacters}
                    setPlayerCharacters={setPlayerCharacters}

                    // selectedCharacter={modalCharacter}
                /> */}

            <MapModal 
                mapModalIsOpen={mapModalIsOpen} 
                setMapModalIsOpen={setMapModalIsOpen}
                areaUnlockTokenAvailable={areaUnlockTokenAvailable}
                setAreaUnlockTokenAvailable={setAreaUnlockTokenAvailable}
            />
        </div>
    )
}

export default GameScreen

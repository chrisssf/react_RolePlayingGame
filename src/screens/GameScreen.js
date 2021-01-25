import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import './GameScreen.css'
import GameBoard from '../components/GameBoard'
import GameActionBar from '../components/GameActionBar'

import MeleePlayer from '../models/MeleePlayer.js'
import MagicPlayer from '../models/MagicPlayer.js'
import HealerPlayer from '../models/HealerPlayer.js'
import MeleeWeapon from '../models/MeleeWeapon.js'
import Enemy from '../models/Enemy.js'
import Spell from '../models/Spell.js'

const boardWidth = 5
const boardHeight = 5

const GameScreen = () =>{

    const ken = new MeleePlayer("ken", 30, 100, 11, "Knight")
    const matt = new MagicPlayer("matt", 20, 100, 6, "mage")
    const peter = new HealerPlayer("peter", 10, 100, 16, "priest")
    const sword = new MeleeWeapon("sword-5", 5, "sword")
    const club = new MeleeWeapon("club-6", 6, "club")
    const axe = new MeleeWeapon("axe-4", 4, "axe")
    const fireball = new Spell("fireball", 3, "stun", 100, 3)
    // ken.weapons = ken.weapons.push(sword)
    // ken.weapons = ken.weapons.push(club)
    // ken.weapons = ken.weapons.push(axe)
    ken.weapons.push(sword)
    ken.weapons.push(club)
    ken.weapons.push(axe)
    matt.equipedSpell = fireball
    // ken.equipedWeapon = sword

    let startingPlayerCharacters = {
        meleePlayer: ken,
        magicPlayer: matt,
        healerPlayer: peter
    }

    const enemy1 = new Enemy("enemy1", 1, 100, 10)
    const enemy2 = new Enemy("enemy2", 1, 100, 15)
    const enemy3 = new Enemy("enemy3", 1, 100, 20)

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
            timeout = enemy1.takeTurn(playerCharacters, enemyCharacters, setEnemyCharacters)
            setTimeout(() => {
                timeout2 = enemy2.takeTurn(playerCharacters, enemyCharacters, setEnemyCharacters)
                setTimeout(() => {
                    timeout3 = enemy3.takeTurn(playerCharacters, enemyCharacters, setEnemyCharacters)
                    setTimeout(() => setCurrentPhase("characterTurnSelect"), (timeout3 + 500))
                }, (timeout2))
            }, timeout)
        }
    }, [currentPhase])


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
        setModalIsOpen(true)
        setModalCharacter(character)
    }

    const displayStatusEffects = () => {
        const display = modalCharacter.statusEffects.map(statusEffect => {
            return statusEffect.effect + 'x' + statusEffect.duration
        })
        const finished = display.join(", ")
        return <p>status: {finished}</p>
    }

    return (
        <div>
            <p>GameScreen</p>
            <GameBoard 
                selectedCharacter={selectedCharacter} 
                currentPhase={currentPhase}
                setCurrentPhase={setCurrentPhase}
                movableSquares={movableSquares}
                attackableSquares={attackableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                enemyCharacters={enemyCharacters}
                handleImageClick={handleImageClick}
                usedCharacters={usedCharacters}
                setUsedCharacters={setUsedCharacters}
                setAttackableSquares={setAttackableSquares}
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
            />
            {modalCharacter && <Modal
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
                {/* <p>status: {modalCharacter.statusEffects[0] ? modalCharacter.statusEffects[0].effect : ""}</p> */}
                {displayStatusEffects()}
            </Modal>}
        </div>
    )
}

export default GameScreen

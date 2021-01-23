import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'

import './GameScreen.css'
import GameBoard from '../components/GameBoard'
import GameActionBar from '../components/GameActionBar'

import Character from '../models/Character.js'
import MeleePlayer from '../models/MeleePlayer.js'
import MagicPlayer from '../models/MeleePlayer.js'
import HealerPlayer from '../models/MeleePlayer.js'
import MeleeWeapon from '../models/MeleeWeapon.js'
import Enemy from '../models/Enemy.js'

const boardWidth = 5
const boardHeight = 5

const GameScreen = () =>{


    const [ enemyMovementPhase, setEnemyMovementPhase ] = useState(false)
    const [ selectedCharacter, setSelectedCharacter ] = useState(null)
    const [ usedCharacters, setUsedCharacters ] = useState([])
    const [ currentPhase, setCurrentPhase ] = useState("characterTurnSelect")
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const [ modalCharacter, setModalCharacter ] = useState(null)

    useEffect(() =>{
        if(usedCharacters.length === 3) {
            setCurrentPhase("enemyMovement")
            setUsedCharacters([])
        }
    }, [usedCharacters])

    useEffect(() =>{
        const bob = new Character("bob", 10, 20)
        // const orc = new Enemy("orc", 1, 100, 15)
        const karen = new MeleePlayer("karen", 10, 20, 11, "Knight")
        const club = new MeleeWeapon("club-5", 5, "sword")

        // THIS IS FOR MOVING ENEMY!
        let timeout = 0
        let timeout2 = 0
        let timeout3 = 0

        if (currentPhase === "enemyMovement") {
            timeout = enemy1.move(playerCharacters, enemyCharacters, setEnemyCharacters)
            setTimeout(() => {
                timeout2 = enemy2.move(playerCharacters, enemyCharacters, setEnemyCharacters)
                setTimeout(() => {
                    timeout3 = enemy3.move(playerCharacters, enemyCharacters, setEnemyCharacters)
                    setTimeout(() => setCurrentPhase("characterTurnSelect"), (timeout3 + 500))
                }, (timeout2))
            }, timeout)
        }

        // if (currentPhase === "enemyMovement") {
        //     console.log("RUNNING22222222")
        //     timeout = enemy1.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        //     console.log("1", timeout)

        //     setTimeout(() => {
        //         timeout2 = enemy2.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        //         console.log("2", timeout2)
        //     }, timeout)
        //     setTimeout(() => {
        //         timeout3 = enemy3.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        //         console.log("3", timeout3)

        //     }, (timeout + timeout2))
        //     setTimeout(() => setCurrentPhase("playerMovement"), (timeout + timeout2 + timeout3))
        // }

        // const movedEnemy = enemy1.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        // const movedEnemy2 = enemy2.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        // const movedEnemy3 = enemy3.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        // const tempEnemyCharacters = JSON.parse(JSON.stringify(enemyCharacters))
        // setTimeout(() => setEnemyCharacters(tempEnemyCharacters), 2000)

        // let tempEnemyCharacters = null
        // setTimeout(() => {
        //     const movedEnemy = enemy1.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        //     tempEnemyCharacters = JSON.parse(JSON.stringify(enemyCharacters))
        //     setEnemyCharacters(tempEnemyCharacters)
        // }, 1000)

        // setTimeout(() => {
        //     const movedEnemy = enemy2.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        //     tempEnemyCharacters = JSON.parse(JSON.stringify(enemyCharacters))
        //     setEnemyCharacters(tempEnemyCharacters)
        // }, 2000)

        // setTimeout(() => {
        //     const movedEnemy = enemy3.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        //     tempEnemyCharacters = JSON.parse(JSON.stringify(enemyCharacters))
        //     setEnemyCharacters(tempEnemyCharacters)
        // }, 3000)
        


        // tempEnemyCharacters = JSON.parse(JSON.stringify(enemyCharacters))
        // tempEnemyCharacters[enemy1.name] = movedEnemy
        // tempEnemyCharacters[enemy2.name] = movedEnemy2
        // tempEnemyCharacters[enemy3.name] = movedEnemy3
        // setTimeout(() => setEnemyCharacters(tempEnemyCharacters), 6000)

        // const movingEnemy = 
        // console.log("newPosition", newPosition)
        // console.log(enemyCharacters)


        // karen.equipedWeapon = club
        // karen.attack(enemy1)
        // console.log("enemy1", enemy1)
        // console.log("karen", karen)


    }, [currentPhase])

    // const [ magicPosition, setMagicPosition ] = useState(16)
    // const [ meleePosition, setMeleePosition ] = useState(11)
    // const [ healerPosition, setHealerPosition ] = useState(6)

    // THIS WORKED!!!!!!
    // let startingPlayerCharacters = {
    //     meleePlayer: {
    //         position: 11,
    //         type: "Knight",
    //         name: "Jeff"
    //     },
    //     magicPlayer: {
    //         position: 16,
    //         type: "Mage",
    //         name: "Dave"
    //     },
    //     healerPlayer: {
    //         position: 6,
    //         type: "Priest",
    //         name: "Bob"
    //     }
    // }

    // TRYING THIS!!!!!!!!
    const ken = new MeleePlayer("ken", 30, 100, 11, "Knight")
    const matt = new MagicPlayer("matt", 20, 100, 6, "mage")
    const peter = new HealerPlayer("peter", 10, 100, 16, "priest")
    const sword = new MeleeWeapon("club-5", 5, "club")
    ken.equipedWeapon = sword

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


    


    const [ movableSquares, setMovableSquares ] = useState([])
    const [ attackableSquares, setAttackableSquares ] = useState([])

    const calculateMovementLocations = (startingPosition, numberOfStepsAllowed) => {

        const movableLocations = []
        // switch(characterToMove){
        //     case "meleePlayer":
        //         movableLocations.push(meleePosition)
        //         break
        //     case "magicPlayer":
        //         movableLocations.push(magicPosition)
        //         break
        //     case "healerPlayer":
        //         movableLocations.push(healerPosition)
        //         break
        // }
        // movableLocations.push(playerCharacters[characterToMove]["position"])
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
        console.log(movableLocations)
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
        console.log("attackableLocations", attackableLocations)
        setAttackableSquares(attackableLocations)
    }

    const handleImageClick = (character) => {
        setModalIsOpen(true)
        setModalCharacter(character)
    }

    return (
        <div>
            <p>GameScreen</p>
            <GameBoard 
                selectedCharacter={selectedCharacter} 
                currentPhase={currentPhase}
                setCurrentPhase={setCurrentPhase}
                // magicPosition={magicPosition}
                // healerPosition={healerPosition}
                // meleePosition={meleePosition}
                // setMagicPosition={setMagicPosition}
                // setHealerPosition={setHealerPosition}
                // setMeleePosition={setMeleePosition}
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
                <p>status: {modalCharacter.statusEffects[0]}</p>

            </Modal>}
           
        </div>
    )

}

export default GameScreen

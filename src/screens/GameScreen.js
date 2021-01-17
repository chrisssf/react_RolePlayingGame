import React, { useState, useEffect } from 'react';

import GameBoard from '../components/GameBoard'
import GameActionBar from '../components/GameActionBar'

import Character from '../models/Character.js'
import MeleePlayer from '../models/MeleePlayer.js'
import MeleeWeapon from '../models/MeleeWeapon.js'

import Enemy from '../models/Enemy.js'

const GameScreen = () =>{

    useEffect(() =>{
        const bob = new Character("bob", 10, 20)
        // const orc = new Enemy("orc", 1, 100, 15)
        const karen = new MeleePlayer("karen", 10, 20, 11, "Knight")
        const club = new MeleeWeapon("club-5", 5, "sword")

        // THIS IS FOR MOVING ENEMY!

        const movedEnemy = enemy1.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        setTimeout(() => {
            const movedEnemy2 = enemy2.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        }, 4000)
        setTimeout(() => {
            const movedEnemy = enemy3.move(playerCharacters, enemyCharacters, setEnemyCharacters)
        }, 8000)

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


        karen.equipedWeapon = club
        karen.attack(enemy1)
        console.log("enemy1", enemy1)
        console.log("karen", karen)


    }, [])

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
    const ken = new MeleePlayer("ken", 10, 20, 2, "Knight")
    const matt = new MeleePlayer("matt", 10, 20, 11, "mage")
    const peter = new MeleePlayer("ken", 10, 20, 22, "priest")

    let startingPlayerCharacters = {
        meleePlayer: ken,
        magicPlayer: matt,
        healerPlayer: peter
    }

    const enemy1 = new Enemy("orc1", 1, 100, 10)
    const enemy2 = new Enemy("orc2", 1, 100, 15)
    const enemy3 = new Enemy("orc3", 1, 100, 20)

    let startingEnemyCharacters = {
        enemy1: enemy1,
        enemy2: enemy2,
        enemy3: enemy3
    }

    const [ playerCharacters, setPlayerCharacters ] = useState(startingPlayerCharacters)
    const [ enemyCharacters, setEnemyCharacters ] = useState(startingEnemyCharacters)


    const [ selectedCharacter, setSelectedCharacter ] = useState(null)
    const [ currentPhase, setCurrentPhase ] = useState(null)



    const [ movableSquares, setMovableSquares ] = useState([])

    const calculateMovementLocations = (characterToMove, numberOfStepsAllowed) => {

        const boardWidth = 5
        const boardHeight = 5

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
        movableLocations.push(playerCharacters[characterToMove]["position"])

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

    return (
        <div>
            <p>GameScreen</p>
            <GameBoard 
                selectedCharacter={selectedCharacter} 
                currentPhase={currentPhase}
                // magicPosition={magicPosition}
                // healerPosition={healerPosition}
                // meleePosition={meleePosition}
                // setMagicPosition={setMagicPosition}
                // setHealerPosition={setHealerPosition}
                // setMeleePosition={setMeleePosition}
                movableSquares={movableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
                enemyCharacters={enemyCharacters}
            />
            <GameActionBar 
                setSelectedCharacter={setSelectedCharacter} 
                currentPhase={currentPhase} 
                setCurrentPhase={setCurrentPhase}
                calculateMovementLocations={calculateMovementLocations}
                setMovableSquares={setMovableSquares}
                playerCharacters={playerCharacters}
                setPlayerCharacters={setPlayerCharacters}
            />

            {/* <View style={styles.thing}></View>
            <View style={styles.thing}></View>
            <View style={styles.thing}></View> */}
        </div>
    )

}

export default GameScreen

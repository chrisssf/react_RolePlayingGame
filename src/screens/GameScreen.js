import React, { useState } from 'react';

import GameBoard from '../components/GameBoard'
import GameActionBar from '../components/GameActionBar'

const GameScreen = () =>{

    // const [ magicPosition, setMagicPosition ] = useState(16)
    // const [ meleePosition, setMeleePosition ] = useState(11)
    // const [ healerPosition, setHealerPosition ] = useState(6)

    let startingPlayerCharacters = {
        meleePlayer: {
            position: 11,
            type: "Knight",
            name: "Jeff"
        },
        magicPlayer: {
            position: 16,
            type: "Mage",
            name: "Dave"
        },
        healerPlayer: {
            position: 6,
            type: "Priest",
            name: "Bob"
        }
    }

    const [ playerCharacters, setPlayerCharacters ] = useState(startingPlayerCharacters)


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

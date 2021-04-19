import React, {useRef} from 'react';
import './GameBoard.css'

import GameSquare from './GameSquare.js'

const GameBoard = ({ 
    selectedCharacter,
    setSelectedCharacter,
    currentPhase, 
    setCurrentPhase,
    movableSquares,
    attackableSquares,
    playerCharacters,
    setPlayerCharacters,
    enemyCharacters,
    setEnemyCharacters,
    handleImageClick,
    usedCharacters,
    setUsedCharacters,
    setAttackableSquares,
    displayStatusEffects }) => {


    const myRefs = useRef([])

    const fillGameBoard = () => {

        const gameSquares = []
        for ( let i = 1; i < 26; i++ ) {
            gameSquares.push(<GameSquare 
                ref={() => (myRefs.current[i] = "bob")}

                key={i} 
                squareNumber={i} 
                currentPhase={currentPhase}
                setCurrentPhase={setCurrentPhase}
                selectedCharacter={selectedCharacter}
                setSelectedCharacter={setSelectedCharacter}
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
            />)
        }   
        return gameSquares  
    }

    return (
        <div>
            <p>GameBoard</p>
            <div className="board-container">
                {fillGameBoard()}
            </div>
        </div>
    )
}

export default GameBoard
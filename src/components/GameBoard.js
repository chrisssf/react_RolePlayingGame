import React, { useState } from 'react';
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
    handleImageClick,
    usedCharacters,
    setUsedCharacters,
    setAttackableSquares }) => {


    const fillGameBoard = () => {

        const gameSquares = []
        for ( let i = 1; i < 26; i++ ) {
            gameSquares.push(<GameSquare 
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
                handleImageClick={handleImageClick}
                usedCharacters={usedCharacters}
                setUsedCharacters={setUsedCharacters}
                setAttackableSquares={setAttackableSquares}
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
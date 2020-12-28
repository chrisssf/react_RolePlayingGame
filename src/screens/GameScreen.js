import React, { useState } from 'react';

import GameBoard from '../components/GameBoard'
import GameActionBar from '../components/GameActionBar'

const GameScreen = () =>{

    const [ selectedCharacter, setSelectedCharacter ] = useState(null)
    const [ currentPhase, setCurrentPhase ] = useState(null)

    return (
        <div>
            <p>GameScreen</p>
            <GameBoard 
                selectedCharacter={selectedCharacter} 
                currentPhase={currentPhase}
            />
            <GameActionBar 
                setSelectedCharacter={setSelectedCharacter} 
                currentPhase={currentPhase} 
                setCurrentPhase={setCurrentPhase}
            />

            {/* <View style={styles.thing}></View>
            <View style={styles.thing}></View>
            <View style={styles.thing}></View> */}
        </div>
    )

}

export default GameScreen

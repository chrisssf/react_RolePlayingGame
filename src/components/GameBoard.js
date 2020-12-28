import React, { useState } from 'react';
import './GameBoard.css'
// import { StyleSheet, Text, View, FlatList, Modal } from 'react-native';

import GameSquare from './GameSquare.js'

const GameBoard = ({ meleePosition, magicPosition, healerPosition, selectedCharacter, currentPhase, movableSquares }) => {


    const fillGameBoard = () => {

        const playerPositions = [magicPosition, meleePosition, healerPosition]
        console.log(playerPositions);
        
        const gameSquares = []
        for ( let i = 1; i < 26; i++ ) {
            gameSquares.push(<GameSquare key={i} playerPositions={playerPositions} squareNumber={i} movableSquares={movableSquares}/>)
        }   
        return gameSquares  
    }

    

    return (
        <div>
        {/* <div style={styles.container}> */}

            <p>GameBoard</p>
            {/* <div style={styles.boardContainer}> */}
            <div className="board-container">
                {fillGameBoard()}
            </div>
            {/* <Modal
                // style={{height: 50, width: 50}}
                // animationType="slide"
                transparent={true}
                visible={false}
                // onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                // }}
            >  
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    backgroundColor: '#00000080',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View style={{
                        width: 300,
                        height: 500,
                        backgroundColor: '#fff', 
                        padding: 20}}>
                            
                        <Text>Hi</Text>
                    
                    </View>
                </View> */}
                {/* <View style={{height: 70, width:50}}>
                    <Text>Hi</Text>
                </View> */}
            {/* </Modal> */}

        </div>
    )

}

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
        

//         // backgroundColor: '#fff',
//         // alignItems: 'center',
//         // justifyContent: 'center',
//     },
//     boardContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         maxWidth: 425,
//         // backgroundColor: '#fff',
//         // alignItems: 'center',
//         // justifyContent: 'center',
//     },
// });

export default GameBoard
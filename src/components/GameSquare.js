import React, { useState, useEffect } from 'react';
import './GameSquare.css'
import mageImage from '../assets/mage.png'
import knightImage from '../assets/knight.png'
import healerImage from '../assets/healer.png'


// import { StyleSheet, Text, View, Dimensions, Image, Modal } from 'react-native';

// import Modal from 'modal-enhanced-react-native-web';
// import Modal from 'modal-react-native-web'


import boardImages from '../assets/boardImages'


// const width = Dimensions.get('window').width
const width = window.innerWidth


const GameSquare = ({ 
    squareNumber, 
    // playerPositions, 
    movableSquares, 
    selectedCharacter,
    meleePosition,
    magicPosition,
    healerPosition,
    setMeleePosition, 
    setMagicPosition, 
    setHealerPosition, }) =>{

    const [ image, setImage ] = useState(null)
    // const [ modalVisable, setModalVisable ] = useState(false)
    const [ squareStyling, setSquareStyling ] = useState("")

    const mage = {
        "image": "mage",
        "maxHp": 10,
        "currentHp": 6,
        "baseAttack": 8, 
        "equipedWeapon": null,
        "inventory": null,
        "spells": null
    }

    

    useEffect(() => {
        if (magicPosition === squareNumber) {
            // setImage(mage.image)
            // setImage('../assets/mage.png')
            setImage(mageImage)
        } else if (meleePosition === squareNumber) {
            // setImage("knight")
            // setImage('../assets/knight.png')
            setImage(knightImage)
        } else if (healerPosition === squareNumber) {
            setImage(healerImage) 
        } else {
            setImage(null)
        }

        // if (squareNumber === 3){
        //     setModalVisable(true)
        // }
    }, [magicPosition, meleePosition, healerPosition])


    useEffect(() => {
        if ( image === null && movableSquares.includes(squareNumber) ) {
            setSquareStyling("movable")
        } else {
            setSquareStyling("")
        }
    }, [movableSquares])

    const handleClickSquare = () => {
        if ( squareStyling === "movable"){
            switch (selectedCharacter) {
                case "meleePlayer":
                    setMeleePosition(squareNumber)
                    break
                case "magicPlayer":
                    setMagicPosition(squareNumber)
                    break
                case "healerPlayer":
                    setHealerPosition(squareNumber)
                    break
            }
        }
    }
    
    if (width > 500) {
        return (
            <div onClick={() => handleClickSquare()} className={`bigger-square-container ${squareStyling}`}>
                {image ? <img src={image} alt={image} className="game-square-image"></img> : <p>{squareNumber}</p>}
                {/* <p>{squareNumber}</p>
                {image && <img src={image} alt={image} className="game-square-image"></img>} */}

                {/* {image && <Image
                    style={{
                        width: 80,
                        height: 80,
                        // alignSelf: "center",
                        // justifyContent: "center"
                        // borderRadius: 20,
                        // marginTop: 10,
                        // marginHorizontal: 16
                    }}
                    // source={require("../assets/knight.png")}
                    source={boardImages[image]}
                    // source={{uri: animalImageURL}}
                />} */}

                {/* <Modal
                    style={{height: 500, width: 100}}
                    // animationType="slide"
                    // transparent={true}
                    visible={true}
                    // onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    // }}
                >
                    <Text>Hi</Text>
                </Modal> */}
            </div>
        )
        
    } else {
        return (
            // <div style={styles.container}>
            <div onClick={() => handleClickSquare()} className={`smaller-square-container ${squareStyling}`}>

                {/* <p>{squareNumber}</p> */}
                {image ? <img src={image} alt={image} className="game-square-image"></img> : <p>{squareNumber}</p>}

                {/* {image && <Image
                    style={{
                        width: width/5 - 15,
                        height: width/5 - 15,
                        // alignSelf: "center",
                        // justifyContent: "center"
                        // borderRadius: 20,
                        // marginTop: 10,
                        // marginHorizontal: 16
                    }}
                    // source={require("../assets/knight.png")}
                    source={boardImages[image]}
                    // source={{uri: animalImageURL}}
                />} */}
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
                    // backgroundColor: '#00000080',
                    backgroundColor: 'rgba(80,80,80,0.09)',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <View style={{
                        width: 300,
                        height: 500,
                        backgroundColor: '#fff', 
                        padding: 20}}>
                            
                    <Text>Hi {console.log("in modal", modalVisable + " " + squareNumber)
                    }</Text>
                    
                    </View>
                </View> */}
                {/* <View style={{height: 70, width:50}}>
                    <Text>Hi</Text>
                </View> */}
            {/* </Modal> */}
{/* <Modal
                    style={{height: 50, width: 10}}
                    // animationType="slide"
                    // transparent={true}
                    visible={false}
                    // onRequestClose={() => {
                    // Alert.alert("Modal has been closed.");
                    // }}
                >
                    <Text>Hi</Text>
                </Modal> */}
            </div>
        )
    }

}

// const styles = StyleSheet.create({
//     container: {
//         // flex: 1,
//     //   border: '1 solid black',
//         // borderColor: 'black',
//         borderWidth: 1,
//         // borderStyle: 'solid',
//         width: width/5 - 15,
//         height: width/5 - 15

//         // backgroundColor: '#fff',
//         // alignItems: 'center',
//         // justifyContent: 'center',
//     },
//     biggerContainer: {
//         borderWidth: 1,
//         width: 85,
//         height: 85,

//     },
//   });

export default GameSquare


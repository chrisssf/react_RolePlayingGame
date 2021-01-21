import React, { useState, useEffect, useRef } from 'react';
import './GameSquare.css'
import mageImage from '../assets/mage.png'
import knightImage from '../assets/knight.png'
import healerImage from '../assets/healer.png'
import orcImage from '../assets/orc.png'


// import { StyleSheet, Text, View, Dimensions, Image, Modal } from 'react-native';

// import Modal from 'modal-enhanced-react-native-web';
// import Modal from 'modal-react-native-web'


import boardImages from '../assets/boardImages'


// const width = Dimensions.get('window').width
const width = window.innerWidth
// let character = null


const GameSquare = ({ 
    squareNumber, 
    // playerPositions, 
    movableSquares, 
    attackableSquares,
    selectedCharacter,
    // meleePosition,
    // magicPosition,
    // healerPosition,
    // setMeleePosition, 
    // setMagicPosition, 
    // setHealerPosition,
    playerCharacters,
    setPlayerCharacters,
    enemyCharacters,
    handleImageClick
 }) =>{

    const [ image, setImage ] = useState(null)
    // const [ modalVisable, setModalVisable ] = useState(false)
    const [ squareStyling, setSquareStyling ] = useState("")
    const [ character, setCharacter ] = useState(null)

//test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // const [ fing, setFing ] = useState("meleePlayer")
    // const meleeRef = useRef()
    // const magicRef = useRef()
    // const healerRef = useRef()
    // const characterRef = useRef()

    // const handleImageClick = (character) => {
    //     meleeRef.current.classList.add("blah")
    // }

    // let makeRef = meleeRef
//test end here!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    // const mage = {
    //     "image": "mage",
    //     "maxHp": 10,
    //     "currentHp": 6,
    //     "baseAttack": 8, 
    //     "equipedWeapon": null,
    //     "inventory": null,
    //     "spells": null
    // }

    // useEffect(() => {
    //     if (magicPosition === squareNumber) {
    //         // setImage(mage.image)
    //         // setImage('../assets/mage.png')
    //         setImage(mageImage)
    //     } else if (meleePosition === squareNumber) {
    //         // setImage("knight")
    //         // setImage('../assets/knight.png')
    //         setImage(knightImage)
    //     } else if (healerPosition === squareNumber) {
    //         setImage(healerImage) 
    //     } else {
    //         setImage(null)
    //     }

    //     // if (squareNumber === 3){
    //     //     setModalVisable(true)
    //     // }
    // }, [magicPosition, meleePosition, healerPosition])
    
    useEffect(() => {
        if (playerCharacters["magicPlayer"]["position"] === squareNumber) {
            // setImage(mage.image)
            // setImage('../assets/mage.png')
            setCharacter(playerCharacters["magicPlayer"])
            console.log("IMAAAAAAAGE", character)
            setImage(mageImage)
        } else if (playerCharacters["meleePlayer"]["position"] === squareNumber) {
            // setImage("knight")
            // setImage('../assets/knight.png')
            setCharacter(playerCharacters["meleePlayer"])
            setImage(knightImage)
        } else if (playerCharacters["healerPlayer"]["position"] === squareNumber) {
            setCharacter(playerCharacters["healerPlayer"])
            setImage(healerImage) 
        } else {
            setImage(null)
        }
        if (enemyCharacters["enemy1"]["position"] === squareNumber){
            setCharacter(enemyCharacters["enemy1"])
            setImage(orcImage)
        } else if (enemyCharacters["enemy2"]["position"] === squareNumber){
            setCharacter(enemyCharacters["enemy2"])
            setImage(orcImage)
        } else if (enemyCharacters["enemy3"]["position"] === squareNumber){
            setCharacter(enemyCharacters["enemy3"])
            setImage(orcImage)
        } 

        // if (squareNumber === 3){
        //     setModalVisable(true)
        // }
    }, [playerCharacters, enemyCharacters])
    
    // useEffect(() =>{
    //     if (enemyCharacters["one"]["position"] === squareNumber){
    //         setImage(orcImage)
    //     }
    // }, [enemyCharacters, playerCharacters])


    useEffect(() => {
        let currentImage = null
        switch (selectedCharacter) {
            case "meleePlayer":
                currentImage = knightImage
                break
            case "magicPlayer":
                currentImage = mageImage
                break
            case "healerPlayer":
                currentImage = healerImage
                break
        }
        if (( image === null || image === currentImage ) && movableSquares.includes(squareNumber) ) {
            setSquareStyling("movable")
        } else if (attackableSquares.includes(squareNumber)) {
            setSquareStyling("attackable")
        } else {
            setSquareStyling("")
        }
    }, [movableSquares, attackableSquares])

    const [ refresh, setRefresh ] = useState(false)

    const handleClickSquare = () => {
        if ( squareStyling === "movable"){
            // switch (selectedCharacter) {
            //     case "meleePlayer":
            //         setMeleePosition(squareNumber)
            //         break
            //     case "magicPlayer":
            //         setMagicPosition(squareNumber)
            //         break
            //     case "healerPlayer":
            //         setHealerPosition(squareNumber)
            //         break
            // }
            //BROKEN!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // console.log("BEFOREEEEEE", playerCharacters)
            // const tempPlayerCharacters = JSON.parse(JSON.stringify(playerCharacters))
            // console.log("AFTERRRRRRR", tempPlayerCharacters)
            // tempPlayerCharacters[selectedCharacter]["position"] = squareNumber
            // setPlayerCharacters(tempPlayerCharacters)

            // ATTEMP TO FIX!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            // playerCharacters[selectedCharacter]["position"] = squareNumber
            const updateableCharacter = playerCharacters[selectedCharacter]
            updateableCharacter.position = squareNumber
            setPlayerCharacters(prevState => ({...prevState, [selectedCharacter]: updateableCharacter }))

        } else if ( squareStyling === "attackable" && image !== null) {
            console.log("eeeee1", character)
            console.log("qqqqqq", playerCharacters[selectedCharacter])
            playerCharacters[selectedCharacter].attack(character)
            console.log("eeeee2", character)
        }
    }

    
    
    if (width > 500) {
        return (
            <div onClick={() => handleClickSquare()} className={`bigger-square-container ${squareStyling}`}>
                {image ? 
                    <img src={image} alt={image} className="game-square-image" onClick={() => handleImageClick(character)}></img> 
                : 
                    <p>{squareNumber}</p>
                    // <p></p>

                }
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
                {image ? 
                    <img src={image} alt={image} className="game-square-image" onClick={() => handleImageClick(character)}></img> 
                :
                    <p>{squareNumber}</p>
                    // <p></p>
                }

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


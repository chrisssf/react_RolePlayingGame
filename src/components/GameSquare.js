import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import './GameSquare.css'
import mageImage from '../assets/mage.png'
import knightImage from '../assets/knight.png'
import healerImage from '../assets/healer.png'
import orcImage from '../assets/orc.png'

// import boardImages from '../assets/boardImages'

const width = window.innerWidth


const GameSquare = ({ 
    squareNumber, 
    setCurrentPhase,
    movableSquares, 
    attackableSquares,
    selectedCharacter,
    setSelectedCharacter,
    playerCharacters,
    setPlayerCharacters,
    enemyCharacters,
    handleImageClick,
    usedCharacters,
    setUsedCharacters,
    setAttackableSquares
 }) =>{

    const [ image, setImage ] = useState(null)
    const [ squareStyling, setSquareStyling ] = useState("")
    const [ character, setCharacter ] = useState(null)
    const [ modalIsOpen, setModalIsOpen ] = useState(false)

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

    useEffect(() => {
        if (playerCharacters["magicPlayer"]["position"] === squareNumber) {
            setCharacter(playerCharacters["magicPlayer"])
            setImage(mageImage)
        } else if (playerCharacters["meleePlayer"]["position"] === squareNumber) {
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
    }, [playerCharacters, enemyCharacters])

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
        } else if ( attackableSquares.includes(squareNumber) && selectedCharacter === "healerPlayer" && 
        playerCharacters["healerPlayer"]["equippedHeal"] !== null ){
            if ( !(enemyCharacters["enemy1"]["position"] === squareNumber || 
                    enemyCharacters["enemy2"]["position"] === squareNumber || 
                    enemyCharacters["enemy3"]["position"] === squareNumber) 
            ) setSquareStyling("healable")
            else setSquareStyling("")
        } else if (attackableSquares.includes(squareNumber) && !(
            playerCharacters["magicPlayer"]["position"] === squareNumber ||
            playerCharacters["healerPlayer"]["position"] === squareNumber ||
            playerCharacters["meleePlayer"]["position"] === squareNumber )) {
                // if (selectedCharacter === "healerPlayer" && playerCharacters["healerPlayer"]["equippedHeal"] !== null) { 
                    setSquareStyling("attackable")
                // }
        } else if ( attackableSquares.includes(squareNumber) && 
            ( selectedCharacter === "healerPlayer" && playerCharacters["healerPlayer"]["equippedHeal"] === null)
            && !(
                playerCharacters["magicPlayer"]["position"] === squareNumber ||
                playerCharacters["healerPlayer"]["position"] === squareNumber ||
                playerCharacters["meleePlayer"]["position"] === squareNumber )) {
            setSquareStyling("attackable")
        } else {
            setSquareStyling("")
        }
        if (selectedCharacter === "healerPlayer" && 
        playerCharacters["healerPlayer"]["equippedHeal"] !== null && 
        playerCharacters["healerPlayer"]["position"] === squareNumber){
            setSquareStyling("healable")
        }
    }, [movableSquares, attackableSquares, playerCharacters, selectedCharacter])

    
    const handleClickSquare = () => {
        if ( squareStyling === "movable"){
            const updateableCharacter = playerCharacters[selectedCharacter]
            updateableCharacter.position = squareNumber
            setPlayerCharacters(prevState => ({...prevState, [selectedCharacter]: updateableCharacter }))
        } else if ( squareStyling === "attackable" && image !== null) {
            setModalIsOpen(true)
        } else if ( squareStyling === "healable" && image !== null ){
            setModalIsOpen(true)
        }
    }

    const handleModalAttack = () => {
        setModalIsOpen(false)
        playerCharacters[selectedCharacter].attack(character)
        setCurrentPhase("characterTurnSelect")
        setSelectedCharacter(null)
        const updatedUsedCharacters = [...usedCharacters, selectedCharacter]
        setUsedCharacters(updatedUsedCharacters)
        setAttackableSquares([])
    }


    return (
        <>
            <div onClick={() => handleClickSquare()} className={width > 500 ? `bigger-square-container ${squareStyling}` : `smaller-square-container ${squareStyling}` }>
                {image ? 
                    <img src={image} alt={image} className="game-square-image" onClick={() => handleImageClick(character)}></img> 
                : 
                    <p>{squareNumber}</p>
                    // <p></p>
                }
            </div>
            {character && selectedCharacter && <Modal
                className="modal-container"
                appElement={document.getElementById('root')}
                isOpen={modalIsOpen}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }
                }}
                >
                {playerCharacters["healerPlayer"]["equippedHeal"] !== null ? <p>Heal {character.name} with {playerCharacters["healerPlayer"]["equippedHeal"].name}</p> : 
                <p>Attack {character.name} with {playerCharacters[selectedCharacter].type}?</p>}
                {selectedCharacter === "meleePlayer" && playerCharacters[selectedCharacter].equippedWeapon && <p>Current equipped Weapon is {playerCharacters[selectedCharacter].equippedWeapon.name}</p>}
                {selectedCharacter === "magicPlayer" && playerCharacters[selectedCharacter].equippedSpell && <p>Current equipped Spell is {playerCharacters[selectedCharacter].equippedSpell.name}</p>}
                {selectedCharacter === "healerPlayer" && playerCharacters[selectedCharacter].equippedHeal && <p>Current equipped heal is {playerCharacters[selectedCharacter].equippedHeal.name}</p>}
                <p>This will end this characters turn</p>
                <button onClick={() => handleModalAttack()}>Yes</button>
                <button onClick={() => setModalIsOpen(false)}>No</button>
            </Modal>}
        </>
    )
}

export default GameSquare


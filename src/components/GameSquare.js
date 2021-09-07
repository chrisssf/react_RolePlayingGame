import React, { useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom'
// import Modal from 'react-modal'
import './GameSquare.css'
import CharacterInfoModal from '../components/CharacterInfoModal.js'
import RewardModal from '../components/RewardModal.js'
import mageImage from '../assets/mage.png'
import knightImage from '../assets/knight.png'
import priestImage from '../assets/priest.png'
import orcImage from '../assets/orc.png'

import sword from '../assets/axe.png'
import EquipModal from './EquipModal.js' // REMOVE OR FIX


// import boardImages from '../assets/boardImages'

const width = window.innerWidth


const GameSquare = ({ 
// ref,

    squareNumber, 
    currentPhase,
    setCurrentPhase,
    movableSquares, 
    attackableSquares,
    selectedCharacter,
    setSelectedCharacter,
    playerCharacters,
    setPlayerCharacters,
    enemyCharacters,
    setEnemyCharacters,
    handleImageClick,
    usedCharacters,
    setUsedCharacters,
    setAttackableSquares,
    displayStatusEffects,
    allChestStatus,
    setAllChestStatus,
    currentMapArea,
    weaponsCollection,
    spellsCollection,
    healsCollection,
    handleOpenMap
 }) =>{

    // TRYING TO GET REFS WORKING!!!!!!!!!!!!!!!
    // 1
    // console.log("REF!!!!", ref)

    // 2
    // const testImage = useRef()



    // TRYING TO GET REFS WORKING!!!!!!!!!!!!!!! TO HERE
    


    const [ image, setImage ] = useState(null)
    const [ squareStyling, setSquareStyling ] = useState("")
    const [ character, setCharacter ] = useState(null)
    const [ modalIsOpen, setModalIsOpen ] = useState(false)
    const [ rewardModalIsOpen, setRewardModalIsOpen ] = useState(false)
    const [randomWeapon, setRandomWeapon ] = useState(null)
    const [randomSpell, setRandomSpell ] = useState(null)
    const [randomHeal, setRandomHeal ] = useState(null)

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


// Trying animation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const testImage = useRef()

const up = () => {
    testImage.current.classList.toggle("up")
    testImage.current.classList.toggle("hidden")
    setTimeout(() => {
        testImage.current.classList.toggle("up")
        testImage.current.classList.toggle("hidden")
    }, 501)
}
const down = () => {
    testImage.current.classList.toggle("down")
    testImage.current.classList.toggle("hidden")
    setTimeout(() => {
        testImage.current.classList.toggle("down")
        testImage.current.classList.toggle("hidden")
    }, 501)
}
const left = () => {
    testImage.current.classList.toggle("left")
    testImage.current.classList.toggle("hidden")
    setTimeout(() => {
        testImage.current.classList.toggle("left")
        testImage.current.classList.toggle("hidden")
    }, 501)
}
const right = () => {
    testImage.current.classList.toggle("right")
    testImage.current.classList.toggle("hidden")
    // setTimeout(() => {
    //     testImage.current.classList.toggle("right")
    //     testImage.current.classList.toggle("hidden")
    // }, 501)
}

// end animation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    useEffect(() => {
        if (playerCharacters["magicPlayer"]["position"] === squareNumber) {
            setCharacter(playerCharacters["magicPlayer"])
            setImage(mageImage)
        } else if (playerCharacters["meleePlayer"]["position"] === squareNumber) {
            setCharacter(playerCharacters["meleePlayer"])
            setImage(knightImage)
        } else if (playerCharacters["healerPlayer"]["position"] === squareNumber) {
            setCharacter(playerCharacters["healerPlayer"])
            setImage(priestImage) 
        } else {
            setImage(null)
        }
        // since adding id this could now be a loop!!!!!!!!!!!.......
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
                currentImage = priestImage
                break
            default:
                currentImage = null
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
            playerCharacters["healerPlayer"]["position"] === squareNumber && 
            currentPhase === "playerAttack"){
            setSquareStyling("healable")
        } 
    }, [movableSquares, attackableSquares, playerCharacters, currentPhase])


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
        // left()
    }

    const handleModalAttack = () => {
        setModalIsOpen(false)
        // setTimeout(() => {
        //     right()
        // }, 500)
        // setTimeout(() => {
            playerCharacters[selectedCharacter].attack(character, setEnemyCharacters)
            setCurrentPhase("characterTurnSelect")
            setSelectedCharacter(null)
            const updatedUsedCharacters = [...usedCharacters, selectedCharacter]
            setUsedCharacters(updatedUsedCharacters)
            setAttackableSquares([])
        // }, 1002)


    }

    const displayChest = () => {
        console.log("currentMapArea", currentMapArea);
        console.log("current chest status", allChestStatus[currentMapArea - 1]);
        if (allChestStatus[currentMapArea - 1] !== "" && allChestStatus[currentMapArea - 1].position === squareNumber){
            if(allChestStatus[currentMapArea - 1].status === "closed"){
                return <img src={require('../assets/closedchest.png').default} alt={"chest"}  className="chest-image" onClick={() => handleOpenChest()}></img>
            } else {
                return <img src={require('../assets/openchest.png').default} alt={"chest"}  className="chest-image"></img>
            }
        }
    }

    

    const handleOpenChest = () => {
        const chest = {status: "open", position: squareNumber}
        const allChestStatusForState = allChestStatus
        allChestStatusForState[currentMapArea - 1] = chest

        // const allChestStatusForState = allChestStatus.map((chestStatus, index) => {
        //     if ( currentMapArea === index + 1) return chest
        //     else return chestStatus
        // })

        if (randomHeal === null && randomSpell === null && randomWeapon === null) {
            const randomWeaponIndex = Math.floor(Math.random() * weaponsCollection.length)
            setRandomWeapon(weaponsCollection[randomWeaponIndex])

            const randomSpellIndex = Math.floor(Math.random() * spellsCollection.length)
            setRandomSpell(spellsCollection[randomSpellIndex])

            const randomHealIndex = Math.floor(Math.random() * healsCollection.length)
            setRandomHeal(healsCollection[0])
        }

        setAllChestStatus(allChestStatusForState)
        setTimeout(() => {
            setRewardModalIsOpen(true)
            allChestStatusForState[currentMapArea - 1] = {status: "closed", position: squareNumber}
            setAllChestStatus(allChestStatusForState)
            
        }, 400)

        
    }


    const displayImage = () => {
        let htmlToReturn = null
        if (image) {
            htmlToReturn = <>
                {/* <img src={image} alt={image} className="game-square-image" onClick={() => handleImageClick(character)}></img>  */}
                {/* <img src={require('../assets/' + item.name + '.png').default} alt={item.name} className="weapon-select-modal-image"></img>  */}

                {/* working in tests...... */}
                <img src={image} alt={"image"}  className="game-square-image" onClick={() => handleImageClick(character)}></img> 
                {/* <img src={sword} ref={testImage} alt={"image"}  className="test-image hidden"></img>  */}

            </>
         } else htmlToReturn = <p>{squareNumber}</p>
        return htmlToReturn
    }

    const displayAttackAnimationWithEquipped = () => {
        let equippedType = ""
        switch (selectedCharacter) {
            case "meleePlayer":
                equippedType = "equippedWeapon"
                break
            case "magicPlayer":
                equippedType = "equippedSpell"
                break
            case "healerPlayer":
                equippedType = "equippedHeal"
                break
            default:
                equippedType = ""
        }
        // let imageToReturn = null
        // if (equippedType === ""){
        //     imageToReturn = <img src={image} ref={testImage} alt={"image"}  className="test-image hidden"></img>
        // } else {
        //     imageToReturn = <img src={require('../assets/' + playerCharacters[selectedCharacter][equippedType].name + '.png').default} ref={testImage} alt={"image"}  className="test-image hidden"></img>     
        // }
        // return imageToReturn

        // return (
        //     <>
        //         {equippedType ? <img src={require('../assets/' + playerCharacters[selectedCharacter][equippedType].name + '.png').default} ref={testImage} alt={"image"}  className="test-image hidden"></img> 
        //         : <img src={image} ref={testImage} alt={"image"}  className="test-image hidden"></img>
        //         }
        //     </>
        // )

        return <img id={"equipped" + squareNumber} src={require('../assets/' + playerCharacters[selectedCharacter][equippedType].name + '.png').default} ref={testImage} alt={"image"}  className="test-image hidden"></img> 
    }

    const displayAttackAnimationNothingEquipped = () => {
        let equippedType = ""
        let attackingCharacterImage = null
        switch (selectedCharacter) {
            case "meleePlayer":
                equippedType = "equippedWeapon"
                attackingCharacterImage = knightImage
                break
            case "magicPlayer":
                equippedType = "equippedSpell"
                attackingCharacterImage = mageImage
                break
            case "healerPlayer":
                equippedType = "equippedHeal"
                attackingCharacterImage = priestImage
                break
            default:
                equippedType = ""
                attackingCharacterImage = null
        }
        if (playerCharacters[selectedCharacter][equippedType]) {
            return null
        } else {
            return <img src={attackingCharacterImage} ref={testImage} alt={"image"}  className="test-image hidden"></img>
        }
    }


    return (
        <>
        {/* getElementTesting HERE!!!!!!!!!!!!!!!!!!!!!!!!!! */}
            {/* <div id={squareNumber} onClick={() => handleClickSquare()} className={width > 500 ? `bigger-square-container ${squareStyling}` : `smaller-square-container ${squareStyling}` }> */}
            <div id={"square" + squareNumber} onClick={() => handleClickSquare()} className={width > 500 ? `bigger-square-container ${squareStyling}` : `smaller-square-container ${squareStyling}` }>
                {image ? 
                    <>
                        <progress id={"health" + squareNumber} value={character.healthPoints} max={character.maxHealthPoints} className="health-bar"></progress>
                        {character.statusEffects.find(status => status.effect === "shield") !== undefined && <img src={require('../assets/' + 'shield' + '.png').default} alt="shielded" className="shield-background" ></img>}
                        <img src={image} alt={image} className="game-square-image" onClick={() => handleImageClick(character)}></img> 
                        {/* <img src={sword} ref={testImage} alt={"image"}  className="test-image hidden"></img>  */}
                        
                        {/* {playerCharacters[selectedCharacter] && playerCharacters[selectedCharacter].equippedWeapon && <img src={require('../assets/' + playerCharacters[selectedCharacter].equippedWeapon.name + '.png').default} ref={testImage} alt={"image"}  className="test-image hidden"></img> } */}
                        {/* {playerCharacters[selectedCharacter] && displayAttackAnimationNothingEquipped() }
                        {selectedCharacter === "meleePlayer" && playerCharacters[selectedCharacter].equippedWeapon && displayAttackAnimationWithEquipped()}
                        {selectedCharacter === "magicPlayer" && playerCharacters[selectedCharacter].equippedSpell && displayAttackAnimationWithEquipped()}
                        {selectedCharacter === "healerPlayer" && playerCharacters[selectedCharacter].equippedHeal && displayAttackAnimationWithEquipped()} */}
                        {/* <img src={require('../assets/' + item.name + '.png').default} alt={item.name} className="weapon-select-modal-image"></img>  */}
                    </>
                : 
                    // THIS IS HELPFUL DURING DEVELOPMENT!!!!!!!!!!!!!!!!!!
                    // <p>{squareNumber}</p> 
                    null

                }

                {/* needs moved!!!!!!!!!!!!!!!!!!!! */}
                {/* <img src={sword} ref={testImage} alt={"image"}  className="test-image hidden"></img>  */}
                {/* {displayImage()} */}

                
                {/* <img src={require('../assets/' + 'orc' + '.png').default} id={"attackImage" + squareNumber} alt={"image"}  className="attack-image hidden"></img>  */}
                {/* starts with very small image as placeholder...... */}
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" id={"attackImage" + squareNumber} alt={"image"}  className="attack-image hidden"></img>
                {allChestStatus[currentMapArea - 1].position === squareNumber && displayChest()}
            </div>
            {/* {character && selectedCharacter && <Modal
                className="attack-modal-container"
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
            </Modal>} */}
            
            {character && selectedCharacter &&
            <CharacterInfoModal
                character={character}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                playerCharacters={playerCharacters}
                selectedCharacter={selectedCharacter}
                handleModalAttack={handleModalAttack}
                displayStatusEffects={displayStatusEffects}
            />}
            {randomSpell !== null && randomWeapon !== null && randomHeal !== null && <RewardModal 
                rewardModalIsOpen={rewardModalIsOpen}
                setRewardModalIsOpen={setRewardModalIsOpen}
                playerCharacters={playerCharacters}
                randomHeal={randomHeal}
                randomWeapon={randomWeapon}
                randomSpell={randomSpell}
                setPlayerCharacters={setPlayerCharacters}
                setAllChestStatus={setAllChestStatus}
                allChestStatus={allChestStatus}
                currentMapArea={currentMapArea}
                weaponsCollection={weaponsCollection}
                spellsCollection={spellsCollection}
                healsCollection={healsCollection}
                handleOpenMap={handleOpenMap}
            />}


            {/* REMOVE OR FIX */}
            {/* {selectedCharacter && <EquipModal 
                    equipModalIsOpen={equipModalIsOpen} 
                    setEquipModalIsOpen={setEquipModalIsOpen}
                    playerCharacters={playerCharacters}
                    setPlayerCharacters={setPlayerCharacters}
                    selectedCharacter={selectedCharacter}
            />} */}
        </>
    )
}

export default GameSquare


import Character from './Character.js'

function Enemy(name, attackPoints, healthPoints, position) {
    Character.call(this, name, attackPoints, healthPoints, position)

    // this.statusEffects = []
}

Enemy.prototype = Object.create(Character.prototype);
Object.defineProperty(Enemy.prototype, 'constructor', { 
    value: Enemy, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true 
});

const boardHeight = 5
const boardWidth = 5

Enemy.prototype.move = function (playerCharacters, enemyCharacters, setEnemyCharacters){

    const playerCharacterPositions = getPlayerPositions(playerCharacters)
    let enemyCharacterPositions = getEnemyPositions(enemyCharacters)
    enemyCharacterPositions = enemyCharacterPositions.filter(item => item !== this.position)
    const allCharacterPositions = [...playerCharacterPositions, ...enemyCharacterPositions]
    // checks, can delete these when done!!!!
    console.log("player positions in enemy", playerCharacterPositions)
    console.log("enemy positions in enemy", enemyCharacterPositions)
    console.log("all positions in enemy", allCharacterPositions)

    const attackablePositions = getAttackablePositions(playerCharacterPositions, allCharacterPositions)
    console.log("attackable positions = ", attackablePositions)

    const numberOfMovesToEachAttackablePosition = getNumberOfMovesToEachAttackablePosition(attackablePositions, this.position)
    console.log("numberOfMovesToEachAttackablePosition", numberOfMovesToEachAttackablePosition)

    // const {indexOfClosestAttackablePosition, movesToClosestAttackablePosition} = getIndexOfClosestAttackablePosition(numberOfMovesToEachAttackablePosition)    
    // console.log("indexOfClosestAttackablePosition", indexOfClosestAttackablePosition)
    // console.log("movesToClosestAttackablePosition", movesToClosestAttackablePosition)

    const moves = getIndexOfClosestAttackablePosition(numberOfMovesToEachAttackablePosition)
    console.log("moves", moves)

    // This moves straight to closest attack point!!!
    // let newPosition = this.position
    // if ( movesToClosestAttackablePosition <= 3) this.position = attackablePositions[indexOfClosestAttackablePosition]
    // return newPosition
    // return this



    // const moves = [-1, -5, 5]

    let tempEnemyCharacters = null
    if(moves.length <=3 ){
        moves.forEach((move, index) => {
            setTimeout(() => {
                this.position += move
                tempEnemyCharacters = JSON.parse(JSON.stringify(enemyCharacters))
                setEnemyCharacters(tempEnemyCharacters)
            }, 1000 * (index + 1))
        })
    }


    // let tempEnemyCharacters = null
    // setTimeout(() => {
    //     tempEnemyCharacters = JSON.parse(JSON.stringify(enemyCharacters))
    //     setEnemyCharacters(tempEnemyCharacters)
    // }, 1000)

}

const getPlayerPositions = (playerCharacters) => {
    const playerPositions = []
    playerPositions.push(playerCharacters.meleePlayer.position)
    playerPositions.push(playerCharacters.magicPlayer.position)
    playerPositions.push(playerCharacters.healerPlayer.position)
    return playerPositions
}

const getEnemyPositions = (enemyCharacters) => {
    const enemyPositions = []
    enemyPositions.push(enemyCharacters.enemy1.position)
    enemyPositions.push(enemyCharacters.enemy2.position)
    enemyPositions.push(enemyCharacters.enemy3.position)
    return enemyPositions

}

const getAttackablePositions = (playerCharacterPositions, allCharacterPositions) => {
    const attackablePositions = []
    playerCharacterPositions.forEach(playerCharacterPosition => {
        const currentRow = Math.ceil(playerCharacterPosition / boardWidth)
        if ((playerCharacterPosition + boardWidth) < (boardHeight * boardWidth) && !allCharacterPositions.includes(playerCharacterPosition + boardWidth) && !attackablePositions.includes(playerCharacterPosition + boardWidth)) attackablePositions.push(playerCharacterPosition + boardWidth)
        if ((playerCharacterPosition - boardWidth) > 0 && !allCharacterPositions.includes(playerCharacterPosition - boardWidth) && !attackablePositions.includes(playerCharacterPosition - boardWidth)) attackablePositions.push(playerCharacterPosition - boardWidth)
        const nextSquareRow = Math.ceil(((playerCharacterPosition + 1) / boardWidth))
        if ( nextSquareRow === currentRow && !allCharacterPositions.includes(playerCharacterPosition + 1) && !attackablePositions.includes(playerCharacterPosition + 1)) attackablePositions.push(playerCharacterPosition + 1)
        const previousSquareRow = Math.ceil(((playerCharacterPosition - 1) / boardWidth))
        if ( previousSquareRow === currentRow && !allCharacterPositions.includes(playerCharacterPosition - 1) && !attackablePositions.includes(playerCharacterPosition - 1)) attackablePositions.push(playerCharacterPosition - 1)
    })
    return attackablePositions
}

const getNumberOfMovesToEachAttackablePosition = (attackablePositions, currentPosition) => {
    const numberOfMovesToEachAttackablePosition = attackablePositions.map((attackablePosition) => {
        const enemyRow = Math.ceil(currentPosition / boardWidth)
        const attackablePositionRow = Math.ceil(attackablePosition / boardWidth)
        const rowDifference = Math.abs(enemyRow - attackablePositionRow)
        let adjustedEnemyPosition = currentPosition
        if ( attackablePosition < currentPosition) adjustedEnemyPosition = currentPosition - boardWidth * rowDifference
        else if ( attackablePosition > currentPosition) adjustedEnemyPosition = currentPosition + boardWidth * rowDifference
        const numberOfMovesRequired = Math.abs(adjustedEnemyPosition - attackablePosition) + rowDifference
        
        // GETTING PATH BIT!!!!!!!
        let movementPath = []

        const rowws = enemyRow - attackablePositionRow
        console.log("rowws", rowws)

        // if ( rowws < 0 ) movementPath = [...movementPath, Array(Math.abs(rowws)).fill(-5)]
        // else if(rowws > 0) movementPath = [...movementPath, Array(Math.abs(rowws)).fill(5)]

        if ( rowws < 0 ) movementPath = [...Array(Math.abs(rowws)).fill(5)]
        else if(rowws > 0) movementPath = [...Array(Math.abs(rowws)).fill(-5)]
        
        console.log("movementPath1", movementPath)


        const cols = adjustedEnemyPosition - attackablePosition
        if ( cols < 0 ) movementPath = [...movementPath, ...Array(Math.abs(cols)).fill(1)]
        else if(cols > 0) movementPath = [...movementPath, ...Array(Math.abs(cols)).fill(-1)]
        console.log("cols", cols)
        console.log("movementPath2", movementPath)

        //TO HERE!!!!!!!!!!!!
        
        // return numberOfMovesRequired
        return movementPath
    })
    console.log("numberOfMovesToEachAttackablePosition", numberOfMovesToEachAttackablePosition)
    return numberOfMovesToEachAttackablePosition
}

const getIndexOfClosestAttackablePosition = (numberOfMovesToEachAttackablePosition) => {
    // let indexOfClosestAttackablePosition = null
    // let movesToClosestAttackablePosition = 100
    // numberOfMovesToEachAttackablePosition.forEach((movesToAttackablePosition, index) =>{
    //     if (movesToAttackablePosition < movesToClosestAttackablePosition){
    //         movesToClosestAttackablePosition = movesToAttackablePosition
    //         indexOfClosestAttackablePosition = index
    //     }
    // })
    // return {
    //     indexOfClosestAttackablePosition: indexOfClosestAttackablePosition , 
    //     movesToClosestAttackablePosition: movesToClosestAttackablePosition
    // }
    let indexOfClosestAttackablePosition = null
    let movesToClosestAttackablePosition = numberOfMovesToEachAttackablePosition[0]
    numberOfMovesToEachAttackablePosition.forEach((movesToAttackablePosition, index) =>{
        if (movesToAttackablePosition.length < movesToClosestAttackablePosition.length){
            movesToClosestAttackablePosition = movesToAttackablePosition
            indexOfClosestAttackablePosition = index
        }
    })
    // return {
    //     indexOfClosestAttackablePosition: indexOfClosestAttackablePosition , 
    //     movesToClosestAttackablePosition: movesToClosestAttackablePosition
    // }
    return movesToClosestAttackablePosition
}

export default Enemy
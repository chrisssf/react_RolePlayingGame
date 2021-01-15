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

Enemy.prototype.move = function (playerCharacters, enemyCharacters){


    const playerCharacterPositions = getPlayerPositions(playerCharacters)
    const enemyCharacterPositions = getEnemyPositions(enemyCharacters)
    const allCharacterPositions = [...playerCharacterPositions, ...enemyCharacterPositions]

    // checks, can delete these when done!!!!
    console.log("player positions in enemy", playerCharacterPositions)
    console.log("enemy positions in enemy", enemyCharacterPositions)
    console.log("all positions in enemy", allCharacterPositions)

    const attackablePositions = getAttackablePositions(playerCharacterPositions, allCharacterPositions)
    console.log("attackable positions = ", attackablePositions)



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
    enemyPositions.push(enemyCharacters.one.position)
    // enemyPositions.push(enemyCharacters.two.position)
    // enemyPositions.push(enemyCharacters.three.position)
    return enemyPositions

}

const getAttackablePositions = (playerCharacterPositions, allCharacterPositions) => {
    const boardHeight = 5
    const boardWidth = 5
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


// const calculateMovementLocations = (characterToMove, numberOfStepsAllowed) => {

//     const boardWidth = 5
//     const boardHeight = 5

//     const movableLocations = []
//     movableLocations.push(playerCharacters[characterToMove]["position"])

//     for (let i = 1; i <= numberOfStepsAllowed; i++){
//         movableLocations.forEach( movableLocation => {
//             const currentRow = Math.ceil(movableLocation / boardWidth)
//             // if ((movableLocation + boardWidth) < (boardWidth * boardHeight) && !movableLocations.includes(movableLocation + boardWidth)) movableLocations.push(movableLocation + boardWidth)
//             if ((movableLocation + boardWidth) < (boardWidth * boardHeight)) {
//                 if (!movableLocations.includes(movableLocation + boardWidth)) movableLocations.push(movableLocation + boardWidth)
//             } 
//             if ((movableLocation - boardWidth) > 0) {
//                 if (!movableLocations.includes(movableLocation - boardWidth)) movableLocations.push(movableLocation - boardWidth)
//             }
//             const nextSquareRow = Math.ceil(((movableLocation + 1) / boardWidth))
//             if (nextSquareRow === currentRow) {
//                 if (!movableLocations.includes(movableLocation + 1)) movableLocations.push(movableLocation + 1)
//             }
//             const previousSquareRow = Math.ceil(((movableLocation - 1) / boardWidth))
//             if (previousSquareRow === currentRow) {
//                 if (!movableLocations.includes(movableLocation - 1)) movableLocations.push(movableLocation - 1)
//             }
//         })
//     }
//     console.log(movableLocations)
//     setMovableSquares(movableLocations)
// }


export default Enemy
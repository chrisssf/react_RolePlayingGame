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

// when setting EnemyCharacters, dont get the character from state, change it using "this." then 
// set using this.name: this   !!!!!!!!!!!!!!!!!!! a decent amount of refactoring would be required for this!
Enemy.prototype.takeTurn = function (playerCharacters, enemyCharacters, setEnemyCharacters){

    let cantAct = false
    let attackDown = false
    enemyCharacters[this.name].statusEffects.forEach(statusEffect => {
        if(statusEffect.effect === "freeze" || statusEffect.effect === "stun") cantAct = true
        else if (statusEffect.effect === "attack down" ) attackDown = true
    })

    //old code
    // if(enemyCharacters[this.name].statusEffects.includes("stun")){
    //     const updatableEnemy = enemyCharacters[this.name]
    //     updatableEnemy.statusEffects = updatableEnemy.statusEffects.filter(item => item !== "stun")
    //     setEnemyCharacters(prevState => ({...prevState, [this.name]: updatableEnemy}))
    //     console.log("STUNNNNNEEEEDDDDDD!!!!!!");
    if(cantAct) {
        console.log("stuned", enemyCharacters[this.name].statusEffects)
        updateStatusEffects(this.name, enemyCharacters, setEnemyCharacters)
    } else {
        const playerCharacterPositions = getPlayerPositions(playerCharacters)
        let enemyCharacterPositions = getEnemyPositions(enemyCharacters)
        enemyCharacterPositions = enemyCharacterPositions.filter(item => item !== enemyCharacters[this.name].position)
        const allCharacterPositions = [...playerCharacterPositions, ...enemyCharacterPositions]
        // checks, can delete these when done!!!!
        console.log("player positions in enemy", playerCharacterPositions)
        console.log("enemy positions in enemy", enemyCharacterPositions)
        console.log("all positions in enemy", allCharacterPositions)

        const attackablePositions = getAttackablePositions(playerCharacterPositions, allCharacterPositions)
        console.log("attackable positions = ", attackablePositions)

        const possibleAttackPaths = getPossibleAttackPaths(attackablePositions, enemyCharacters[this.name].position)
        console.log("possibleAttackPaths", possibleAttackPaths)

        const moves = getPathToClosestAttackablePosition(possibleAttackPaths)
        console.log("moves", moves)

        let finalPosition = this.position
        if(moves.length <=3 ){
            moves.forEach((move, index) => {
                setTimeout(() => {
                    const updatableEnemy = enemyCharacters[this.name]
                    updatableEnemy.position += move
                    setEnemyCharacters(prevState => ({...prevState, [this.name]: updatableEnemy}))
                }, 1000 * (index + 1))
            })
        }
        console.log("STATUS", enemyCharacters[this.name].statusEffects)
    
        // this is to attack after moving
        finalPosition = enemyCharacters[this.name].position + moves.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    
        const currentRow = Math.ceil(finalPosition / boardWidth)
        const meleePlayerRow = Math.ceil(playerCharacters.meleePlayer.position / boardWidth)
        const magicPlayerRow = Math.ceil(playerCharacters.magicPlayer.position / boardWidth)
        const healerPlayerRow = Math.ceil(playerCharacters.healerPlayer.position / boardWidth)

        // if(enemyCharacters[this.name].statusEffects.includes("attack down")){
        if(attackDown){
            this.attackPoints = this.attackPoints / 2
            // const updatableEnemy = enemyCharacters[this.name]
            // updatableEnemy.statusEffects = updatableEnemy.statusEffects.filter(item => item !== "attack down")
            // setEnemyCharacters(prevState => ({...prevState, [this.name]: updatableEnemy}))
        }

        if((playerCharacters.meleePlayer.position === finalPosition + 1 && currentRow === meleePlayerRow) || 
            (playerCharacters.meleePlayer.position === finalPosition - 1 && currentRow === meleePlayerRow) ||
            playerCharacters.meleePlayer.position === finalPosition + 5 ||
            playerCharacters.meleePlayer.position === finalPosition - 5 ) {
                setTimeout(() => { 
                    this.attack(playerCharacters.meleePlayer)
                }, 1000 * moves.length)
            }
        else if((playerCharacters.magicPlayer.position === finalPosition + 1 && currentRow === magicPlayerRow) || 
            (playerCharacters.magicPlayer.position === finalPosition - 1 && currentRow === magicPlayerRow) ||
            playerCharacters.magicPlayer.position === finalPosition + 5 ||
            playerCharacters.magicPlayer.position === finalPosition - 5 ) {
                setTimeout(() => { 
                    this.attack(playerCharacters.magicPlayer)
                }, 1000 * moves.length)
            }
        else if((playerCharacters.healerPlayer.position === finalPosition + 1 && currentRow === healerPlayerRow) || 
            (playerCharacters.healerPlayer.position === finalPosition - 1 && currentRow === healerPlayerRow )||
            playerCharacters.healerPlayer.position === finalPosition + 5 ||
            playerCharacters.healerPlayer.position === finalPosition - 5 ) {
                setTimeout(() => { 
                    this.attack(playerCharacters.healerPlayer)
                }, 1000 * moves.length)
            }
        
        updateStatusEffects(this.name, enemyCharacters, setEnemyCharacters)
        return moves.length * 1000
    }
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

const getPossibleAttackPaths = (attackablePositions, currentPosition) => {
    const possibleAttackPaths = attackablePositions.map((attackablePosition) => {
        const enemyRow = Math.ceil(currentPosition / boardWidth)
        const attackablePositionRow = Math.ceil(attackablePosition / boardWidth)
        const AbsoluteRowDifference = Math.abs(enemyRow - attackablePositionRow)
        let adjustedEnemyPosition = currentPosition
        if ( attackablePosition < currentPosition) adjustedEnemyPosition = currentPosition - boardWidth * AbsoluteRowDifference
        else if ( attackablePosition > currentPosition) adjustedEnemyPosition = currentPosition + boardWidth * AbsoluteRowDifference
        // const numberOfMovesRequired = Math.abs(adjustedEnemyPosition - attackablePosition) + AbsoluteRowDifference
        
        let movementPath = []
        const rowDifference = enemyRow - attackablePositionRow
        console.log("rowDifference", rowDifference)

        if ( rowDifference < 0 ) movementPath = [...Array(Math.abs(rowDifference)).fill(5)]
        else if(rowDifference > 0) movementPath = [...Array(Math.abs(rowDifference)).fill(-5)]

        console.log("movementPath1", movementPath)

        const columnDifference = adjustedEnemyPosition - attackablePosition
        if ( columnDifference < 0 ) movementPath = [...movementPath, ...Array(Math.abs(columnDifference)).fill(1)]
        else if(columnDifference > 0) movementPath = [...movementPath, ...Array(Math.abs(columnDifference)).fill(-1)]
        console.log("columnDifference", columnDifference)
        console.log("movementPath2", movementPath)

        return movementPath
    })
    console.log("possibleAttackPaths", possibleAttackPaths)
    return possibleAttackPaths
}

const getPathToClosestAttackablePosition = (possibleAttackPaths) => {
    let pathToClosestAttackablePosition = possibleAttackPaths[0]
    possibleAttackPaths.forEach(attackPath =>{
        if (attackPath.length < pathToClosestAttackablePosition.length){
            pathToClosestAttackablePosition = attackPath
        }
    })
    return pathToClosestAttackablePosition
}

const updateStatusEffects = (name, enemyCharacters, setEnemyCharacters) => {
    const updatedStatusEffects = []
    enemyCharacters[name].statusEffects.forEach(statusEffect => {
        statusEffect.duration -= 1
        if (statusEffect.duration > 0) updatedStatusEffects.push(statusEffect)
    })
    const updatableEnemy = enemyCharacters[name]
    updatableEnemy.statusEffects = updatedStatusEffects
    console.log("updatedStatusEffects", updatedStatusEffects);
    console.log("updatableEnemy", updatableEnemy);
    setEnemyCharacters(prevState => ({...prevState, [name]: updatableEnemy}))
}

export default Enemy
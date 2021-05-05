import Character from './Character.js'

function MeleePlayer(name, attackPoints, healthPoints, position, type) {
    Character.call(this, name, attackPoints, healthPoints, position)
    this.type = type
    this.equippedWeapon  = null
    this.weapons = []
    this.ultimateCharge = 0
    this.id = "meleePlayer"


    // this.statusEffects = []
}

MeleePlayer.prototype = Object.create(Character.prototype);
Object.defineProperty(MeleePlayer.prototype, 'constructor', { 
    value: MeleePlayer, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true 
});

MeleePlayer.prototype.attack = function (enemy, setEnemyCharacters){
    let damageDone = this.attackPoints
    const startingHealth = enemy.healthPoints;

    if(this.equippedWeapon) {
        damageDone += this.equippedWeapon.attackPower
        const randomNumber = Math.floor(Math.random() * 100) + 1
        switch(this.equippedWeapon.type){
            case("sword"):
                if(randomNumber <= this.equippedWeapon.activationChance) damageDone *= 2
                break
            case("axe"):
                // if(randomNumber <= 10) damageDone = startingHealth
                // else if(randomNumber <= 100) addEffectToTarget("attack down", enemy, 2) // should be <= 20
                if(randomNumber <= this.equippedWeapon.activationChance) Character.prototype.addEffectToTarget.call(this, this.equippedWeapon, enemy) // should be <= 20
                break
            case("club"):
                // if(randomNumber <= 100) addEffectToTarget("stun", enemy, 1) // should be <= 25
                if(randomNumber <= this.equippedWeapon.activationChance) Character.prototype.addEffectToTarget.call(this, this.equippedWeapon, enemy) // should be <= 25
                break
            default:
                console.log("no matching weapon");
        }
        console.log("weapon chance", this.equippedWeapon.activationChance);
        console.log("random chance", randomNumber);
    }
    // enemy.statusEffects.forEach(statusEffect => {
    //     if(statusEffect.effect === "armour down" ) damageDone *= 2
    // })
    // enemy.healthPoints = startingHealth - damageDone
    // if ( enemy.healthPoints <= 0) {
    //     enemy.position = 100
    //     setEnemyCharacters(prevState => ({...prevState, [enemy.id]: enemy }))   //here!
    // }
    Character.prototype.attack.call(this, enemy, setEnemyCharacters, damageDone)
}

// const addEffectToTarget = (effectName, enemy, duration) => {
//     let stillToAdd = true
//     const updatedEffects = enemy.statusEffects.map(statusEffect =>{
//         if( effectName === statusEffect.effect){
//             if(duration > statusEffect.duration) statusEffect.duration = duration
//             stillToAdd = false
//         }
//         return statusEffect
//     })
//     if (stillToAdd) enemy.statusEffects.push({effect: effectName, duration: duration})
//     else enemy.statusEffects = updatedEffects
// }

export default MeleePlayer
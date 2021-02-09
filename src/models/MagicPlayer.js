import Character from './Character.js'

function MagicPlayer(name, attackPoints, healthPoints, position, type) {
    Character.call(this, name, attackPoints, healthPoints, position)
    this.type = type
    this.equippedSpell  = null
    this.spells = []
    this.ultimateCharge = 0
    this.id = "magicPlayer"


    // this.statusEffects = []
}

MagicPlayer.prototype = Object.create(Character.prototype);
Object.defineProperty(MagicPlayer.prototype, 'constructor', { 
    value: MagicPlayer, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true 
});

MagicPlayer.prototype.attack = function (enemy, setEnemyCharacters) {
    let damageDone = this.attackPoints
    const startingHealth = enemy.healthPoints
    if(this.equippedSpell) damageDone += this.equippedSpell.spellPower
    const randomNumber = Math.floor(Math.random() * 100) + 1
    // if ( randomNumber <= this.equippedSpell.activationChance) enemy.statusEffects.push({effect: this.equippedSpell.effectName, duration: this.equippedSpell.duration})
    // enemy.statusEffects.forEach(statusEffect => {
    //     if(statusEffect.effect === "armour down" ) damageDone *= 2
    // })
    // if ( randomNumber <= this.equippedSpell.activationChance) addEffectToTarget(this.equippedSpell, enemy)
    let spellActivationChance = 0
    this.equippedSpell ? spellActivationChance = this.equippedSpell.activationChance : spellActivationChance = 0
    if ( randomNumber <= spellActivationChance) Character.prototype.addEffectToTarget.call(this, this.equippedSpell, enemy)
    // enemy.healthPoints = startingHealth - damageDone
    Character.prototype.attack.call(this, enemy, setEnemyCharacters, damageDone)

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

// const addEffectToTarget = (spell, enemy) => {
//     let stillToAdd = true
//     const updatedEffects = enemy.statusEffects.map(statusEffect =>{
//         if( spell.effectName === statusEffect.effect){
//             if(spell.duration > statusEffect.duration) statusEffect.duration = spell.duration
//             stillToAdd = false
//         }
//         return statusEffect
//     })
//     if (stillToAdd) enemy.statusEffects.push({effect: spell.effectName, duration: spell.duration})
//     else enemy.statusEffects = updatedEffects
// }

export default MagicPlayer
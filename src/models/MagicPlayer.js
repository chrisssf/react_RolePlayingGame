import Character from './Character.js'

function MagicPlayer(name, attackPoints, healthPoints, position, type) {
    Character.call(this, name, attackPoints, healthPoints, position)
    this.type = type
    this.equipedSpell  = null
    this.spells = []
    this.ultimateCharge = 0

    // this.statusEffects = []
}

MagicPlayer.prototype = Object.create(Character.prototype);
Object.defineProperty(MagicPlayer.prototype, 'constructor', { 
    value: MagicPlayer, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true 
});

MagicPlayer.prototype.attack = function (enemy) {
    let damageDone = this.attackPoints
    const startingHealth = enemy.healthPoints
    if(this.equipedSpell) damageDone += this.equipedSpell.spellPower
    const randomNumber = Math.floor(Math.random() * 100) + 1
    // if ( randomNumber <= this.equipedSpell.activationChance) enemy.statusEffects.push({effect: this.equipedSpell.debuffName, duration: this.equipedSpell.duration})
    if ( randomNumber <= this.equipedSpell.activationChance) addEffectToTarget(this.equipedSpell, enemy)
    // if ( randomNumber <= this.equipedSpell.activationChance) {
    //     let stillToAdd = true
    //     const updatedEffects = enemy.statusEffects.map(statusEffect =>{
    //         if( this.equipedSpell.effect === statusEffect.effect){
    //             if(this.equipedSpell.duration > statusEffect.duration) statusEffect.duration = this.equipedSpell.duration
    //             stillToAdd = false
    //         }
    //         return statusEffect
    //     })
    //     if (stillToAdd) enemy.statusEffects.push({effect: this.equipedSpell.debuffName, duration: this.equipedSpell.duration})
    //     else enemy.statusEffects = updatedEffects
    // }
    enemy.healthPoints = startingHealth - damageDone
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

const addEffectToTarget = (spell, enemy) => {
    let stillToAdd = true
    const updatedEffects = enemy.statusEffects.map(statusEffect =>{
        if( spell.debuffName === statusEffect.effect){
            if(spell.duration > statusEffect.duration) statusEffect.duration = spell.duration
            stillToAdd = false
        }
        return statusEffect
    })
    if (stillToAdd) enemy.statusEffects.push({effect: spell.debuffName, duration: spell.duration})
    else enemy.statusEffects = updatedEffects
}

export default MagicPlayer
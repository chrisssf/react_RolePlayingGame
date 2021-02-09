function Character(name, attackPoints, healthPoints, position) {
    this.name = name
    this.attackPoints = attackPoints
    this.healthPoints = healthPoints
    this.position = position
    this.isAlive = true
    this.statusEffects = []
}

Character.prototype.attack = function (enemy, setEnemy, modifiedDamage = 0){
    const startingHealth = enemy.healthPoints
    // let newHealth = 0
    // modifiedDamage === 0 ? newHealth = startingHealth - this.attackPoints : newHealth = startingHealth - modifiedDamage
    // enemy.healthPoints = newHealth

    let damageDone = 0
    modifiedDamage === 0 ? damageDone = this.attackPoints : damageDone = modifiedDamage
    enemy.statusEffects.forEach(statusEffect => {
        if(statusEffect.effect === "armour down" ) damageDone *= 2
    })
    enemy.healthPoints = startingHealth - damageDone
    if ( enemy.healthPoints <= 0) {
        enemy.position = 100
        setEnemy(prevState => ({...prevState, [enemy.id]: enemy }))
    }
}

Character.prototype.addEffectToTarget = function (item, target) {
    console.log("item", item)
    let stillToAdd = true
    const updatedEffects = target.statusEffects.map(statusEffect =>{
        if( item.effectName === statusEffect.effect){
            if(item.duration > statusEffect.duration) statusEffect.duration = item.duration
            stillToAdd = false
        }
        return statusEffect
    })
    if (stillToAdd) target.statusEffects.push({effect: item.effectName, duration: item.duration})
    else target.statusEffects = updatedEffects
}

export default Character






// // MELEEEEE!!!!!!!!!!!!!!
// MeleePlayer.prototype.attack = function (enemy){
//     let damageDone = this.attackPoints
//     const startingHealth = enemy.healthPoints;

//     if(this.equippedWeapon) {
//         damageDone += this.equippedWeapon.attackPower
//         const randomNumber = Math.floor(Math.random() * 100) + 1
//         switch(this.equippedWeapon.type){
//             case("sword"):
//                 if(randomNumber <= 25) damageDone *= 2
//                 break
//             case("axe"):
//                 if(randomNumber <= 10) damageDone = startingHealth
//                 else if(randomNumber <= 100) addEffectToTarget("attack down", enemy, 2) // should be <= 20
//                 break
//             case("club"):
//                 if(randomNumber <= 100) addEffectToTarget("stun", enemy, 1) // should be <= 25
//                 break
//         }
//     }
//     enemy.statusEffects.forEach(statusEffect => {
//         if(statusEffect.effect === "armour down" ) damageDone *= 2
//     })
//     enemy.healthPoints = startingHealth - damageDone
// }

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
// // MELEEEEE!!!!!!!!!!!!!! ENDDDDDD


// // MAGICCCCCCCCCC!!!!!!!!!!!
// MagicPlayer.prototype.attack = function (enemy) {
//     let damageDone = this.attackPoints
//     const startingHealth = enemy.healthPoints
//     if(this.equippedSpell) damageDone += this.equippedSpell.spellPower
//     const randomNumber = Math.floor(Math.random() * 100) + 1
//     // if ( randomNumber <= this.equippedSpell.activationChance) enemy.statusEffects.push({effect: this.equippedSpell.effectName, duration: this.equippedSpell.duration})
//     enemy.statusEffects.forEach(statusEffect => {
//         if(statusEffect.effect === "armour down" ) damageDone *= 2
//     })
//     if ( randomNumber <= this.equippedSpell.activationChance) addEffectToTarget(this.equippedSpell, enemy)
//     enemy.healthPoints = startingHealth - damageDone
// }

// const updateStatusEffects = (name, enemyCharacters, setEnemyCharacters) => {
//     const updatedStatusEffects = []
//     enemyCharacters[name].statusEffects.forEach(statusEffect => {
//         statusEffect.duration -= 1
//         if (statusEffect.duration > 0) updatedStatusEffects.push(statusEffect)
//     })
//     const updatableEnemy = enemyCharacters[name]
//     updatableEnemy.statusEffects = updatedStatusEffects
//     console.log("updatedStatusEffects", updatedStatusEffects);
//     console.log("updatableEnemy", updatableEnemy);
//     setEnemyCharacters(prevState => ({...prevState, [name]: updatableEnemy}))
// }

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
// // MAGICCCCCCCCCC!!!!!!!!!!! ENDDDDDDDDDDDDDDD


// // HEALERRRRRRRR!!!!!!!!!!!!!
// HealerPlayer.prototype.attack = function (target){
//     if ( this.equippedHeal !== null ) {
//         const startingHealth = target.healthPoints
//         const newHealth = startingHealth + this.equippedHeal.healPower
//         target.healthPoints = newHealth
//     } else Character.prototype.attack.call(this, target)
// }
// // HEALERRRRRRRR!!!!!!!!!!!!! ENDDDDDDDDDDDDD

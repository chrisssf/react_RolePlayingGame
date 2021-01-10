import Character from './Character.js'

function MeleePlayer(name, attackPoints, healthPoints, type) {
    Character.call(this, name, attackPoints, healthPoints)
    this.type = type
    this.equipedWeapon  = null
    this.weapons = []
    this.ultimateCharge = 0

    // this.statusEffects = []
}

MeleePlayer.prototype = Object.create(Character.prototype);
Object.defineProperty(MeleePlayer.prototype, 'constructor', { 
    value: MeleePlayer, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true 
});

MeleePlayer.prototype.attack = function (enemy){
    let damageDone = this.attackPoints
    const startingHealth = enemy.healthPoints;

    if(this.equipedWeapon) {
        damageDone += this.equipedWeapon.attackPower
        const randomNumber = Math.floor(Math.random() * 100) + 1
        switch(this.equipedWeapon.type){
            case("sword"):
                if(randomNumber <= 25) damageDone *= 2
                break
            case("axe"):
                if(randomNumber <= 10) damageDone = startingHealth
                else if(randomNumber <= 20) enemy.statusEffects.push("attack down")
                break
            case("club"):
                if(randomNumber <= 25) enemy.statusEffects.push("stun")
                break
        }
    }
    enemy.healthPoints = startingHealth - damageDone
}

export default MeleePlayer
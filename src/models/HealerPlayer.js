import CharacterTurnSelect from '../components/CharacterTurnSelect.js'
import Character from './Character.js'

function HealerPlayer(name, attackPoints, healthPoints, position, type) {
    Character.call(this, name, attackPoints, healthPoints, position)
    this.type = type
    this.equippedHeal  = null
    this.heals = []
    this.ultimateCharge = 0

    // this.statusEffects = []
}

HealerPlayer.prototype = Object.create(Character.prototype);
Object.defineProperty(HealerPlayer.prototype, 'constructor', { 
    value: HealerPlayer, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true 
});

HealerPlayer.prototype.attack = function (target){
    if ( this.equippedHeal !== null ) {
        const startingHealth = target.healthPoints
        const newHealth = startingHealth + this.equippedHeal.healPower
        target.healthPoints = newHealth
        if ( this.equippedHeal.effectName) Character.prototype.addEffectToTarget.call(this, this.equippedHeal, target)
    } else Character.prototype.attack.call(this, target)
}

export default HealerPlayer
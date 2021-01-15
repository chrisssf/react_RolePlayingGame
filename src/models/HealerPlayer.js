import Character from './Character.js'

function HealerPlayer(name, attackPoints, healthPoints, position, type) {
    Character.call(this, name, attackPoints, healthPoints, position)
    this.type = type
    this.equipedHeal  = null
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

export default HealerPlayer
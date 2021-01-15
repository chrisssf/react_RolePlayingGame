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

export default MagicPlayer
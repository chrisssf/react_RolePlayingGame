import Character from './Character.js'

function Enemy(name, attackPoints, healthPoints) {
    Character.call(this, name, attackPoints, healthPoints)

    // this.statusEffects = []
}

Enemy.prototype = Object.create(Character.prototype);
Object.defineProperty(Enemy.prototype, 'constructor', { 
    value: Enemy, 
    enumerable: false, // so that it does not appear in 'for in' loop
    writable: true 
});

export default Enemy
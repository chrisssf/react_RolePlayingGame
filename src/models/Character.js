function Character(name, attackPoints, healthPoints, position) {
    this.name = name
    this.attackPoints = attackPoints
    this.healthPoints = healthPoints
    this.position = position
    this.isAlive = true
    this.statusEffects = []
}

Character.prototype.attack = function (enemy){
    const startingHealth = enemy.healthPoints
    const newHealth = startingHealth - this.attackPoints
    // enemy.setHealthPoints(newHealth)
    enemy.healthPoints = newHealth
    console.log("4444444444")

    console.log(newHealth)
}

export default Character
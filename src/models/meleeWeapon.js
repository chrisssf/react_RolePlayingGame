function MeleeWeapon(name, attackPower, type, effectName, activationChance){
    this.name = name
    this.attackPower = attackPower
    this.type = type

    let defaultEffect = null
    let defaultActivationChance = null
    let defaultDuration = null
    switch (this.type) {
        case "axe":
            const randomNumber = Math.floor(Math.random() * 4)
            randomNumber === 0 ? defaultEffect = "instant kill" : defaultEffect = "attack down"
            defaultActivationChance = 20
            defaultDuration = 10
            break
        case "club":
            defaultEffect = "stun"
            defaultActivationChance = 25
            defaultDuration = 1
            break
        case "sword":
            defaultEffect = "pierce"
            defaultActivationChance = 25
            defaultDuration = 0
            break
        default:
            console.log("no matching weapon type");
    }
    
    this.effectName = effectName || defaultEffect
    this.activationChance = activationChance || defaultActivationChance
    this.duration = defaultDuration

}

export default MeleeWeapon
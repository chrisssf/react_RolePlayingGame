function Spell(name, spellPower, debuffName, activationChance, duration){
    this.name = name
    this.spellPower = spellPower
    this.level = 1
    this.debuffName = debuffName
    this.activationChance = activationChance
    this.duration = duration
}

export default Spell
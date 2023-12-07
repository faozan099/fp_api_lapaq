function spaceSpam(strings){
    return strings.some(str => typeof str === "string" && str.includes(' '))
}

module.exports = {
    spaceSpam
}
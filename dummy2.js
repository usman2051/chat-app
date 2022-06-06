const firstName = (name) => {
    name = name + '-'
    return name
}

const lastName = (name) => {
    name = name+'.'
    return name
}

module.exports = {firstName, lastName}
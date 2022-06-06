const firstName = (name) => {
    name = name + '-'
    return name
}

const lastName = (name) => {
    name = name+'.'
    return name
}

const appendNames = (first, last) => {
    const name = `${first} ${last}`
    return name
}

module.exports = {firstName, lastName}
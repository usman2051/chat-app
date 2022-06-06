const {firstName, lastName, appendNames} = require("../dummy2")

describe('names func.', () => {
    it('first name function', () => {
        expect(firstName('ali')).toEqual('ali-')
    })
    test('last name func.', () => {
        expect(lastName('ahmed')).toBe('ahmed.')
    })
    it('append names', () => {
        expect(appendNames('ali','ahmed')).toBe('ali ahmed')
    })
})
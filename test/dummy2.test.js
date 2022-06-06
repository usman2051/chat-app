const {firstName, lastName} = require("../dummy2")

describe('names func.', () => {
    it('first name function', () => {
        expect(firstName('ali')).toEqual('ali-')
    })
    test('last name func.', () => {
        expect(lastName('ahmed')).toBe('ahmed.')
    })
})
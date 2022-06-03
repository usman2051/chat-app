let {add,multiply,divide,max,min,getAvg,powerFunc} = require("../dummy")

describe('aritmetic', () => {
    it('test add', () => {
        expect(add(35,45,22)).toEqual(102)
    })
    test('test divide', () => {
        expect(divide(45,22)).toEqual(2.0454545454545454)
    })
    it('the multiply da', () => {
        expect(multiply(14,25,3)).toBe(1050)
    })
})

describe('listing functions', () => {
    test('da max dy', () => {
        expect(max(3,25,54,9,13,27,35)).toBe(54)
    })
    test('now its min', () => {
        expect(min(40,25,54,9,13,27,35)).toEqual(9)
    })
})

describe('advanced functions', () => {
    it('test avg', () => {
        expect(getAvg(23,37,32)).toBe(30.666666666666668)
    })
    it('power function', () => {
        expect(powerFunc(2,5)).toBe(32)
    })
})
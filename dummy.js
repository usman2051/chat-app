let a = 5, b= 10,c=15

exports.getAvg = (a,b,c) => (a+b+c)/3
exports.add = (a,b,c) => a+b+c
exports.max = (a,b,c,d,e,f,g) => Math.max(a,b,c,d,e,f,g)
exports.min = (a,b,c,d,e,f,g) => Math.min(a,b,c,d,e,f,g)
exports.multiply = (a,b,c) => a*b*c
exports.divide = (a,b) => a/b
exports.powerFunc = (a,b) => {
    let c = 1
    for(i=0;i<b;i++){
        c = c*a
    } return c
}
const { default: Decimal } = require("decimal.js")
const {Co} = require("./../Complexity")
const {Complex} = require("complex.js")

let xCo1 = Co.SQRT2.atan()
let xComplex1 = new Complex(xCo1.toArrayNumber())
let x1 = Co.parser(xComplex1.toVector())
console.log(x1)

let xCo2 = Co.SQRT2.atan()
let xComplex2 = new Complex(xCo2.toObjectNumber("PolarR"))
let x2 = Co.parser(xComplex2.toString())
console.log(x2)

let xCo3 = Co.SQRT2.atan()
let xComplex3 = new Complex(xCo3.toObjectNumber("PolarABS"))
let x3 = Co.parser(xComplex3.toVector())
console.log(x3)

function Diferença(a) {
    a = a.r().real
    if (a.lte(new Decimal(1e-16))) return console.log("Ótimo 10/10")
    if (a.lte(new Decimal(1e-14))) return console.log("Tudo bem 9/10")
    if (a.lte(new Decimal(1e-12))) return console.log("Aceitável? 8/10")
    if (a.lte(new Decimal(1e-10))) return console.log("Ok... 7/10")
    if (a.lte(new Decimal(1e-8))) return console.log("Não... 5/10")
    return console.log("Não 0/10")
}

Diferença(new Co(3).atan().sub(Co.parser(new Complex(3).atan().toVector())))
Diferença(new Co(3).atan().asin().sub(Co.parser(new Complex(3).atan().asin().toVector())))
Diferença(new Co(3).sin().cos().tan().sub(Co.parser(new Complex(3).sin().cos().tan().toVector())))
Diferença(new Co(3).sin().cos().tan().sin().cos().tan().sub(Co.parser(new Complex(3).sin().cos().tan().sin().cos().tan().toVector())))

console.log("1+i: ", Co.parser("1+i").toString())
console.log("1+2i: ", Co.parser("1+2i").toString())
console.log("1-3i: ", Co.parser("1-3i").toString())
console.log("-1-3i: ", Co.parser("-1-3i").toString())
console.log("E+PIi: ", Co.parser("E+PIi").toString())
console.log("1e-1+1e-1i: ", Co.parser("1e-1+1e-1i").toString())
console.log("1e+1+1e+1i: ", Co.parser("1e+1+1e+1i").toString())
console.log("1r1: ", Co.parser("1r1").toString())
console.log("ErPI: ", Co.parser("ErPI").toString())
console.log("1+i: ", Co.parser([1, 1]).toString())
console.log("1+i: ", Co.parser(1, 1).toString())

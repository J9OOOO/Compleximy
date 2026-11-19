const test = require("node:test")
const assert = require("node:assert/strict")
const { Co } = require("./../Compleximy")
const {Complex} = require("complex.js")

function near(actual, expected, eps = 1e-14) {
    assert.ok(
        Math.abs(actual - expected) <= eps,
        `Esperado ${expected}, recebido ${actual}`
    )
}

function complexNear(actual, real, imag, eps = 1e-14) {
    near(actual[0], real, eps)
    near(actual[1], imag, eps)
}

test("Construção", () => {
    complexNear(new Co(3, 4), 3, 4)
    complexNear(new Co(new Co(3, 4)), 3, 4)
    complexNear(new Co(5), 5, 0)
})

test("Aritmética básica", () => {
    const a = new Co(3, 2)
    const b = new Co(1, 4)

    complexNear(a.add(b), 4, 6)
    complexNear(a.sub(b), 2, -2)
    complexNear(a.mul(b), -5, 14)
    complexNear(a.div(b), 11/17, -10/17)
})

test("Identidades algébricas", () => {
    const a = new Co(3, 4)

    complexNear(a.add(a.neg()), 0, 0)
    complexNear(a.mul(a.inv()), 1, 0)
    complexNear(a.pow(2), -7, 24)
    complexNear(a.pow2(), -7, 24)
})

test("Rotação por i", () => {
    const a = new Co(3, 4)

    complexNear(a.i(), -4, 3)
    complexNear(a.in(), 4, -3)
})

test("Norma", () => {
    const a = new Co(3, 4)

    near(a.r()[0], 5)
    complexNear(a.norm(), 0.6, 0.8)
})

test("Parser", () => {
    complexNear(new Co(3, 4), 3, 4)
    complexNear(new Co("3+4i"), 3, 4)
    complexNear(new Co("4i"), 0, 4)
    complexNear(new Co("-i"), 0, -1)
    complexNear(new Co("1+i"), 1, 1)
    complexNear(new Co("1e-1+1e-1i"), 0.1, 0.1)
    complexNear(new Co("1r1"), 0.5403023058681398, 0.8414709848078965)
    complexNear(new Co([1, 1]), 1, 1)
    complexNear(new Co({real: 1, imag: 1}), 1, 1)
    complexNear(new Co({re: 1, im: 1}), 1, 1)
    complexNear(new Co({abs: 1, arg: 1}), 0.5403023058681398, 0.8414709848078965)
    complexNear(new Co({r: 1, phi: 1}), 0.5403023058681398, 0.8414709848078965)
})

test("Exponencial e logaritmo", () => {
    const a = new Co(2, 3)

    complexNear(a.ln().exp(), 2, 3)
})

test("Trigonometria", () => {
    const a = new Co(0.4, 0.7)

    complexNear(a.sin().asin(), 0.4, 0.7)
    complexNear(a.cos().acos(), 0.4, 0.7)
})

test("sin2+cos2=1", () => {
    for(let a = 0; a < 1; a += 0.01) {
        let a1 = new Co(a, a) 
        complexNear(a1.sin().pow2().add(a1.cos().pow2()), 1, 0)
    }
})

test("exp(ln(z)) = z", () => {
    for(let a = 1; a < 2; a += 0.01) {
        let a1 = new Co(a, a) 
        complexNear(a1.ln().exp(), a1[0], a1[1])
    }
})

test("e ** (i * PI) + 1 = 0", () => {
        complexNear(Co.PI.i().exp().add(1), 0, 0)
})

test("sin(i * z) = i * sinh(z)", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).i().sin(), new Co(a, a).sinh().i()[0], new Co(a, a).sinh().i()[1])
    }
})
test("cos(i * z) = cosh(z)", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).i().cos(), new Co(a, a).cosh()[0], new Co(a, a).cosh()[1])
    }
})
test("pow2 = pow(2)", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).pow2(), new Co(a, a).pow(2)[0], new Co(a, a).pow(2)[1])
    }
})
test("pow3 = pow(3)", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).pow3(), new Co(a, a).pow(3)[0], new Co(a, a).pow(3)[1])
    }
})
test("log = logn(10)", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).log(), new Co(a, a).logn(10)[0], new Co(a, a).logn(10)[1])
    }
})

test("sqrt = nrt(2)", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).sqrt(), new Co(a ,a).nrt(2)[0], new Co(a ,a).nrt(2)[1])
    }
})

function compare(a, b, eps = 1e-10) {
    near(a[0], b[0], eps)
    near(a[1], b[1], eps)
}

test("Compatibilidade com complex.js 1", () => {
    for(let x = -2; x <= 2; x += 0.1) {
        for(let y = -2; y <= 2; y += 0.1) {
            let z = new Co(x, y)
            let z1 = new Complex(z.toArrayNumber())
            let z2 = new Co(z1.toVector())


            compare(z, z2)
        }
    }
})

test("Compatibilidade com complex.js 2", () => {
    for(let x = -2; x <= 2; x += 0.1) {
        for(let y = -2; y <= 2; y += 0.1) {
            let z = new Complex(x, y)
            let z1 = new Co(z.toString())

            compare(z1, new Co(x, y))
        }
    }
})

test("sinh", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).sinh(), new Complex(a, a).sinh().re, new Complex(a, a).sinh().im)
    }
})

test("cosh", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).cosh(), new Complex(a, a).cosh().re, new Complex(a, a).cosh().im)
    }
})

test("tanh", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).tanh(), new Complex(a, a).tanh().re, new Complex(a, a).tanh().im)
    }
})

test("cbrt", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).cbrt(), new Complex(a, a).pow(1/3).re, new Complex(a, a).pow(1/3).im)
    }
})

test("atan", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).atan(), new Complex(a, a).atan().re, new Complex(a, a).atan().im)
    }
})

test("acos", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).acos(), new Complex(a, a).acos().re, new Complex(a, a).acos().im)
    }
})

test("asin", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).asin(), new Complex(a, a).asin().re, new Complex(a, a).asin().im)
    }
})

test("atanh", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).atanh(), new Complex(a, a).atanh().re, new Complex(a, a).atanh().im)
    }
})

test("acosh", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).acosh(), new Complex(a, a).acosh().re, new Complex(a, a).acosh().im)
    }
})

test("asinh", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).asinh(), new Complex(a, a).asinh().re, new Complex(a, a).asinh().im)
    }
})

test("acsc", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).acsc(), new Complex(a, a).acsc().re, new Complex(a, a).acsc().im)
    }
})

test("asec", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).asec(), new Complex(a, a).asec().re, new Complex(a, a).asec().im)
    }
})

test("acot", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).acot(), new Complex(a, a).acot().re, new Complex(a, a).acot().im)
    }
})

test("acsch", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).acsch(), new Complex(a, a).acsch().re, new Complex(a, a).acsch().im)
    }
})

test("asech", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).asech(), new Complex(a, a).asech().re, new Complex(a, a).asech().im)
    }
})

test("acoth", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).acoth(), new Complex(a, a).acoth().re, new Complex(a, a).acoth().im)
    }
})

test("sin", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).sin(), new Complex(a, a).sin().re, new Complex(a, a).sin().im)
    }
})

test("cos", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).cos(), new Complex(a, a).cos().re, new Complex(a, a).cos().im)
    }
})

test("tan", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).tan(), new Complex(a, a).tan().re, new Complex(a, a).tan().im)
    }
})

test("csc", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).csc(), new Complex(a, a).csc().re, new Complex(a, a).csc().im)
    }
})

test("sec", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).sec(), new Complex(a, a).sec().re, new Complex(a, a).sec().im)
    }
})

test("cot", () => {
    for(let a = 1; a < 2; a += 0.01) {
        complexNear(new Co(a, a).cot(), new Complex(a, a).cot().re, new Complex(a, a).cot().im)
    }
})

test("pow i", () => {
    for(let a = 1; a < 10; a += 1) {
        complexNear(new Co(0, 1).pow(a), new Complex(0, 1).pow(a).re, new Complex(0, 1).pow(a).im)
    }
})

//O pior é que tem 42 testes mesmo

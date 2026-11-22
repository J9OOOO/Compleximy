const gh = require("decimal.js")

class Co {
    constructor(real, imag) {
        return Co.i(C(real, imag))
    }

    static i([a, b]) {
        const z = Reflect.construct(Array, [2], Co)

        a = gh(a)
        b = gh(b)

        if (!isFinite(a) || !isFinite(b)) throw new Error(`Parte real ou imaginária como NaN ou não finita: (${a}, ${b})`)

        z[0] = truncamento(a)
        z[1] = truncamento(b)

        return z
    }

    add(b, b1) {
        return Co.i(Complexos.add(this, C(b, b1)))
    }
    sub(b, b1) {
        return Co.i(Complexos.sub(this, C(b, b1)))
    }
    mul(b, b1) {
        return Co.i(Complexos.mul(this, C(b, b1)))
    }
    div(b, b1) {
        return Co.i(Complexos.div(this, C(b, b1)))
    }
    neg() {
        return Co.i([this[0].neg(), this[1].neg()])
    }
    exp() {
        return Co.i(Complexos.exp(this))
    }
    conj() {
        return Co.i([this[0], this[1].neg()])
    }
    r() {
        return Co.i([gh.hypot(this[0], this[1]), ZERO])
    }
    r2() {
        return Co.i([this[0].mul(this[0]).add(this[1].mul(this[1])), ZERO])
    }
    theta() {
        return Co.i([gh.atan2(this[1], this[0]), ZERO])
    }
    ln() {
        return Co.i(Complexos.ln(this))
    }
    sin() {
        return Co.i(Complexos.sin(this))
    }
    cos() {
        return Co.i(Complexos.cos(this))
    }
    tan() {
        return Co.i(Complexos.tan(this))
    }
    asin() {
        return Co.i(Complexos.asin(this))
    }
    acos() {
        return Co.i(Complexos.acos(this))
    }
    atan() {
        return Co.i(Complexos.atan(this))
    }
    acsc() {
        return this.inv().asin()
    }
    asec() {
        return this.inv().acos()
    }
    acot() {
        return this.inv().atan()
    }
    csc() {
        return this.sin().inv()
    }
    sec() {
        return this.cos().inv()
    }
    cot() {
        return this.tan().inv()
    }
    pow(b, b1) {
        return Co.i(Complexos.pow(this, C(b, b1)))
    }
    pow2() {
        return Co.i(Complexos.pow2(this))
    }
    pow3() {
        return Co.i(Complexos.pow3(this))
    }
    inv() {
        return Co.i(Complexos.inv(this))
    }
    sinh() {
        return Co.i(Complexos.sinh(this))
    }
    cosh() {
        return Co.i(Complexos.cosh(this))
    }
    tanh() {
        return Co.i(Complexos.tanh(this))
    }
    asinh() {
        return Co.i(Complexos.asinh(this))
    }
    acosh() {
        return Co.i(Complexos.acosh(this))
    }
    atanh() {
        return Co.i(Complexos.atanh(this))
    }
    csch() {
        return this.sinh().inv()
    }
    sech() {
        return this.cosh().inv()
    }
    coth() {
        return this.tanh().inv()
    }
    acsch() {
        return this.inv().asinh()
    }
    asech() {
        return this.inv().acosh()
    }
    acoth() {
        return this.inv().atanh()
    }
    i() {
        return Co.i([this[1].neg(), this[0]])
    }
    in() {
        return Co.i([this[1], this[0].neg()])
    }
    sqrt() {
        return Co.i(Complexos.sqrt(this))
    }
    cbrt() {
        return Co.i(Complexos.cbrt(this))
    }
    nrt(b, b1) {
        return Co.i(Complexos.pow(this, Complexos.div([ONE, ZERO], C(b, b1))))
    }
    log() {
        return Co.i(Complexos.log(this))
    }
    logn(b, b1) {
        return Co.i(Complexos.div(Complexos.ln(this), Complexos.ln(C(b, b1))))
    }
    norm() {
        return Co.i(Complexos.norm(this))
    }
    eq(b, b1) {
        const b2 = C(b, b1)
        return this[0].eq(b2[0]) && this[1].eq(b2[1])
    }
    noeq(b, b1) {
        return !this.eq(b, b1)
    }
    isFinite() {
        return isFinite(this[0]) && isFinite(this[1])
    }
    isReal() {
        return isZero(this[1])
    }
    isImag() {
        return isZero(this[0])
    }
    isZero() {
        return isZero(this[0]) && isZero(this[1])
    }
    distance(b, b1) {
        return this.sub(new Co(b, b1)).r()
    }
    rotation(b, b1) {
        return this.mul(new Co(b, b1).i().exp())
    }
    toString(tipo) {
        if (tipo === undefined) tipo = "Cartesian"
        if (tipo === "Cartesian") {
            if (isZero(this[1])) return `${this[0]}`
            if (isZero(this[0]) && this[1].eq(ONE)) return `i`
            if (isZero(this[0]) && this[1].eq(MINUS_ONE)) return `-i`
            if (isZero(this[0])) return `${this[1]}i`
            if (this[1].eq(ONE)) return `${this[0]} + i`
            if (this[1].eq(MINUS_ONE)) return `${this[0]} - i`
            if (this[1].isNeg()) return `${this[0]} - ${this[1].abs()}i`
            return `${this[0]} + ${this[1]}i`
        }
        if (tipo === "Euler") {
            let r = this.r()[0]
            let arg = this.theta()[0]
            if (isZero(arg)) return `${r}`
            if (isZero(r)) return `0`
            if (r.eq(ONE) && arg.eq(ONE)) return `e ** i`
            if (r.eq(ONE) && arg.eq(MINUS_ONE)) return `e ** (-i)`
            if (r.eq(ONE) && !arg.eq(ONE) && !arg.eq(MINUS_ONE)) return `e ** (${arg}i)`
            if (arg.eq(ONE)) return `${r} * e ** i`
            if (arg.eq(MINUS_ONE)) return `${r} * e ** (-i)`
            return `${r} * e ** (${arg}i)`
        }
        if (tipo === "PolarSy") {
            let r = this.r()[0]
            let arg = this.theta()[0]
            return `${r} ∠ ${arg}`
        }
        if (tipo === "PolarChar") {
            let r = this.r()[0]
            let arg = this.theta()[0]
            return `${r} r ${arg}`
        }
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    GetReal() {
        return this[0]
    }
    GetImag() {
        return this[1]
    }
    toArrayDecimal() {
        return [this[0], this[1]]
    }
    toArrayNumber() {
        return [this[0].toNumber(), this[1].toNumber()]
    }
    toObjectDecimal(tipo = "Cartesian") {
        if (tipo === "Cartesian") return {real: this[0], imag: this[1]}
        if (tipo === "CartesianSmall") return {re: this[0], im: this[1]}
        if (tipo === "PolarR") return {r: this.r()[0], phi: this.theta()[0]}
        if (tipo === "PolarABS") return {abs: this.r()[0], arg: this.theta()[0]}
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    toObjectNumber(tipo = "Cartesian") {
        if (tipo === "Cartesian") return {real: this[0].toNumber(), imag: this[1].toNumber()}
        if (tipo === "CartesianSmall") return {re: this[0].toNumber(), im: this[1].toNumber()}
        if (tipo === "PolarR") return {r: this.r()[0].toNumber(), phi: this.theta()[0].toNumber()}
        if (tipo === "PolarABS") return {abs: this.r()[0].toNumber(), arg: this.theta()[0].toNumber()}
        throw new Error(`Tipo inválido: ${tipo}`)
    }
    toJSON(tipo = "Cartesian") {
        if (tipo === "") tipo = "Cartesian"
        if (tipo === "Cartesian") return {real: this[0].toString(), imag: this[1].toString()}
        if (tipo === "CartesianSmall") return {re: this[0].toString(), im: this[1].toString()}
        if (tipo === "PolarR") return {r: this.r()[0].toString(), phi: this.theta()[0].toString()}
        if (tipo === "PolarABS") return {abs: this.r()[0].toString(), arg: this.theta()[0].toString()}
        throw new Error(`Tipo inválido: ${tipo}`)
    }
}

const ONE = gh(1)
const ZERO = gh(0)
const PI = gh(-1).acos()
const PI_2 = gh(-1).acos().div(gh(2))
const MINUS_ONE = gh(-1)
const TWO = gh(2)
const E = gh(1).exp()
const ZEROCINCO = gh(0.5)
const THREE = gh(3)

Co["PI"] = new Co(PI)
Co["E"] = new Co(gh(1).exp())

Co["TAU"] = new Co(PI.mul(TWO))

Co["SQRT2"] = new Co(gh(2).sqrt())
Co["SQRT3"] = new Co(gh(3).sqrt())
Co["SQRT5"] = new Co(gh(5).sqrt())

Co["LN10"] = new Co(gh(10).ln())
Co["LN2"] = new Co(gh(2).ln())
Co["LOG10E"] = new Co(E.log())
Co["PHI"] = new Co(ONE.add(gh(5).sqrt()).div(TWO))

Co["PI_2"] = new Co(PI_2)
Co["PI_3"] = new Co(PI.div(gh(3)))
Co["PI_4"] = new Co(PI_2.div(TWO))

Co["I"] = Co.i([0, 1])
Co["MINUS_I"] = Co.i([0, -1])

Co["ONE"] = Co.i([1, 0])
Co["MINUS_ONE"] = Co.i([-1, 0])
Co["ZERO"] = Co.i([0, 0])

function C(a, b) {
    /*
    Número: (-1, 3, -7812, 1.94, "34", "8230134", "-98143", ...)
    Imaginário puro: (i, -i, 83i, -3.8324i, ...)
    Objeto: ({abs, arg}, {real, imag}, {r, phi}, ...)
    Array: ([3, 3], [-1, 0], ["-1", "-1"], ...)
    Complexo completo: (1+i, 1-i, 432187+49i, 0.972134+1.1238974i, ...)
    */

    if (b !== undefined) try {
        return [a instanceof gh ? a : gh(a), b instanceof gh ? b : gh(b)]
    } catch {throw new Error(`'a' inválido com o 'b': ${a} e ${b}`)}

    if (a instanceof Co) return [a[0], a[1]]

    let tipo = typeof a

    try {
        return [gh(a), ZERO]
    } catch {}

    if (tipo === "string") {
        //O primeiro try já pega strings, então para números em strings já está resolvido
        a = a.replace(/\s/g, "")
        let r = a.indexOf("r")
        let r1 = a.indexOf("∠")

        if (r !== -1 || r1 !== -1) {
            if (r === -1) r = r1
            let R = a.slice(0, r)
            let phi

            let TemSinal = a[r + 1] === "-" || a[r + 1] === "+" ? 1 : 0
            let Sinal = gh(1)

            if (TemSinal) Sinal = a[r + 1] === "+" ? gh(1) : gh(-1)

            if (!TemSinal) {
                phi = a.slice(r + 1, a.length)
            } else {
                phi = a.slice(r + 2, a.length)
            }

            if (Co[R]?.[0] !== undefined) {R = Co[R][0]}
            if (Co[phi]?.[0] !== undefined) {phi = Co[phi][0]}

            const GHphi = phi instanceof gh ? phi : gh(phi)

            return [gh(R).mul(GHphi.cos()), GHphi.sin().mul(Sinal.mul(gh(R)))]
        }

        let I = a.indexOf("i")
        let i1 = a.indexOf("I")

        if (I === -1) I = i1
        if (I !== a.length - 1) throw new Error(`Formatação errada: ${a}`)
        try {
            return [ZERO, gh(a.slice(0, I))]
        } catch {}

        if (a === "i" || a === "+i" || a === "I" || a === "+I") return [0, gh(1)]
        if (a === "-i" || a === "-I") return [0, gh(-1)]

        //Aqui já tem certeza de que é complexo completo
        
        let SinalEscolhido

        let IMais = a.lastIndexOf("+")
        let IMenos

        while (a[IMais - 1] === "e") {
            IMais = a.slice(0, IMais - 1).lastIndexOf("+")
        }

        if (IMais === 0) {IMais = -1}

        if (IMais === -1) {
            IMenos = a.lastIndexOf("-")
            while (a[IMenos - 1] === "e") {
                IMenos = a.slice(0, IMenos - 1).lastIndexOf("-")
            }
        }

        if (IMais === -1 && IMenos === -1) throw new Error(`Erro em encontrar o sinal: ${a}`)

        SinalEscolhido = IMais !== -1 ? IMais : IMenos

        let Sinal = IMais !== -1 ? gh(1) : gh(-1)

        let SemSinal = a[0] === "+" || a[0] === "-" ? 1 : 0
        let SinalEsq = 1
        if (SemSinal) {
            SinalEsq = a[0] === "+" ? 1 : -1
        }

        let SReal = a.slice(SemSinal, SinalEscolhido)

        let SImag = a.slice(SinalEscolhido + 1, a.length - 1)

        let Real, Imag

        if (Co[SReal]?.[0] !== undefined) {Real = Co[SReal][0].mul(gh(SinalEsq))}
        if (Co[SImag]?.[0] !== undefined) {Imag = Co[SImag][0].mul(Sinal)}

        if (Real === undefined) Real = gh(SReal).mul(gh(SinalEsq))
        if (Imag === undefined) Imag = SImag === "" ? Sinal : gh(SImag).mul(Sinal)

        return [Real instanceof gh ? Real : gh(Real), Imag instanceof gh ? Imag : gh(Imag)]
    }

    if (Array.isArray(a) && a.length === 2) {
        return [a[0] instanceof gh ? a[0] : gh(a[0]), a[1] instanceof gh ? a[1] : gh(a[1])]
    }

    if (tipo === "object" && a !== null) {
        if ("real" in a && "imag" in a) {
            return [a.real instanceof gh ? a.real : gh(a.real), a.imag instanceof gh ? a.imag : gh(a.imag)]
        }

        if ("r" in a && "phi" in a) {
            const GHphi = a.phi instanceof gh ? a.phi : gh(a.phi)
            const R = a.r instanceof gh ? a.r : gh(a.r)
            return [R.mul(GHphi.cos()), GHphi.sin().mul(R)]
        }

        if ("abs" in a && "arg" in a) {
            const GHphi = a.arg instanceof gh ? a.arg : gh(a.arg)
            const R = a.abs instanceof gh ? a.abs : gh(a.abs)
            return [R.mul(GHphi.cos()), GHphi.sin().mul(R)]
        }

        if ("re" in a && "im" in a) {
            return [a.re instanceof gh ? a.re : gh(a.re), a.im instanceof gh ? a.im : gh(a.im)]
        }
    }

    throw new Error(`Input(s) inválido(s): ${a} e ${b}`)
}

function truncamento(a) {
    const a1 = a.toString()
    const e = a1.indexOf("e")
    const p = gh.precision
    if (e === -1) {

        if (a.sub(a.round()).abs().lt(gh(`1e-${gh.precision - 5}`))) {
            return gh(a.round().toString());
        }
    }
    const exp = Number(a1.slice(e + 1, a1.length))
    if (exp < - p + 5) return ZERO
    return a
}

function isFinite(a) {
    return !!a.d
}

const Complexos = {
    add(a, b) {
        return [a[0].add(b[0]), a[1].add(b[1])]
    },
    sub(a, b) {
        return [a[0].sub(b[0]), a[1].sub(b[1])]
    },
    mul(a, b) {
        if (isZero(a[1])) return [a[0].mul(b[0]), a[0].mul(b[1])]
        if (isZero(b[1])) return [a[0].mul(b[0]), a[1].mul(b[0])]
        return [a[0].mul(b[0]).sub(a[1].mul(b[1])), a[0].mul(b[1]).add(a[1].mul(b[0]))]
    },
    div(a, b) {
        if (b[1].isZero()) {
            const inv = ONE.div(b[0].mul(b[0]))

            return [a[0].mul(b[0]).mul(inv), a[1].mul(b[0]).mul(inv)] 
        }

        const inv = ONE.div(b[0].mul(b[0]).add(b[1].mul(b[1])))

        return [a[0].mul(b[0]).add(a[1].mul(b[1])).mul(inv), a[1].mul(b[0]).sub(a[0].mul(b[1])).mul(inv)]
    },
    inv(b) {
        //a = 1 + 0i
        if (b[1].isZero()) {
            const inv = ONE.div(b[0].mul(b[0]))

            return [b[0].mul(inv), ZERO] 
        }

        const inv = ONE.div(b[0].mul(b[0]).add(b[1].mul(b[1])))

        return [b[0].mul(inv), b[1].mul(inv).neg()]
    },
    exp(a) {
        if (a[1].isZero()) return [a[0].exp(), ZERO]
        if (a[0].isZero()) return [a[1].cos(), a[1].sin()]

        const expA0 = a[0].exp()

        return [a[1].cos().mul(expA0), a[1].sin().mul(expA0)]
    },
    ln(a) {
        //ln(a+bi) = ln(abs(r)) + theta * i
        const x = a[0]
        const y = a[1]

        if (y.isZero()) {
            if (x.lt(ZERO)) {
                return [x.neg().ln(), PI]
            }
            return [x.ln(), ZERO]
        }
        return [gh.hypot(x, y).ln(), gh.atan2(y, x)]
    },
    sin(a) {
        if (a[1].isZero()) return [a[0].sin(), ZERO]
        if (a[0].isZero()) return [ZERO, a[1].sinh()]

        return [a[0].sin().mul(a[1].cosh()), a[0].cos().mul(a[1].sinh())]
    },
    cos(a) {
        if (a[1].isZero()) return [a[0].cos(), ZERO]
        if (a[0].isZero()) return [a[1].cosh(), ZERO]

        return [a[0].cos().mul(a[1].cosh()),a[0].sin().mul(a[1].sinh()).neg()]
    },
    tan(a) {
        if (a[1].isZero()) return [a[0].tan(), ZERO]
        if (a[0].isZero()) return [ZERO, a[1].tanh()]

        const real2 = a[0].mul(TWO)
        const imag2 = a[1].mul(TWO)

        const denINV = ONE.div(real2.cos().add(imag2.cosh()))

        return [real2.sin().mul(denINV), imag2.sinh().mul(denINV)]
    },
    asin(a) {
        const x = a[0]
        const y = a[1]

        if (x.isZero()) return [ZERO, y.asinh()]

        if (y.isZero()) {
            if (x.abs().lte(ONE)) return [x.asin(), ZERO]

            const sign = x.isNegative() ? -1 : 1

            return [sign === 1 ? PI_2 : PI_2.neg(), x.abs().acosh().mul(gh(sign).neg())]
        }

        const u = x.add(ONE).mul(x.add(ONE)).add(y.mul(y)).sqrt()

        const v = x.sub(ONE).mul(x.sub(ONE)).add(y.mul(y)).sqrt()

        const alpha = u.add(v).div(TWO)

        const realPart = u.sub(v).div(TWO).asin()

        const imagPart = alpha.add(alpha.mul(alpha).sub(ONE).sqrt()).ln().mul(y.isNegative() ? MINUS_ONE : ONE)

        return [realPart, imagPart]
    },
    acos(a) {
        const x = a[0]
        const y = a[1]

        if (x.isZero()) {
            return [PI_2, y.asinh().neg()]
        }

        if (y.isZero()) {
            if (x.abs().lte(ONE)) return [x.acos(), ZERO]

            const sign = x.isNegative() ? -1 : 1

            return [sign === 1 ? ZERO : PI, x.abs().acosh().neg()]
        }
        const u = x.add(ONE).mul(x.add(ONE)).add(y.mul(y)).sqrt()

        const v = x.sub(ONE).mul(x.sub(ONE)).add(y.mul(y)).sqrt()

        const alpha = u.add(v).div(TWO)

        const realPart = PI_2.sub(u.sub(v).div(TWO).asin())

        const imagPart = alpha.add(alpha.mul(alpha).sub(ONE).sqrt()).ln().mul(y.isNegative() ? ONE : MINUS_ONE)

        return [realPart, imagPart]
    },
    atan(a) {
        const x = a[0]
        const y = a[1]

        if (y.isZero()) return [x.atan(), ZERO]
        if (x.isZero()) {
            if (y.abs().lt(ONE)) return [ZERO, y.atanh()]

            if (y.abs().eq(ONE)) {
                throw new Error("Polo de atan")
            }

         return [y.isNeg() ? PI_2.neg() : PI_2, y.add(ONE).div(y.sub(ONE)).abs().ln().mul(ZEROCINCO)]
        }

        const yp = y.add(ONE)
        const ym = y.sub(ONE)

        const r1 = x.mul(x).add(yp.mul(yp)).sqrt()
        const r2 = x.mul(x).add(ym.mul(ym)).sqrt()

        const rSquared = x.mul(x).add(y.mul(y))

        const realPart = gh.atan2(x.mul(TWO),ONE.sub(rSquared)).div(TWO)

        const imagPart = r1.div(r2).ln().div(TWO)

        return [realPart, imagPart]
    },
    pow2(a) {
        const x = a[0]
        const y = a[1]

        if (y.isZero()) return [x.mul(x), ZERO]
        if (x.isZero()) return [y.mul(y).neg(), ZERO]
        return [x.mul(x).sub(y.mul(y)), TWO.mul(x.mul(y))]
    },
    pow(a, b) {
        let a0r = isZero(a[0])
        let a0i = isZero(a[1])

        if (a[0].eq(ONE) && a0i) return [ONE, ZERO]

        let b0 = isZero(b[1])

        if (a0r && a[1].eq(ONE)) {
            if (b0 && b[0].isInteger() && b[0].gt(ZERO)) {
            switch (b[0].mod(gh(4)).toNumber()) {
                case 0: 
                    return [ONE, ZERO]
                case 1:
                    return [ZERO, ONE]
                case 2: 
                    return [MINUS_ONE, ZERO]
                case 3: 
                    return [ZERO, MINUS_ONE]
                }
            }
        }

        if (a0i && b0 && a[0].gt(ZERO)) return [a[0].pow(b[0]), ZERO]
        if (a0r && a0i) {if (b[0].gt(ZERO) && b0) {return [ZERO, ZERO]} else {throw new Error("Base zero e expoente menor ou igual a 0")}}

        let r_z2 = gh.hypot(a[1], a[0]).ln()
        let theta_z = gh.atan2(a[1], a[0])
        let phi = (b[1].mul(r_z2)).add(theta_z.mul(b[0]))
        let r = ((b[0].mul(r_z2)).sub(theta_z.mul(b[1]))).exp()
        return [phi.cos().mul(r), phi.sin().mul(r)]
    },
    sinh(a) {
        const x = a[0]
        const y = a[1]

        if (isZero(y)) return [x.sinh(), ZERO]
        if (isZero(x)) return [ZERO, y.sin()]

        return [y.cos().mul(x.sinh()), y.sin().mul(x.cosh())]
    },
    cosh(a) {
        if (isZero(a[1])) return [a[0].cosh(), ZERO]

        const x = a[0];
        const y = a[1];
        
        return [x.cosh().mul(y.cos()), x.sinh().mul(y.sin())];
    },
    tanh(a) {
        const x = a[0];
        const y = a[1];

        if (isZero(y)) return [x.tanh(), ZERO];
        if (isZero(x)) return [ZERO, y.tan()];

        const x2 = TWO.mul(x);
        const y2 = TWO.mul(y);
        
        const demINV = ONE.div(x2.cosh().add(y2.cos())); 
        
        return [x2.sinh().mul(demINV), y2.sin().mul(demINV)];
    },
    sqrt(a) {
        const x = a[0];
        const y = a[1];

        if (isZero(y)) {
            if (x.gte(ZERO)) return [x.sqrt(), ZERO];
            return [ZERO, x.neg().sqrt()];
        }

        const r = gh.hypot(x, y);
        let re = ZEROCINCO.mul(r.add(x.abs())).sqrt();
        let im = y.abs().div((TWO.mul(re)));

        if (x.gte(ZERO)) return [re, y.lt(ZERO) ? im.neg() : im];
        return [im, y.lt(ZERO) ? re.neg() : re];
    },
    cbrt(a) {
        const x = a[0];
        const y = a[1];

        if (isZero(y)) {
            if (x.lt(ZERO)) {
                let x1 = x.cbrt().abs()
                return [x1.mul(ZEROCINCO), SQRT3.mul(ZEROCINCO).mul(x1)]
            }
            return [x.cbrt(), ZERO];
        }

        const r = gh.hypot(x, y);
        const phi = gh.atan2(y, x).div(THREE);
        const t = r.cbrt();

        return [t.mul(phi.cos()), t.mul(phi.sin())];
    },
    log(a) {
        const x = a[0]
        const y = a[1]

        if (isZero(y)) {
            if (x.gte(ZERO)) return [x.log(), ZERO]
            return [x.neg().log(), PI.mul(LOG10E)]
        }

        const k = ONE.div(gh(10).ln())

        return [gh.hypot(x, y).ln().mul(k), gh.atan2(y, x).mul(k)]
    },
    norm(a) {
        const x = a[0]
        const y = a[1]

        if(isZero(x) && isZero(y)) return [ZERO, ZERO]

        let inv = ONE.div(gh.hypot(x, y))
        return [x.mul(inv), y.mul(inv)]
    },
    pow3(a) {
        const x = a[0]
        const y = a[1]

        if (isZero(y)) return [x.pow(THREE), ZERO]
        if (isZero(x)) return [ZERO, y.pow(THREE).neg()]
        return [x.mul(x.mul(x).sub(THREE.mul(y).mul(y))),  y.mul(THREE.mul(x.mul(x)).sub(y.mul(y)))]
    },
    asinh(a) {
        const x = a[0]
        const y = a[1];

        if (isZero(y)) return [x.asinh(), ZERO];
        if (isZero(x)) {
            if (y.abs().lte(ONE)) return [ZERO, y.asin()];
            const Sinal = y.isNeg() ? MINUS_ONE : ONE
            return [Sinal.mul(y.abs().acosh()), Sinal.mul(PI_2)]
        }

        let rp = gh.hypot(x.add(1), y);
        let rm = gh.hypot(x.sub(1), y);

        const sinalX = x.isNeg() ? MINUS_ONE : ONE;
        const sinalY = y.isNeg() ? MINUS_ONE : ONE;
        
        return [sinalX.mul(rp.add(rm).mul(ZEROCINCO).acosh()), rp.sub(rm).mul(ZEROCINCO).asin().mul(sinalX).mul(sinalY)];
    },
    acosh(a) {
        const x = a[0];
        const y = a[1];

        if (isZero(y)) {
            if (x.eq(ONE)) return [ZERO, ZERO];
            if (x.gt(ONE)) return [x.acosh(), ZERO];
            if (x.gte(MINUS_ONE)) return [ZERO, x.acos()]; 
            return [x.neg().acosh(), PI];
        }
        if (isZero(x)) {
            return [y.abs().asinh(), y.isNeg() ? PI_2.neg() : PI_2]
        }

        let rp = gh.hypot(x.add(ONE), y);
        let rm = gh.hypot(x.sub(ONE), y);

        const sinalY = y.isNeg() ? MINUS_ONE : ONE;

        return [rp.add(rm).mul(ZEROCINCO).acosh(), sinalY.mul(rp.sub(rm).mul(ZEROCINCO).acos())];
    },
    atanh(a) {
        const x = a[0];
        const y = a[1];

        if (isZero(y)) {
            if (x.gte(MINUS_ONE) && x.lte(ONE)) return [x.atanh(), ZERO];
        }
        if (isZero(x)) {
            return [ZERO, gh.atan(y)];
        }

        let y1 = y.mul(y);
        let x2 = x.add(ONE).mul(x.add(ONE)).add(y1).div(x.sub(ONE).mul(x.sub(ONE)).add(y1)).ln().mul(gh(0.25));
        
        let x3 = gh.atan2(y.mul(TWO), gh(ONE).sub(x.mul(x)).sub(y1)).mul(ZEROCINCO);
        
        return [x2, x3];
    },
}

function isZero(a) {
    return a.toString() === "0"
}

module.exports = {
    Co
}

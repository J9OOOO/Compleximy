# Compleximy
Uma biblioteca de números complexos com precisão arbitrária que eu criei há 39 dias atrás (na data de hoje 14/11/2026)

## Instalação:
`(eu ainda vou botar)`


### Operadores

| Operação | Classe |
|---|---|
| z + w | z.add(w) |
| z - w | z.sub(w) |
| z * w | z.mul(w) |
| z / w | z.div(w) |
| z^w | z.pow(w) |
| z^2 | z.pow2() |
| z^3 | z.pow3() |
| sqrt(z) | z.sqrt() |
| cbrt(z) | z.cbrt() |
| -z | z.neg() |
| abs(z)^2 | z.r2() |
| abs(z) | z.r() |
| arg(z) | z.theta() |
| 1/z | z.inv() |
| conj(z) | z.conj() |
| exp(z) | z.exp() |
| ln(z) | z.ln() |
| log_n(z) | z.logn(n) |
| log10(z) | z.log() |
| z^(1/n) | z.nrt(n) |
| zi | z.i() |
| z(-i) | z.in() |
| sin(z) | z.sin() |
| cos(z) | z.cos() |
| tan(z) | z.tan() |
| sec(z) | z.sec() |
| csc(z) | z.csc() |
| cot(z) | z.cot() |
| asin(z) | z.asin() |
| acos(z) | z.acos() |
| atan(z) | z.atan() |
| asec(z) | z.asec() |
| acsc(z) | z.acsc() |
| acot(z) | z.acot() |
| sinh(z) | z.sinh() |
| cosh(z) | z.cosh() |
| tanh(z) | z.tanh() |
| sech(z) | z.sech() |
| csch(z) | z.csch() |
| coth(z) | z.coth() |
| asinh(z) | z.asinh() |
| acosh(z) | z.acosh() |
| atanh(z) | z.atanh() |
| asech(z) | z.asech() |
| acsch(z) | z.acsch() |
| acoth(z) | z.acoth() |
| z = 0 | z.isZero() |
| z é real | z.isReal() |
| z é imaginário puro | z.isImag() |
| z é finito | z.isFinite() |
| z é NaN | z.isNaN() |
| z / abs(z) | z.norm() |
| distance(z, w) | z.distance(w) |
| z(exp(itheta)) | z.rotation(theta) |
| z === w | z.eq(w) |
| z !== w | z.noeq(w) |
| (a, b) -> a+bi | Co(a, b) |
| (r, phi) -> r * e ** (iphi) | Co.Polar(r, phi) |
| Co -> string | z.toString(tipo) |
| Co -> Array em Decimal | z.toArrayDecimal |
| Co -> Array em Number | z.toArrayNumber |
| Co -> Objeto em Decimal| z.toObjectDecimal(tipo)  |
| Co -> Objeto em Number| z.toObjectNumber(tipo)  |
| Co -> JSON| z.toJSON(tipo) |

### Constantes:
| Nome | Representação matemática |
|---|---|
| PI | π |
| E | número de Euler |
| TAU | τ / 2π |
| SQRT2 | sqrt(2) |
| SQRT3 | sqrt(3) |
| SQRT5 | sqrt(5) |
| LN10 | ln(10) |
| LN2 | ln(2) |
| LOG10E | log10(E) |
| PHI | φ / (1+sqrt(5))/2 |
| PI_2 | π/2 |
| PI_3 | π/3 |
| PI_4 | π/4 |
| I | sqrt(-1) |
| MINUS_I | -sqrt(-1) |
| ONE | 1 |
| MINUS_ONE | -1 |
| ZERO | 0 |

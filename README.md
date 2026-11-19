# Compleximy
Uma biblioteca de números complexos com precisão arbitrária que eu criei há 44 dias atrás (na data de hoje 19/11/2026)
Todos os ramos escolhidos são o principal (k = 0)
O truncamento é para qualquer número menor que a precisão 'p' menos 5
Ex: para p = 100, 1e-95 é considerado 0
O construtor do Co aceita Co(1) e Co(1, 0), omitir o segundo argumento é permitido

## Instalação:
### npm i compleximy


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
| z / abs(z) | z.norm() |
| distance(z, w) | z.distance(w) |
| z(exp(itheta)) | z.rotation(theta) |
| z === w | z.eq(w) |
| z !== w | z.noeq(w) |
| (a, b) -> a+bi | Co(a, b) |
| (r, phi) -> r * e ** (iphi) | Co("RrPHI") |
| Co -> string | z.toString(tipo) |
| Co -> Array em Decimal | z.toArrayDecimal() |
| Co -> Array em Number | z.toArrayNumber() |
| Co -> Objeto em Decimal| z.toObjectDecimal(tipo)  |
| Co -> Objeto em Number| z.toObjectNumber(tipo)  |
| Co -> JSON| z.toJSON(tipo) |
| parte real de z | z[0] |
| parte imaginária de z | z[1] |

### Constantes:
| Nome | Representação matemática |
|---|---|
| PI | π |
| E | número de Euler |
| TAU | τ ou 2π |
| SQRT2 | sqrt(2) |
| SQRT3 | sqrt(3) |
| SQRT5 | sqrt(5) |
| LN10 | ln(10) |
| LN2 | ln(2) |
| LOG10E | log10(E) |
| PHI | φ ou (1+sqrt(5))/2 |
| PI_2 | π/2 |
| PI_3 | π/3 |
| PI_4 | π/4 |
| I | sqrt(-1) |
| MINUS_I | -sqrt(-1) |
| ONE | 1 |
| MINUS_ONE | -1 |
| ZERO | 0 |

## Co
Aceita:
|---|
  |Número: (-1, 3, -7812, 1.94, "34", "8230134", "-98143", ...)|
  |Imaginário puro: (i, -i, 83i, -3.8324i, ...)|
  |Objeto: ({abs, arg}, {real, imag}, {r, phi}, ...)|
  |Array: ([3, 3], [-1, 0], ["-1", "-1"], ...)|
  |Complexo completo: (1+i, 1-i, 432187+49i, 0.972134+1.1238974i, ...)|
  
#### Exemplos
| Entrada | Saída |
|---|---|
|"1+i" | Co(1, 1) |
|"113+14i" | Co(113, 14) |
|1 | Co(1, 0) |
|[1, 1] | Co(1, 1) |
|[1, 2] | Co(1, 2) |
|{real: 1, imag: 2} | Co(1, 2) |
| (1, 3) | Co(1, 3) |
|"3i" | Co(0, 3) |
| 1e-1+1e-1i | Co(1e-1, 1e-1) |
| "1+2I" | Co(1, 2) |
| "1r3" | Co(...Convertido em polar, ...) |
| "1∠3" | Co(...Convertido em polar, ...) |
|"1+Ei" | Co(1, E) |
| Outro Co | Cópia dele |

#### Exemplos de falha
| Entrada |
|---|
|("1+i", 1) |
|"113i+14" |
|(1, "i") |
|() | 
|[1, 1, 1] | 
|{a: 1, b: 2} |
| null | 
| undefined |
| [] | 


## Métodos toAlgo

### toString(tipo = "Cartesian")

| Entrada | Saída | tipo |
|---|---|---|
| Co(1, 1) | "1 + i" | "Cartesian" |
| Co(1, 1) | "1.4142135623730... * e ** (0.785398163397...i)" | Euler |
| Co(1, 1) | "1.4142135623730... ∠ 0.785398163397..." | PolarSy |
| Co(1, 1) | "1.4142135623730... r 0.785398163397..." | PolarChar |

> "Euler" é apenas para exibição — **não** é parseável por Co, somente Cartesian, PolarSy e PolarChar

### toArrayDecimal()

| Entrada | Saída | Descrição |
|---|---|---|
| Co(new Decimal(2).sqrt(), 1) | [ Decimal(1.414213562373095048801...), Decimal(1) ] | Retorna [real, imag] como Decimal |

### toArrayNumber()

| Entrada | Saída | Descrição |
|---|---|---|
| Co(new Decimal(2).sqrt(), 1) | [ 1.4142135623730951, 1 ] | Retorna [real, imag] como Decimal |

### toObjectDecimal(tipo = "Cartesian")

| Entrada | Saída | tipo |
|---|---|---|
| Co(new Decimal(2).sqrt(), 1) | { real: Decimal(1.414213562373095048801...), imag: Decimal(1) } | "Cartesian" |
| Co(new Decimal(2).sqrt(), 1) | { re: Decimal(1.414213562373095048801...), im: Decimal(1) } | "CartesianSmall" |
| Co(new Decimal(2).sqrt(), 1) | { r: Decimal(1.732050807568877293527...), phi: Decimal(0.61547970867038734106...) } | "PolarR" |
| Co(new Decimal(2).sqrt(), 1) | { abs: Decimal(1.732050807568877293527...), arg: Decimal(0.61547970867038734106...) } | "PolarABS" |

### toObjectNumber(tipo = "Cartesian")

| Entrada | Saída | tipo |
|---|---|---|
| Co(new Decimal(2).sqrt(), 1) | { real: 1.4142135623730951, imag: 1 } | "Cartesian" |
| Co(new Decimal(2).sqrt(), 1) | { re: 1.4142135623730951, im: 1 } | "CartesianSmall" |
| Co(new Decimal(2).sqrt(), 1) | { r: 1.7320508075688772, phi: 0.6154797086703873 } | "PolarR" |
| Co(new Decimal(2).sqrt(), 1) | { abs: 1.7320508075688772, arg: 0.6154797086703873 } | "PolarABS" |

### toJSON(tipo = "Cartesian")

| Entrada | Saída | tipo |
|---|---|---|
| Co(new Decimal(2).sqrt(), 1) | { real: "1.414213562373095048801...", imag: "1" } | "Cartesian" |
| Co(new Decimal(2).sqrt(), 1) | { re: "1.414213562373095048801...", im: "1" } | "CartesianSmall" |
| Co(new Decimal(2).sqrt(), 1) | { r: "1.732050807568877293527...", phi: "0.61547970867038734106..." } | "PolarR" |
| Co(new Decimal(2).sqrt(), 1) | { abs: "1.732050807568877293527...", arg: "0.61547970867038734106..." } | "PolarABS" |

### Notas

- Os tipos de toObjectDecimal, toObjectNumber e toJSON são os mesmos que Co aceita na entrada
- Então:
-  Co(z.toObjectDecimal("Cartesian")) // => z
-  Co(z.toObjectDecimal("PolarR"))    // => z
-  Co(JSON.parse(JSON.stringify(z)))  // => z

# Exemplos de uso:
- `new Co("1+i").add(1, 1) //(1+i)+(1+i)`
- 
- `new Co(1, 1).pow2().pow(4).sqrt() // sqrt((1+i)^2)^4)`
- 
- `Co.PI.i().exp().add(1) // e^ipi+1`
- 
- `Co.E.add(Co.PI) // E+PI`

### Obs:
- Eu felizmente excluí o estático Co.polar, ele não merecia sequer existir (sim)
- Agora a classe é por Array, não objetos
- Co é só um wrapper
- tests 42 e pass 42, passou em todos os testes
- Eu realmente reescrevi tudo, mas externamente mudou nada Co nem é construtor mais, Co.i que é
- Reescrevi todas as operações também, agora não é mais tudo encadeado (a maioria que é pesada ao menos)
- Provavelmente amanhã vai ter novas coisas

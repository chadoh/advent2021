const entries = require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n').map(line => line.split(' | ').map(x => x.split(' ')))

const outputSum = entries.reduce((sum, [ins, outs]) => {
  ins = ins.sort((a, b) => a.length - b.length).map(n => n.split('').sort().join(''))
  outs = outs.map(n => n.split('').sort().join(''))
  const one = ins[0]
  const rightSegments = one.split('')
  const seven = ins[1]
  const four = ins[2]
  const midAndTopLeftSegments = four.split('').filter(f => rightSegments.every(r => !f.includes(r)))
  const eight = ins[9]
  const twoThreeOrFive = ins.slice(3, 6)
  const three = twoThreeOrFive.filter(n => rightSegments.every(m => n.includes(m)))[0]
  const zeroSixOrNine = ins.slice(6, 9)
  const five = twoThreeOrFive.filter(n => {
    const fiveSegments = n.split('')
    return midAndTopLeftSegments.every(s => fiveSegments.includes(s))
  })[0]
  const two = twoThreeOrFive.filter(n => n !== five && n !== three)[0]
  const six = zeroSixOrNine.filter(n => {
    const sixSegments = n.split('')
    return !rightSegments.every(s => sixSegments.includes(s))
  })[0]
  const zeroOrNine = zeroSixOrNine.filter(n => n !== six)
  const fiveSegments = five.split('')
  const nine = zeroOrNine.filter(n => {
    const nineSegments = n.split('')
    return fiveSegments.every(s => nineSegments.includes(s))
  })[0]
  const zero = zeroSixOrNine.filter(n => n !== six && n !== nine)[0]
  const toNum = {
    [zero]: 0,
    [one]: 1,
    [two]: 2,
    [three]: 3,
    [four]: 4,
    [five]: 5,
    [six]: 6,
    [seven]: 7,
    [eight]: 8,
    [nine]: 9,
  }
  const out = outs.map(o => toNum[o])
  const output = out[3] + out[2] * 10 + out[1] * 100 + out[0] * 1000
  if (isNaN(output)) {
    console.log({ zero, one, two, three, four, five, six, seven, eight, nine, ins, toNum, outs, out, output })
  }
  return sum + output
}, 0)

console.log({ outputSum })
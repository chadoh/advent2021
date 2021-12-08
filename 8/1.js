const frequencies = {
  1: 0,
  4: 0,
  7: 0,
  8: 0,
}

require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).match(/\| .+$/gm).forEach(output => {
  output.match(/[a-g]+/g).forEach(digit => {
    if (digit.length === 2) frequencies[1]++
    if (digit.length === 3) frequencies[7]++
    if (digit.length === 4) frequencies[4]++
    if (digit.length === 7) frequencies[8]++
  })
})

console.log({
  frequencies,
  total: Object.values(frequencies).reduce((a, b) => a + b)
})
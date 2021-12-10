const rows = require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n').map(row => row.split(''))

const lows = []

rows.forEach((row, y) => {
  row.forEach((point, x) => {
    const above = y > 0 ? rows[y - 1][x] : Infinity
    const below = y < rows.length - 1 ? rows[y + 1][x] : Infinity
    const left = x > 0 ? rows[y][x - 1] : Infinity
    const right = x < row.length - 1 ? rows[y][x + 1] : Infinity
    if (point < above && point < below && point < left && point < right) {
      lows.push(point)
    }
  })
})

console.log({ lows, riskSum: lows.map(Number).reduce((a, b) => a + b + 1, 0) })
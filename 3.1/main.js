const columnTotals = []

require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n').forEach(number => {
  number.split('').forEach((bit, col) => {
    columnTotals[col] = columnTotals[col] || { 0: 0, 1: 0 }
    columnTotals[col][bit] += 1
  })
})

let gamma = ''
let epsilon = ''

columnTotals.forEach(total => {
  if (total[0] > total[1]) {
    gamma += 0
    epsilon += 1
  } else {
    gamma += 1
    epsilon += 0
  }
})

console.log('binary', { gamma, epsilon })

gamma = parseInt(gamma, 2)
epsilon = parseInt(epsilon, 2)

console.log('decimal', { gamma, epsilon, product: gamma * epsilon })
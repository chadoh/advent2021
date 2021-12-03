const input = require('fs').readFileSync(
  require('path').join(__dirname, '../3.1/input.txt'),
  'utf8'
).split('\n')

const columnTotals = numbers => {
  const totals = []
  numbers.forEach(number => {
    number.split('').forEach((bit, col) => {
      totals[col] = totals[col] || { 0: 0, 1: 0 }
      totals[col][bit] += 1
    })
  })
  return totals
}

const mostCommonForEachBitPosition = numbers => {
  const totals = columnTotals(numbers)
  return totals.map(total => total[1] >= total[0] ? '1' : '0')
}

const leastCommonForEachBitPosition = numbers => {
  const totals = columnTotals(numbers)
  return totals.map(total => total[0] <= total[1] ? '0' : '1')
}

let oxygenGeneratorPossibilities = [...input]
let co2ScrubberPossibilities = input

for (let col = 0; col < input[0].length; col++) {
  if (oxygenGeneratorPossibilities.length > 1) {
    const mostCommon = mostCommonForEachBitPosition(
      oxygenGeneratorPossibilities
    )[col]
    oxygenGeneratorPossibilities = oxygenGeneratorPossibilities.filter(
      n => n[col] === mostCommon
    )
  }
  if (co2ScrubberPossibilities.length > 1) {
    const leastCommon = leastCommonForEachBitPosition(
      co2ScrubberPossibilities
    )[col]
    co2ScrubberPossibilities = co2ScrubberPossibilities.filter(
      n => n[col] === leastCommon
    )
  }
  if (oxygenGeneratorPossibilities.length === 1 && co2ScrubberPossibilities.length === 1) {
    break
  }
}

let oxygenGeneratorRating = oxygenGeneratorPossibilities[0]
let co2ScrubberRating = co2ScrubberPossibilities[0]

console.log('binary', { oxygenGeneratorRating, co2ScrubberRating })

oxygenGeneratorRating = parseInt(oxygenGeneratorRating, 2)
co2ScrubberRating = parseInt(co2ScrubberRating, 2)

console.log('decimal', {
  oxygenGeneratorRating,
  co2ScrubberRating,
  product: oxygenGeneratorRating * co2ScrubberRating,
})
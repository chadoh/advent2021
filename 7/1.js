const frequencies = {}

const crabs = require('fs').readFileSync(
  require('path').join(__dirname, 'my-input.txt'),
  'utf8'
).split(',').map(Number).sort((a, b) => a - b)

let leastGas = Infinity
let leastGasPosition = null

for (let position = crabs[0]; position <= crabs[crabs.length - 1]; position++) {
  const gasToPosition = crabs.map(
    crab => Math.abs(position - crab)
  ).reduce((a, b) => a + b)
  if (gasToPosition <= leastGas) {
    leastGas = gasToPosition
    leastGasPosition = position
  }
}

crabs.forEach(crab => {
  frequencies[crab] = frequencies[crab] || 0
  frequencies[crab]++
})

const median = crabs.length % 2 === 0 ? (
  (
    crabs[Math.floor((crabs.length - 1) / 2)] +
    crabs[Math.ceil((crabs.length - 1) / 2)]
  ) / 2
) : crabs[(crabs.length - 1) / 2]

const biggestCluster = Math.max(...Object.values(frequencies))

let mode = Object.entries(frequencies)
  .filter(([k, v]) => v === biggestCluster)
  .map(([k, v]) => k)
  .map(Number)

if (mode.length === 1) mode = mode[0]

console.log({
  // crabs,
  mean: crabs.reduce((a, b) => a + b) / crabs.length,
  median,
  // frequencies,
  biggestCluster,
  mode,
  leastGas,
  leastGasPosition,
})
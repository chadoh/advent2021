let fishes = require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split(',').map(Number)

// how many fish are there with 0 days, 1 day, 2 days, etc
let fishPerTime = fishes.reduce(
  (acc, f) => { acc[f]++; return acc },
  Array(9).fill(0)
)

const DAYS = 256

console.log('Starting fishPerTime:', fishPerTime)

for (let day = 0; day < DAYS; day++) {
  const oldZeroes = fishPerTime.shift()
  fishPerTime[6] += oldZeroes
  fishPerTime[8] = oldZeroes
}

console.log(`After ${DAYS} days:`, fishPerTime)
console.log(`(${fishPerTime.reduce((a, b) => a + b)} total fish)`)
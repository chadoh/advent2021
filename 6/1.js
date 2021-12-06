let fish = require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split(',').map(Number)

const DAYS = 80

console.log('Starting fish:', fish)

for (let day = 0; day < DAYS; day++) {
  let newborns = 0
  fish = fish.map(f => {
    if (f === 0) {
      newborns++
      return 6
    }
    return f - 1
  }).concat(Array(newborns).fill(8))
}

console.log(`After ${DAYS} days:`, fish)
console.log(`(${fish.length} total fish)`)
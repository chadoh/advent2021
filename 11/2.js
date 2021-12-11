const rows = require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n').map(row => row.split('').map(Number))

const STEPS = 1000

let toFlash = []

function increase({ x, y }) {
  if (x >= 0 && x < rows[0].length && y >= 0 && y < rows.length) {
    rows[y][x]++
    if (rows[y][x] === 10) {
      toFlash.push([x, y])
      for (let deltaX = -1; deltaX <= 1; deltaX++) {
        for (let deltaY = -1; deltaY <= 1; deltaY++) {
          if (!(deltaX === 0 && deltaY === 0)) {
            increase({ x: x + deltaX, y: y + deltaY })
          }
        }
      }
    }
  }
}

let flashCount = 0

for (let i = 0; i < STEPS; i++) {
  rows.forEach((row, y) => row.forEach((point, x) => {
    increase({ x, y })
  }))
  if (toFlash.length === 100) {
    console.log(`All flash on step ${i + 1}`)
    process.exit()
  }
  flashCount += toFlash.length
  toFlash.forEach(([x, y]) => rows[y][x] = 0)
  toFlash = []
}
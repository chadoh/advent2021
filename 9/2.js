const rows = require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n').map(row => row.split('').map(Number))

const basinSizes = [
  // 3,
  // 9,
  // 14,
]

const coordToBasin = {
  // '0,0': 0,
  // '1,0': 0,
  // '2,0': null,
  // '3,0': null,
  // '4,0': null,
  // '5,0': 1,
  // '6,0': 1,
  // '7,0': 1,
  // '8,0': 1,
  // '9,0': 1,
  // '0,1': 0,
  // '1,1': null,
  // '2,1': 2,
  // '3,1': 2,
  // '4,1': 2,
  // '5,1': null,
  // '6,1': 1,
  // '7,1': null,
  // '8,1': 1,
  // '9,1': 1,
}

function recordPoint({ x, y, basin }) {
  const coord = `${x},${y}`
  if (coordToBasin.hasOwnProperty(coord)) return

  coordToBasin[coord] = basin
  basinSizes[basin]++
  checkAbove({ x, y, basin })
  checkBelow({ x, y, basin })
  checkLeft({ x, y, basin })
  checkRight({ x, y, basin })
}

function checkAbove({ x, y, basin }) {
  if (y > 1) {
    const y2 = y - 1
    const point = rows[y2][x]
    if (point === 9) {
      coordToBasin[`${x},${y2}`] = null
    } else {
      recordPoint({ x, y: y2, basin })
    }
  }
}
function checkBelow({ x, y, basin }) {
  if (y < rows.length - 1) {
    const y2 = y + 1
    const point = rows[y2][x]
    if (point === 9) {
      coordToBasin[`${x},${y2}`] = null
    } else {
      recordPoint({ x, y: y2, basin })
    }
  }
}

function checkLeft({ x, y, basin }) {
  if (x > 0) {
    const x2 = x - 1
    const point = rows[y][x2]
    if (point === 9) {
      coordToBasin[`${x2},${y}`] = null
    } else {
      recordPoint({ x: x2, y, basin })
    }
  }
}

function checkRight({ x, y, basin }) {
  if (x < rows[0].length - 1) {
    const x2 = x + 1
    const point = rows[y][x2]
    if (point === 9) {
      coordToBasin[`${x2},${y}`] = null
    } else {
      recordPoint({ x: x2, y, basin })
    }
  }
}

rows.forEach((row, y) => {
  row.forEach((point, x) => {
    const coord = `${x},${y}`

    if (coordToBasin.hasOwnProperty(coord)) return

    if (point === 9) {
      coordToBasin[coord] = null
    } else {
      const basin = basinSizes.length
      basinSizes.push(0)
      recordPoint({ x, y, basin })
    }
  })
})

const sortedBasinSizes = [...basinSizes].sort((a, b) => a - b)
const largestThree = sortedBasinSizes.slice(-3)

console.log({
  // coordToBasin,
  basinSizes,
  sortedBasinSizes,
  largestThree,
  product: largestThree.reduce((a, b) => a * b),
})
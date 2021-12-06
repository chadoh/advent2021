
const input = require('fs').readFileSync(
  require('path').join(__dirname, 'example-input.txt'),
  'utf8'
).split('\n')

const ventsAtCoordinate = {
  // '3,9': 1,
  // '9,0': 2,
  // '9,1': 2,
  // '9,2': 2,
}

const coordsWithMoreThanOneVent = [
  // '9,0',
  // '9,1',
  // '9,2',
]

let largestX = 0
let largestY = 0

const vents = input.map(line => {
  const [[x1, y1], [x2, y2]] = line.match(/\d+,\d+/g).map(
    s => s.split(',').map(Number)
  )
  // hold onto largest to print map
  if (x1 > largestX) largestX = x1
  if (x2 > largestX) largestX = x2
  if (y1 > largestY) largestY = y1
  if (y2 > largestY) largestY = y2

  if (x1 === x2 || y1 === y2) {
    const exes = [x1, x2].sort()
    const whys = [y1, y2].sort()
    for (let x = exes[0]; x <= exes[1]; x++) {
      for (let y = whys[0]; y <= whys[1]; y++) {
        const coord = `${x},${y}`
        ventsAtCoordinate[coord] = ventsAtCoordinate[coord] || 0
        if (ventsAtCoordinate[coord] === 1) {
          coordsWithMoreThanOneVent.push(coord)
        }
        ventsAtCoordinate[coord]++
      }
    }
  }
  return [[x1, y1], [x2, y2]]
})

// TODO: make SVG of vents

console.log({
  coordsWithMoreThanOneVent,
  count: coordsWithMoreThanOneVent.length,
})
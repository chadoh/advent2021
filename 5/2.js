const fs = require('fs')
const INFILE = require('path').join(__dirname, 'input.txt')

const input = fs.readFileSync(INFILE, 'utf8').split('\n')

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

function recordCoordinate(x, y) {
  const coord = `${x},${y}`
  ventsAtCoordinate[coord] = ventsAtCoordinate[coord] || 0
  if (ventsAtCoordinate[coord] === 1) {
    coordsWithMoreThanOneVent.push(coord)
  }
  ventsAtCoordinate[coord]++
}

const vents = input.map(line => {
  const [[x1, y1], [x2, y2]] = line.match(/\d+,\d+/g).map(
    s => s.split(',').map(Number)
  )
  // hold onto largest to print map
  if (x1 > largestX) largestX = x1
  if (x2 > largestX) largestX = x2
  if (y1 > largestY) largestY = y1
  if (y2 > largestY) largestY = y2

  let [x, y] = [x1, y1]
  recordCoordinate(x, y)
  while (x !== x2 || y !== y2) {
    if (x !== x2) x = x < x2 ? x + 1 : x - 1
    if (y !== y2) y = y < y2 ? y + 1 : y - 1
    recordCoordinate(x, y)
  }
  return [[x1, y1], [x2, y2]]
})

fs.writeFileSync(INFILE.replace('.txt', '.svg'), `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="${largestX + 1}" height="${largestY + 1}" viewBox="0 0 ${largestX + 1} ${largestY + 1}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve">${vents.map(([[x1, y1], [x2, y2]]) =>
  `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,0,100,0.4)" stroke-width="1"/>`
).join('')
  }</svg>`)


console.log({
  coordsWithMoreThanOneVent,
  count: coordsWithMoreThanOneVent.length,
})
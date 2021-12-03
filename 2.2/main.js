let aim = 0
let horizontal = 0
let depth = 0
const move = {
  forward: dist => { horizontal += dist; depth += dist * aim },
  up: dist => aim -= dist,
  down: dist => aim += dist,
}

require('fs').readFileSync(
  require('path').join(__dirname, '../2.1/input.txt'),
  'utf8'
).split('\n').forEach(line => {
  let [dir, dist] = line.split(' ')
  move[dir](parseInt(dist))
})

console.log({ horizontal, depth, product: horizontal * depth })
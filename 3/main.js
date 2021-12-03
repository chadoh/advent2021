let horizontal = 0
let depth = 0
const move = {
  forward: dist => horizontal += dist,
  up: dist => depth -= dist,
  down: dist => depth += dist,
}

require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n').forEach(line => {
  let [dir, dist] = line.split(' ')
  move[dir](parseInt(dist))
})

console.log({ horizontal, depth, product: horizontal * depth })
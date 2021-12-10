const illegalCounts = {
  ')': 0,
  ']': 0,
  '}': 0,
  '>': 0,
}

const illegalScores = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const closers = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n').forEach(line => {
  const chunks = []
  let valid = true
  line.split('').forEach(char => {
    if (!valid) return
    if (closers.hasOwnProperty(char)) {
      chunks.push(char)
    } else if (char === closers[chunks[chunks.length - 1]]) {
      chunks.pop()
    } else {
      illegalCounts[char]++
      valid = false
    }
  })
})

console.log({
  illegals: illegalCounts,
  score: Object.entries(illegalCounts).reduce(
    (sum, [char, count]) => sum + illegalScores[char] * count,
    0
  )
})
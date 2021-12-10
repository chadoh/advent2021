const completionScores = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const closers = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
}

const completions = []

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
      valid = false
    }
  })
  if (valid) {
    completions.push(
      chunks.reverse().map(char => closers[char])
    )
  }
})

const scores = completions.map(completion => completion.reduce(
  (score, char) => score * 5 + completionScores[char],
  0
))

console.log({
  completions: completions.map(x => x.join('')),
  scores,
  score: [...scores].sort((a, b) => a - b)[(scores.length - 1) / 2],
})
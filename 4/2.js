
const input = require('fs').readFileSync(
  require('path').join(__dirname, 'input.txt'),
  'utf8'
).split('\n')

const draws = input.shift().split(',').map(Number)

let boardIndex = -1

const boards = input.reduce(
  (boards, line) => {
    if (line === '') {
      boardIndex++
      boards[boardIndex] = []
    } else {
      boards[boardIndex] = [
        ...boards[boardIndex],
        ...line.split(' ').filter(n => n).map(Number)
      ]
    }
    return boards
  },
  []
)

// number of numbers matched in each col/row after each drawn number
const tallies = boards.map(() => ({
  col: [0, 0, 0, 0, 0],
  row: [0, 0, 0, 0, 0]
}))

const winningBoards = []

function updateTallies(draw) {
  boards.forEach((board, boardNum) => {
    const boardAlreadyWon = winningBoards.findIndex(i => i === boardNum) !== -1
    if (boardAlreadyWon) return
    const tally = tallies[boardNum]
    const at = board.findIndex(n => n === draw)
    if (at === -1) return
    const col = at % 5
    const row = Math.floor(at / 5)
    tally.col[col]++
    tally.row[row]++
    board[at] = NaN
    if (tally.col[col] !== 5 && tally.row[row] !== 5) return
    if (winningBoards.length === boards.length - 1) {
      const uncalledSum = board.filter(n => !isNaN(n)).reduce(
        (a, b) => a + b,
        0
      )
      console.log(
        `board#${boardNum} loses! board score: ${uncalledSum * draw}`
      )
      process.exit()
    } else {
      winningBoards.push(boardNum)
    }
  })
}

draws.forEach(updateTallies)
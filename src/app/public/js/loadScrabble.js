
function loadScrabble () {
  // Loop to generate the gameboard to start the game

  for (i = 0; i <= 224; i++) {
    const grid = document.getElementById('game-board-id')
    const box = document.createElement('div')

    if (i === 0 || i === 7 || i === 14 || i === 105 || i === 112 || i === 119 || i === 210 || i === 217 || i === 224) {
      if (i === 112) {
        box.textContent = '★'
        box.id = 'centre-id'
      } else {
        box.textContent = '3W'
      }
      box.className = 'box-dark-pink'
    } else if (i === 16 || i === 28 || i === 32 || i === 42 || i === 48 || i === 56 || i === 64 || i === 70 || i === 154 || i === 160 || i === 168 || i === 176 || i === 182 || i === 192 || i === 196 || i === 208) {
      box.className = 'box-light-pink'
      box.textContent = '2W'
    } else if (i === 20 || i === 24 || i === 76 || i === 80 || i === 84 || i === 88 || i === 136 || i === 140 || i === 144 || i === 148 || i === 200 || i === 204) {
      box.className = 'box-dark-blue'
      box.textContent = '3L'
    } else if (i === 3 || i === 11 || i === 36 || i === 38 || i === 45 || i === 52 || i === 59 || i === 92 || i === 96 || i === 98 || i === 102 || i === 108 || i === 116 || i === 122 || i === 126 || i === 128 || i === 132 || i === 165 || i === 172 || i === 179 || i === 186 || i === 188 || i === 213 || i === 221) {
      box.className = 'box-light-blue'
      box.textContent = '2L'
    } else {
      box.className = 'box'
    }
    grid.appendChild(box)
  }
  pieces()
}

function flexCreate () {
  const form = document.getElementById('form')
  form.remove()
  console.log('Board Generated - loadScrabble')

  const body = document.getElementById('body')
  let parent = document.createElement('div')
  parent.className = 'parent'
  parent.id = 'parent-flex'
  body.appendChild(parent)

  parent = document.getElementById('parent-flex')
  const div = document.createElement('div')
  const div2 = document.createElement('div')
  div.id = 'flex-board'
  div2.id = 'flex-tile'
  parent.appendChild(div)
  parent.appendChild(div2)

  const board = document.getElementById('flex-board')
  const game = document.createElement('div')
  game.id = 'game-board-id'
  game.className = 'game-board'
  board.appendChild(game)

  loadScrabble()
}

function pieces () {
  let pieceArr = ['A', 'A', 'A', 'A', 'A', 'A', 'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'D', 'D', 'E', 'E', 'E', 'E', 'E',
    'E', 'E', 'E', 'E', 'E', 'E', 'E', 'F', 'F', 'G', 'G', 'G', 'H', 'H', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'I', 'J',
    'K', 'L', 'L', 'L', 'L', 'M', 'M', 'N', 'N', 'N', 'N', 'N', 'N', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'O', 'P', 'P', 'Q',
    'R', 'R', 'R', 'R', 'R', 'R', 'S', 'S', 'S', 'S', 'T', 'T', 'T', 'T', 'T', 'T', 'U', 'U', 'U', 'U', 'V', 'V', 'W', 'W',
    'X', 'Y', 'Y', 'Z', ' ', ' ']
  const pieces = document.getElementById('flex-tile')
  for (let i = 0; i <= 6; i++) {
    const piece = document.createElement('div')
    const random = getRandomPiece(0, pieceArr.length, pieceArr)
    piece.id = (i + random[0])
    piece.className = 'drag-drop'
    piece.textContent = random[0]
    pieceArr = random[1]
    pieces.append(piece)
  }
}

function getRandomPiece (min, max, arr) {
  const ranNum = Math.floor(Math.random() * (max - min) + min)
  const piece = arr[ranNum]
  removeElement(arr, piece)
  const ret = [piece, arr]
  return ret
}

function removeElement (arr, elem) {
  const index = arr.indexOf(elem)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

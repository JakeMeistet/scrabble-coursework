
function loadScrabble () {
  // Loop to generate the gameboard to start the game
  let row = 1
  let coordArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O']
  let y = 0
  for (i = 0; i <= 224; i++) {
    const grid = document.getElementById('game-board-id')
    const box = document.createElement('div')
    const text = document.createElement('p')

    if (i == 0) {
      y = y
    } else {
      if (y == 14) {
        y = 0
        row += 1
      } else {
        y += 1
      }
    }
    box.id = coordArr[y] + row

    if (i === 0 || i === 7 || i === 14 || i === 105 || i === 112 || i === 119 || i === 210 || i === 217 || i === 224) {
      if (i === 112) {
        box.innerText = '★'
      } else {
        box.innerText = '3W'
      }
      box.className = 'box-dark-pink'
    } else if (i === 16 || i === 28 || i === 32 || i === 42 || i === 48 || i === 56 || i === 64 || i === 70 || i === 154 || i === 160 || i === 168 || i === 176 || i === 182 || i === 192 || i === 196 || i === 208) {
      box.className = 'box-light-pink'
      box.innerText = '2W'
    } else if (i === 20 || i === 24 || i === 76 || i === 80 || i === 84 || i === 88 || i === 136 || i === 140 || i === 144 || i === 148 || i === 200 || i === 204) {
      box.className = 'box-dark-blue'
      box.innerText = '3L'
    } else if (i === 3 || i === 11 || i === 36 || i === 38 || i === 45 || i === 52 || i === 59 || i === 92 || i === 96 || i === 98 || i === 102 || i === 108 || i === 116 || i === 122 || i === 126 || i === 128 || i === 132 || i === 165 || i === 172 || i === 179 || i === 186 || i === 188 || i === 213 || i === 221) {
      box.className = 'box-light-blue'
      box.innerText = '2L'
    } else {
      box.className = 'box'
    }
    box.classList.add(coordArr[y] + row)

    grid.appendChild(box)
    box.appendChild(text)

  }
  userDetails()
}

function flexCreate () {

  const head = document.getElementById('head')
  const heading = document.createElement('h1')
  heading.className = 'title2'
  heading.textContent = 'Scrabble by Jake Bailey'
  head.appendChild(heading)

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
  div.className = 'flex-board'
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

function userDetails() {
  let name = localStorage.getItem('username')
  let score = 0
  const flex = document.getElementById('flex-tile')
  const details = document.createElement('div')
  const p = document.createElement('p')
  const rules = document.createElement('a')
  const scorePara = document.createElement('p')
  const click = document.createElement('p')
  click.className = 'score'
  click.innerText = 'Rules'
  details.className = 'details'
  flex.appendChild(details)
  rules.href = 'https://scrabble.hasbro.com/en-us/rules'
  rules.target = '_blank'
  details.appendChild(rules)
  rules.appendChild(click)
  p.className = 'score'
  p.innerText = `Username: ${name}`
  scorePara.className = 'score'
  scorePara.id = 'score'
  scorePara.innerText = `Score: ${score}`
  details.appendChild(p)
  details.appendChild(scorePara)

}

function pieces (pieceArr, gameId) {
  console.log(pieceArr)
  console.log(pieceArr.length)
  const pieces = document.getElementById('flex-tile')
  const gameIdText = document.createElement('p')
  gameIdText.id = 'gameId'
  gameIdText.className = 'score'
  gameIdText.innerText = gameId
  pieces.appendChild(gameIdText)
  for (let i = 0; i <= 6; i++) {
    const text = document.createElement('p')
    const piece = document.createElement('div')
    const drop = document.createElement('div')

    const random = getRandomPiece(0, pieceArr.length, pieceArr)
    const data = random[0].split('')
    let letter = null
    console.log(data)

    if (data.length === 3) {
      letter = data[2]
    } else {
      letter = data[1]
    }
    piece.classList.add(random[0])
    piece.id = random[0]
    piece.classList.add('drag-drop')
    text.className = 'inner-text'
    text.innerText = letter
    drop.className = 'drop-box'
    pieceArr = random[1]
    pieces.appendChild(drop)
    drop.append(piece)
    piece.appendChild(text)


    
  }
  const finishTurn = document.createElement('button')
  finishTurn.id = 'finishBtn'
  finishTurn.className = 'btn2'
  finishTurn.innerText = 'Finish Turn'
  pieces.append(finishTurn)
  return pieceArr
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


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
  const form = document.getElementById('form')
  form.remove()
  console.log('Board Generated - loadScrabble')
}


const socket = io('ws://localhost/')

function start () {
  const username = document.getElementById('username')
  const submit = document.getElementById('submit')
  console.log(username)
  console.log(submit)

  const pastUid = localStorage.getItem('uid')
  if (pastUid === null) {
    const submit = document.getElementById('submit')
    submit.addEventListener('click', () => {
      socket.emit('newPlayer', username.value)
      socket.on('newPlayer', (credentials) => {
        localStorage.setItem('username', credentials.username)
        localStorage.setItem('uid', credentials.uid)
        lobbyPage(socket)
      })
    })
  } else {
    const credentials = { username: localStorage.getItem('username'), uid: pastUid }
    socket.emit('pastPlayer', credentials)
    socket.on('pastPlayer', (newCredentials) => {
      lobbyPage(socket)
    })
  }

  socket.on('noLobby', (gameId) => {
    const login = document.getElementById('loginPage')
    const fail = document.createElement('p')
    fail.id = 'fail'
    fail.className = 'credentials'
    fail.innerText = `No such lobby: ${gameId}`
    login.appendChild(fail)
  })

  socket.on('lobbyJoined', (data) => {
    const login = document.getElementById('loginPage')
    login.innerHTML = ''
    const lobby = document.createElement('p')
    lobby.className = 'lobby'
    lobby.innerText = `You are in lobby: ${data.gameId}`
    login.appendChild(lobby)
  })

  socket.on('playerJoined', (data) => {
    const login = document.getElementById('loginPage')
    login.innerHTML = ''
    const lobby = document.createElement('p')
    lobby.className = 'lobby'
    lobby.innerText = `You are in lobby: ${data.gameId}`
    login.appendChild(lobby)

    const playerJoin = document.createElement('p')
    playerJoin.id = 'player'
    playerJoin.className = 'credentials'
    playerJoin.innerText = `${data.username} just joined.`
    login.appendChild(playerJoin)
  })

  socket.on('fullLobby', (gameId) => {
    const login = document.getElementById('loginPage')
    const fail = document.createElement('p')
    fail.id = 'fail'
    fail.className = 'credentials'
    fail.innerText = `${gameId} is full, either create or join another lobby.`
    login.appendChild(fail)
  })

  socket.on('host', (data) => {
    const login = document.getElementById('loginPage')
    const host = document.createElement('p')
    host.id = 'host'
    host.className = 'credentials'
    host.innerText = `1. ${localStorage.getItem('username')}\n 2. ${data.username}`
    login.appendChild(host)

    const startBtn = document.createElement('button')
    startBtn.id = 'start'
    startBtn.innerText = 'Start'
    startBtn.className = 'btn'
    login.appendChild(startBtn)

    socket.emit('p2', ({ host: localStorage.getItem('username'), gameId: data.gameId }))
  })

  socket.on('p2', (data) => {
    const login = document.getElementById('loginPage')
    const p2 = document.createElement('p')
    p2.id = 'p2'
    p2.className = 'credentials'
    p2.innerText = `1. ${data.host}\n 2. ${localStorage.getItem('username')}`
    login.appendChild(p2)
    socket.emit('beginLoad', data)
  })

  socket.on('startGame', (data) => {
    const startBtn = document.getElementById('start')
    startBtn.addEventListener('click', () => {
      console.log(data)
      socket.emit('startGame', data)
    })
  })

  socket.on('loadBoard', (data) => {
    console.log('clickhere')
    flexCreate()
    socket.emit('loadPieces', data)
  })

  socket.on('loadBoard2', (data) => {
    console.log('clickhere')
    flexCreate()
    socket.emit('loadPieces2', data)
  })

  socket.on('p1Pieces', (data) => {
    console.log('test')
    socket.emit('p1PiecesDone', { gameId: data.gameId, pieceArr: pieces(data.pieceArr, data.gameId) })
  })

  socket.on('p2Pieces', (data) => {
    console.log('testp2')
    socket.emit('p2PiecesDone', { gameId: data.gameId, pieceArr: pieces(data.pieceArr, data.gameId) })
  })

  socket.on('waitOnFinish', (data) => {
    finishGo(data.gameId)
  })

  const allDropped = []
  let round = 0
  socket.on('drop', (data) => {
    console.log(data.gameId)
    if (allDropped === []) {
      round = 1
    } else {
      round += 1
    }
    if (data.count !== 0) {
    socket.emit('saveDropped', data)
    }

    checkDropped(data.gameId, data.droppedItems)
    for (let i = 0; i < data.droppedItems.length; i++) {
      const body = document.body
      const dropCoords = document.getElementById(data.droppedItems[i].dropZone)
      const dropRect = dropCoords.getBoundingClientRect()
      const droppedPiece = document.createElement('div')
      droppedPiece.classList.add(data.droppedItems[i].tile)
      droppedPiece.classList.add('no-drop')
      droppedPiece.classList.add('dropped-tile')
      droppedPiece.style.position = 'absolute'
      dropCenter = {
        x: dropRect.left + dropRect.width / 2,
        y: dropRect.top + dropRect.height / 2
      }
      droppedPiece.style.top = (dropRect.top - 4) + 'px'
      droppedPiece.style.left = (dropRect.left + 1) + 'px'
      const tile = data.droppedItems[i].tile.split('')
      let tileLetter = null
      if (tile.length === 3) {
        tileLetter = tile[2]
      } else {
        tileLetter = tile[1]
      }
      const p = document.createElement('p')
      p.innerText = tileLetter
      p.className = 'inner-text'

      body.appendChild(droppedPiece)
      droppedPiece.appendChild(p)
      dropCoords.classList.add('occupied')
      console.log('element')
    }
    console.log(data)

    droppedItems = []
  })

  socket.on('addPiece', (data) => {
    const dropBox = document.getElementById(data.element)
    const text = document.createElement('p')
    const piece = document.createElement('div')
    const strData = data.piece.split('')
    let letter = null
    console.log(data)
    console.log(strData)
    if (strData.length == 3) {
      console.log(strData[2])
      letter = strData[2]
    } else {
      letter = strData[1]
    }
    piece.classList.add(data.piece)
    piece.id = data.piece
    piece.classList.add('drag-drop')
    text.className = 'inner-text'
    text.innerText = letter
    console.log(data.element)
    dropBox.appendChild(piece)
    piece.appendChild(text)
  })

  socket.on('checkDropped', (data) => {
    console.log(data)
    console.log('test here')
    const allDroppedSorted = data.allDropped.sort(compare)
    console.log(allDroppedSorted)
    let placement = []
    
    for (let i = 0; i < allDroppedSorted.length; i++) {
      const coords = allDroppedSorted[i].dropZone.split('')
      const tiles = allDroppedSorted[i].tile.split('')
      if (coords.length === 2) {
        placement[i] = {row: allDroppedSorted[i].dropZone.split('')[0], column: allDroppedSorted[i].dropZone.split('')[1], tile: tiles}
      } else {
        console.log(tiles)
        placement[i] = {row: allDroppedSorted[i].dropZone.split('')[0], column: (allDroppedSorted[i].dropZone.split('')[1] + allDroppedSorted[i].dropZone.split('')[2]), tile: tiles}
      }
    }
    console.log(placement) 

    let word = []
    let previousColumn = null
    let previousRow = null
    let currentColumn = null
    let currentRow = null
    let nextColumn = null
    let nextRow = null
    let wordCount = 0
    for (let i = 0; i < placement.length; i++) {
      const tile = placement[i].tile
      console.log(tile)
      if (i === 0) {
        previousColumn = placement[i].column
        previousRow = placement[i].row
        if (tile.length === 3) {
          word[wordCount] = tile[2]
        } else {
          word[wordCount] = tile[1]
        }
        
      } else {
        currentColumn = placement[i].column
        currentRow = placement[i].row
        if (placement[i+1] !== undefined) {
        nextColumn = placement[i+1].column
        nextRow = placement[i+1].row
        } 
        if (currentColumn === previousColumn || currentRow === previousRow) {

          if (tile.length === 3) {
            word[wordCount] = word[wordCount] + tile[2]
          } else {
            word[wordCount] = word[wordCount] + tile[1]
          }

        } else {
          if (tile.length === 3) {
            word[wordCount] = tile[2]
          } else {
            word[wordCount] = tile[1]
          }
        }
        if (currentColumn !== nextColumn || currentRow !== nextRow) {
          wordCount += 1
        }
      }
      console.log(word)
    }
    placement = []
    
  })
}

function lobbyPage (socket) {
  const login = document.getElementById('loginPage')

  login.innerHTML = ''
  const lobby = document.createElement('p')
  lobby.className = 'lobby'
  lobby.innerText = 'Please choose a lobby:'
  login.appendChild(lobby)

  const textBox = document.createElement('input')
  textBox.id = 'lobbyId'
  textBox.className = 'credentials'
  textBox.value = 'Enter a lobby ID here'
  login.appendChild(textBox)

  const createBtn = document.createElement('button')
  createBtn.innerText = 'Create'
  createBtn.id = 'createBtn'
  createBtn.className = 'btn'
  login.appendChild(createBtn)

  const joinBtn = document.createElement('button')
  joinBtn.innerText = 'Join'
  joinBtn.id = 'joinBtn'
  joinBtn.className = 'btn'
  login.appendChild(joinBtn)

  createBtn.addEventListener('click', () => { createLobby(socket) })
  joinBtn.addEventListener('click', () => { joinLobby(socket, textBox.value) })
}

function createLobby (socket) {
  socket.emit('createLobby')
}

function joinLobby (socket, gameId) {
  const username = localStorage.getItem('username')
  socket.emit('joinLobby', { gameId: gameId, username: username })
}

function dropSocket (gameId, count) {
  socket.emit('itemDropped', { gameId, droppedItems, count })
}

function replacePieces (element) {
  console.log(element + 'test1')
  socket.emit('addPiece', element)
}

function checkDropped (gameId, droppedItems) {
  socket.emit('checkDropped', { gameId: gameId, droppedItems: droppedItems })
}

function compare (a, b) {
  const dropZoneA = a.dropZone
  const dropZoneB = b.dropZone

  let comparison = 0
  if (dropZoneA > dropZoneB) {
    comparison = 1
  } else if (dropZoneA < dropZoneB) {
    comparison = -1
  }
  return comparison
}

function compareRows (a, b) {
  const columnA = a.row
  const columnB = b.row

  let comparison = 0
  if (columnA > columnB) {
    comparison = 1
  } else if (columnA < columnB) {
    comparison = -1
  }
  return comparison
}

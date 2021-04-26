
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
      socket.emit('startGame', data)
    })
  })

  socket.on('loadBoard', (data) => {
    flexCreate()
    socket.emit('loadPieces', data)
  })

  socket.on('loadBoard2', (data) => {
    flexCreate()
    socket.emit('loadPieces2', data)
  })

  socket.on('p1Pieces', (data) => {
    socket.emit('p1PiecesDone', { gameId: data.gameId, pieceArr: pieces(data.pieceArr, data.gameId), allDropped: data.allDropped, previousWords: data.previousWords })
  })

  socket.on('p2Pieces', (data) => {
    socket.emit('p2PiecesDone', { gameId: data.gameId, pieceArr: pieces(data.pieceArr, data.gameId), allDropped: data.allDropped, previousWords: data.previousWords })
  })

  socket.on('waitOnFinish', (data) => {
    finishGo(data.gameId, data.allDropped, data.previousWords)
  })

  socket.on('dropSaved', (data) => {
    console.log('dropSaved')
    console.log(data.droppedItems)
    checkDropped(data.gameId, data.droppedItems, data.allDropped, data.previousWords)
  })

  socket.on('addPiece', (data) => {
    const dropBox = document.getElementById(data.element)
    const text = document.createElement('p')
    const piece = document.createElement('div')
    const strData = data.piece.split('')
    let letter = null
    if (strData.length == 3) {
      letter = strData[2]
    } else {
      letter = strData[1]
    }
    piece.classList.add(data.piece)
    piece.id = data.piece
    piece.classList.add('drag-drop')
    text.className = 'inner-text'
    text.innerText = letter
    dropBox.appendChild(piece)
    piece.appendChild(text)
  })

  socket.on('checkDropped', (data) => {
    wordSearch(data)
  })

  socket.on('searchComplete', (data) => {
    console.log(data.allEqual)
    if (data.allEqual === true) {
      console.log(data.droppedItems)
      const scoreHolder = document.getElementById('playerScore')
      const currentScore = scoreHolder.innerText
      console.log(currentScore)
      const newScore = data.score + parseInt(currentScore)
      scoreHolder.innerText = newScore

      console.log('hello')
      console.log(data.droppedItems.length)
      console.log(data.droppedItems)
      for (let i = 0; i < data.droppedItems.length; i++) {
        const droppedItem = document.getElementById(data.droppedItems[i].tile)
        console.log(droppedItem)
        if (droppedItem !== null) {
          droppedItem.remove()
        } else {
          continue
        }
      }
      let count = 0
      for (let i = 0; i < 7; i++) {
        const id = i + 'dropBox'

        const dropBox = document.getElementById(i + 'dropBox')
        console.log(dropBox.childNodes)
        if (dropBox.childNodes.length === 0) {
          replacePieces(id)
          count += 1
        } else {
          console.log('Parent full')
        }
      }
      console.log(data)
      console.log('dataAbove')
      socket.emit('piecesRemoved', { allEqual: data.allEqual, droppedItems: data.droppedItems, gameId: data.gameId })
    } else {
      console.log('A word is incorrect')
    }
  })

  socket.on('placePieces', (data) => {
    console.log(data.droppedItems)
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
    }

    droppedItems = []
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
  textBox.placeholder = 'Enter Lobby Id'
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

function searchSocket (allWords, droppedItems, gameId, allDropped, previousWords) {
  socket.emit('dictionarySearch', { allWords: allWords, gameId: gameId, droppedItems: droppedItems, allDropped: allDropped, previousWords: previousWords })
}

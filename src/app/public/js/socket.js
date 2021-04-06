
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
    finishGo()
  })

  socket.on('drop', (gameId) => {
    console.log(gameId)
    for (let i = 0; i < droppedItems.length; i++) {
      const body = document.body
    const dropCoords = document.getElementById(droppedItems[i].dropZone)
    const dropRect = dropCoords.getBoundingClientRect()
    const droppedPiece = document.createElement('div')
    droppedPiece.classList.add(data.tile)
    droppedPiece.classList.add('no-drop')
    droppedPiece.classList.add('dropped-tile')
    droppedPiece.style.position = 'absolute'
    dropCenter = {
      x: dropRect.left + dropRect.width / 2,
      y: dropRect.top + dropRect.height / 2
    }
    droppedPiece.style.top = (dropRect.top - 4) + 'px'
    droppedPiece.style.left = (dropRect.left + 1) + 'px'

    droppedPiece.innerText = droppedItems[i].tile

    body.appendChild(droppedPiece)
    dropCoords.classList.add('occupied')
    console.log('element')
    }
    
  })

  // socket.on('drop-remove', (data) => {

  // })
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

function dropSocket () {
  const gameId = document.getElementById('gameId')
  socket.emit('itemDropped', droppedItems)
}


function start () {
  const socket = io('ws://10.210.70.53/')

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

  socket.on ('noLobby', (gameId) => {
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

  socket.on('fullLobby', (gameId) => {
    const login = document.getElementById('loginPage')
    const fail = document.createElement('p')
    fail.id = 'fail'
    fail.className = 'credentials'
    fail.innerText = `${gameId} is full, either create or join another lobby.`
    login.appendChild(fail)
  })
}

function lobbyPage(socket) {
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
      
      createBtn.addEventListener('click', () => {createLobby(socket)})
      joinBtn.addEventListener('click', () => {joinLobby(socket, textBox.value)})
}

function createLobby(socket) {
  socket.emit('createLobby')
  
}

function joinLobby(socket, gameId) {
  let username = localStorage.getItem('username')
  socket.emit('joinLobby', {gameId: gameId, username: username} )

  // socket.on('playerJoined', () => {
  //   let user = localStorage.getItem('username')
  //   const login = document.getElementById('loginPage')
  //   const playerJoin = document.createElement('p')
  //   playerJoin.id = 'player'
  //   playerJoin.className = 'credentials'
  //   playerJoin.innerText = `${user} just joined.`
  //   login.appendChild(playerJoin)
  // })

  // socket.on ('noLobby', (gameId) => {
  //   const login = document.getElementById('loginPage')
  //   const fail = document.createElement('p')
  //   fail.id = 'fail'
  //   fail.className = 'credentials'
  //   fail.innerText = `No such lobby: ${gameId}`
  //   login.appendChild(fail)
  // })
  
}


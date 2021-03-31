// const socketConnect = io.connect('ws://localhost/')
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
      console.log(credentials)
      localStorage.setItem('username', credentials.username)
      localStorage.setItem('uid', credentials.uid)
      lobbyPage(credentials)
    })
  })

  } else {

    const credentials = { username: localStorage.getItem('username'), uid: pastUid }
    socket.emit('pastPlayer', credentials)
    socket.on('pastPlayer', (newCredentials) => {
      console.log(newCredentials)
      lobbyPage(newCredentials)
      
    })
    
  }
  console.log(pastUid)
}

function lobbyPage(credentials) {
  const login = document.getElementById('loginPage')
      
      login.innerHTML = ''
      const lobby = document.createElement('p')
      lobby.className = 'lobby'
      lobby.innerText = 'Please choose a lobby:'
      login.appendChild(lobby)

      const clientID = document.createElement('p')
      clientID.id = 'clientID'
      clientID.className = 'client'
      clientID.innerText = `ClientID: ${credentials.uid}\n Username: ${credentials.username}`
      login.appendChild(clientID)

      const createBtn = document.createElement('button')
      createBtn.innerText = 'Create'
      createBtn.className = 'btn'
      login.appendChild(createBtn)
    
      
      const joinBtn = document.createElement('button')
      joinBtn.innerText = 'Join'
      joinBtn.className = 'btn'
      login.appendChild(joinBtn)
      
}
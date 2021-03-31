// const socketConnect = io.connect('ws://localhost/')
function connect () {
  const socket = io('ws://localhost/')

  const username = document.getElementById('username')
  const submit = document.getElementById('submit')
  console.log(username)
  console.log(submit)

  // socket.emit('startGame', username.value);

  // socket.on('startGame', (user) => {

  const pastUid = localStorage.getItem('uid')
  if (pastUid === null) {
    socket.emit('newPlayer', username.value)
    socket.on('newPlayer', (credentials) => {
      console.log(credentials)
      const update = document.getElementById('clientID')
      console.log(update)
      update.innerText = `ClientID: ${credentials.uid}`
      localStorage.setItem('username', credentials.username)
      localStorage.setItem('uid', credentials.uid)
    })
  } else {
    const credentials = { username: localStorage.getItem('username'), uid: pastUid }
    socket.emit('pastPlayer', credentials)
    socket.on('pastPlayer', (newCredentials) => {
      console.log(newCredentials)
      const login = document.getElementById('loginPage')
      login.innerHTML = ''
      const lobby = document.createElement('p')
      lobby.className = 'lobby'
      lobby.innerText = 'Please choose a lobby:'
      login.appendChild(lobby)
      const clientID = document.createElement('p')
      clientID.id = 'clientID'
      clientID.className = 'client'
      clientID.innerText = `ClientID: ${newCredentials.uid}\n Username: ${newCredentials.username}`
      login.appendChild(clientID)
    })
  }
  console.log(pastUid)
  // })
}
// async function postData(url = '/user', data = {}) {
//   const response = await fetch (url, {
//       method: 'POST',
//       body: JSON.stringify(credentials)
//     })
// }

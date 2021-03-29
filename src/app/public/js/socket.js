// const socketConnect = io.connect('ws://localhost/')
function connect() {
  const socket = io('ws://localhost/')
  

  const username = document.getElementById('username')
  const submit = document.getElementById('submit')
  console.log(username)
  console.log(submit)

  socket.emit('startGame');


  socket.on('startGame', (user) => {
    const credentials = [user.uid, user.ip, username.value]
    console.log(credentials)
  })

  
}
// async function postData(url = '/user', data = {}) {
//   const response = await fetch (url, {
//       method: 'POST',
//       body: JSON.stringify(credentials)
//     })
// }

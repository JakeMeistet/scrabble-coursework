const socketConnect = io.connect('ws://localhost/')
function connect () {

  const socket = io('http://localhost')
  

  const username = document.getElementById('username')
  const submit = document.getElementById('submit')
  console.log(submit)

  socket.emit('startGame');


  socket.on('startGame', () => {
    flexCreate()
  })
  
}


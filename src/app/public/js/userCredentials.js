
function ip (url) {
  return fetch(url).then(res => res.text())

}

ip('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
  const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
  const ip = data.match(ipRegex)[0]
  let button = document.getElementById('submit')
  button.addEventListener('click', () => {
    const username = document.getElementById('username')
    console.log(username)

    const credentials = {
      username: username.value,
      ip: ip,
      id: ''
    }
    console.log(credentials)
    postData(credentials)
}) 

  

})

async function postData(url = '/user', data = {}) {
  const response = await fetch (url, {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
}

function generateID (credentials) {
  
  fetch (
    'http://localhost',
    { method: 'POST'}
  )
  .then(response => response.json)
  .then(json => console.log(json))
  .catch(error => console.error('error:', error))

  console.log('test')
  // const xhr = new XMLHttpRequest()
  // xhr.onload = function () {
  //   const id = this.responseText
  //   console.log(id)
  //   credentials.id = id
  //   const div = document.getElementById('body')
  //   div.insertAdjacentHTML('afterbegin', `<p id="clientID" class="credentials"> Username: ${credentials.username}  ClientID: ${credentials.id}</p>`)
  // }
  // xhr.open('POST', window.location.href)
  // xhr.responseType = 'text'
  // xhr.send()
}

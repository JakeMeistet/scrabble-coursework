
function ip (url) {
  return fetch(url).then(res => res.text())
}

ip('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
  const urlParams = new URLSearchParams(window.location.search)
  const username = urlParams.get('username')
  const ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
  const ip = data.match(ipRegex)[0]

  const credentials = {
    username: username,
    ip: ip,
    id: ''
  }
  console.log(credentials)
  const url = window.location.href
  generateID(credentials)
})

function generateID (credentials) {
  const xhr = new XMLHttpRequest()
  console.log('test')
  xhr.onload = function () {
    const id = this.responseText
    console.log(id)
    credentials.id = id
    const div = document.getElementById('body')
    div.insertAdjacentHTML('afterbegin', `<p id="clientID" class="credentials"> Username: ${credentials.username}  ClientID: ${credentials.id}</p>`)
  }
  xhr.open('POST', window.location.href)
  xhr.responseType = 'text'
  xhr.send()
}

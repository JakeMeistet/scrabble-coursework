

function ip(url){
  return fetch(url).then(res => res.text())
}

ip('https://www.cloudflare.com/cdn-cgi/trace').then(data => {
  const urlParams = new URLSearchParams(window.location.search)
  let username = urlParams.get('username')
  let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/
  let ip = data.match(ipRegex)[0];

  let credentials = {
      username: username,
      ip: ip
  }
  console.log(credentials)
});

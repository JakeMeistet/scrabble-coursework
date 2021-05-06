
/*  This file contains most of the socket.io code for the client side
here I start a connection to 'ws://localhost:8080/ (port 8080) */
const socket = io('ws://localhost:8080/');

/*  The start function is called directly from the index.html file when the body loads
This will generate the username and wait for the submit button to be clicked
this page will only be shown to new users, not returning users.
- Returning users data is stores on localStorage within the browser so
if the user was to clear this data they would appear as a new user  */
function start() {
  const username = document.getElementById('username');
  const submit = document.getElementById('submit');
  console.log(username);
  console.log(submit);

  const pastUid = localStorage.getItem('uid');
  /*  Here is the check for a past user, if it's a new user then it will listen for submit to be clicked
  else, the past player socket is emitted and then the lobby page will be loaded  */
  if (pastUid === null) {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', () => {
      socket.emit('newPlayer', username.value);
      socket.on('newPlayer', (credentials) => {
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('uid', credentials.uid);
        lobbyPage(socket);
      });
    });
  } else {
    const credentials = { username: localStorage.getItem('username'), uid: pastUid };
    socket.emit('pastPlayer', credentials);
    socket.on('pastPlayer', (newCredentials) => {
      lobbyPage(socket);
    });
  }

  /*  This is to prevent a new lobby with a random ID being made using the join button
  if this socket is received the user inputted a lobby ID and tried to join a lobby that
  doesn't exist, hence the 'No such lobby' test is displayed */
  socket.on('noLobby', (gameId) => {
    const login = document.getElementById('loginPage');
    const fail = document.createElement('p');
    fail.id = 'fail';
    fail.className = 'credentials';
    fail.innerText = `No such lobby: ${gameId}`;
    login.appendChild(fail);
  });

  /*  The function will run when the 'lobbyJoined socket is received
  the lobby page will be displayed to the host  */
  socket.on('lobbyJoined', (data) => {
    const login = document.getElementById('loginPage');
    login.innerHTML = '';
    const lobby = document.createElement('p');
    lobby.className = 'lobby';
    lobby.innerText = `You are in lobby: ${data.gameId}`;
    login.appendChild(lobby);
  });

  /*  The function will run when the 'lobbyJoined socket is received
  the lobby page will be displayed to the second player and the lobby page
  will be updated for the host  */
  socket.on('playerJoined', (data) => {
    const login = document.getElementById('loginPage');
    login.innerHTML = '';
    const lobby = document.createElement('p');
    lobby.className = 'lobby';
    lobby.innerText = `You are in lobby: ${data.gameId}`;
    login.appendChild(lobby);

    const playerJoin = document.createElement('p');
    playerJoin.id = 'player';
    playerJoin.className = 'credentials';
    playerJoin.innerText = `${data.username} just joined.`;
    login.appendChild(playerJoin);
  });

  /*  When a lobby that a user has tried to join has 2 players connected this
  function will run, letting the user know they must create or join another lobby
  because the one they are trying to join is full. I have currently limited the game to 2 player only. */
  socket.on('fullLobby', (gameId) => {
    const login = document.getElementById('loginPage');
    const fail = document.createElement('p');
    fail.id = 'fail';
    fail.className = 'credentials';
    fail.innerText = `${gameId} is full, either create or join another lobby.`;
    login.appendChild(fail);
  });

  /*  This function will run when the 'host' socket is received from the socket server
  it will simply update the host's lobby page, giving it a start button and updating the user
  list.  */
  socket.on('host', (data) => {
    const login = document.getElementById('loginPage');
    const host = document.createElement('p');
    host.id = 'host';
    host.className = 'credentials';
    host.innerText = `1. ${localStorage.getItem('username')}\n 2. ${data.username}`;
    login.appendChild(host);

    const startBtn = document.createElement('button');
    startBtn.id = 'start';
    startBtn.innerText = 'Start';
    startBtn.className = 'btn';
    login.appendChild(startBtn);

    socket.emit('p2', ({ host: localStorage.getItem('username'), gameId: data.gameId }));
  });

  /*  This updates the user list for p2 with both of
  the user's names in the list and emits the socket begin
  load as the game is ready to be started  */
  socket.on('p2', (data) => {
    const login = document.getElementById('loginPage');
    const p2 = document.createElement('p');
    p2.id = 'p2';
    p2.className = 'credentials';
    p2.innerText = `1. ${data.host}\n 2. ${localStorage.getItem('username')}`;
    login.appendChild(p2);
    socket.emit('beginLoad', data);
  });

  /*  When the startGame socket is received, the page will hang
  until the host clicks the start game button and then the game will begin
  loading for each user, starting with the host then doing player 2's  */
  socket.on('startGame', (data) => {
    const startBtn = document.getElementById('start');
    startBtn.addEventListener('click', () => {
      socket.emit('startGame', data);
    });
  });

  //  The below two load the boards for players 1 and 2
  socket.on('loadBoard', (data) => {
    flexCreate();
    socket.emit('loadPieces', data);
  });

  socket.on('loadBoard2', (data) => {
    flexCreate();
    socket.emit('loadPieces2', data);
  });

  //  The below two load the pieces/game tiles for players 1 and 2
  socket.on('p1Pieces', (data) => {
    socket.emit('p1PiecesDone', { gameId: data.gameId, pieceArr: pieces(data.pieceArr, data.gameId) });
  });

  socket.on('p2Pieces', (data) => {
    socket.emit('p2PiecesDone', { gameId: data.gameId, pieceArr: pieces(data.pieceArr, data.gameId) });
    alternate('no-drop', true, 'drag-drop');
  });

  /* Here the app will call the finishGo function to wait on the user
  to finish their go and then run through all the game logic  */
  socket.on('waitOnFinish', (data) => {
    finishGo(data.gameId);
  });

  /*  This is the beginning of when the dropped pieces are saved
  so they can be made into words, checked and ran through the*

  dictionary */
  socket.on('dropSaved', (data) => {
    console.log('dropSaved');
    console.log(data.droppedItems);
    checkDropped(data.gameId, data.droppedItems, data.allDropped);
  });

  /*  The function here adds trhe pieces back when a player
  has played their turn and it was all valid. It will place
  a max of 7 pieces back in the user's deck  */
  socket.on('addPiece', (data) => {
    const dropBox = document.getElementById(data.element);
    const text = document.createElement('p');
    const piece = document.createElement('div');
    const strData = data.piece.split('');
    let letter = null;
    if (strData.length === 3) {
      letter = strData[2];
    } else {
      letter = strData[1];
    }
    piece.id = data.piece;
    piece.className = data.piece;
    piece.classList.add('drag-drop');
    text.className = 'inner-text';
    text.innerText = letter;
    dropBox.appendChild(piece);
    piece.appendChild(text);
  });

  // The beginning of where words are created from the tiles dropped by calling the wordSearch function
  socket.on('checkDropped', (data) => {
    wordSearch(data);
  });

  /*  When the socket 'searchComplete' is received from the server
  using the allEqual value, if it is true the element is removed from
  the user's board and then will be replaced on the lobby for all players,
  else there is an incorrect word and the user must re-play their go  */
  socket.on('searchComplete', (data) => {
    if (data.bool === true || data.round > 0) {
      console.log(data.allEqual);
      if (data.allEqual === true) {
        console.log(data.droppedItems);
        const scoreHolder = document.getElementById('playerScore');
        const currentScore = scoreHolder.innerText;
        console.log(currentScore);
        const newScore = data.score + parseInt(currentScore);
        scoreHolder.innerText = newScore;

        console.log('hello');
        console.log(data.droppedItems.length);
        console.log(data.droppedItems);
        for (let i = 0; i < data.droppedItems.length; i++) {
          const droppedItem = document.getElementById(data.droppedItems[i].tile);
          console.log(droppedItem);
          if (droppedItem !== null) {
            droppedItem.remove();
          } else {
            continue;
          }
        }
        let count = 0;
        for (let i = 0; i < 7; i++) {
          const id = i + 'dropBox';

          const dropBox = document.getElementById(i + 'dropBox');
          console.log(dropBox.childNodes);
          if (dropBox.childNodes.length === 0) {
            replacePieces(id);
            count += 1;
          } else {
            console.log('Parent full');
          }
        }
        console.log(data);
        console.log('dataAbove');
        socket.emit('piecesRemoved', { allEqual: data.allEqual, droppedItems: data.droppedItems, gameId: data.gameId })
      } else {
        console.log('A word is incorrect');
        droppedItems = [];
      }
    } else {
      console.log('Start at H8');
    }
  });

  socket.on('alternateRemove', () => {
    alternate('no-drop', true, 'drag-drop');
  });

  socket.on('alternate', (id) => {
    console.log(id);
    alternate('drag-drop', false, 'no-drop');
  });

  socket.on('skip', (data) => {
    for (let i = 0; i < 7; i++) {
      const id = i + 'dropBox';
      const dropBox = document.getElementById(i + 'dropBox');
      console.log(dropBox.childNodes);
      if (dropBox.childNodes.length === 0) {
        replacePieces(id);
      } else {
        console.log('Parent full');
      }
    }
    socket.emit('skipAlternate', data);
  });

  /*  As mentioned above, the pieces are now removed and here
  they are replaced on the lobby (rather than just on the one client)
  so that all users can see the piece that has been placed. */
  socket.on('placePieces', (data) => {
    console.log(data.droppedItems);
    for (let i = 0; i < data.droppedItems.length; i++) {
      const body = document.body;
      const dropCoords = document.getElementById(data.droppedItems[i].dropZone);
      const dropRect = dropCoords.getBoundingClientRect();
      const droppedPiece = document.createElement('div');
      droppedPiece.classList.add(data.droppedItems[i].tile);
      droppedPiece.classList.add('no-drop');
      droppedPiece.classList.add('dropped-tile');
      droppedPiece.style.position = 'absolute';
      dropCenter = {
        x: dropRect.left + dropRect.width / 2,
        y: dropRect.top + dropRect.height / 2,
      };
      droppedPiece.style.top = (dropRect.top - 4) + 'px';
      droppedPiece.style.left = (dropRect.left + 1) + 'px';
      const tile = data.droppedItems[i].tile.split('');
      let tileLetter = null;
      if (tile.length === 3) {
        tileLetter = tile[2];
      } else {
        tileLetter = tile[1];
      }
      const p = document.createElement('p');
      p.innerText = tileLetter;
      p.className = 'inner-text';

      body.appendChild(droppedPiece);
      droppedPiece.appendChild(p);
      dropCoords.classList.add('occupied');
    }
    // droppedItems is reset for the next go
    droppedItems = [];
  });
}

/*  This function generat es the lobby page for the user
it includes the textbox, and a create and join button
this allows a user to either create or join a lobby  */
function lobbyPage(socket) {
  const login = document.getElementById('loginPage');

  login.innerHTML = '';
  const lobby = document.createElement('p');
  lobby.className = 'lobby';
  lobby.innerText = 'Please choose a lobby:';
  login.appendChild(lobby);

  const textBox = document.createElement('input');
  textBox.id = 'lobbyId';
  textBox.className = 'credentials';
  textBox.placeholder = 'Enter Lobby Id';
  login.appendChild(textBox);

  const createBtn = document.createElement('button');
  createBtn.innerText = 'Create';
  createBtn.id = 'createBtn';
  createBtn.className = 'btn';
  login.appendChild(createBtn);

  const joinBtn = document.createElement('button');
  joinBtn.innerText = 'Join';
  joinBtn.id = 'joinBtn';
  joinBtn.className = 'btn';
  login.appendChild(joinBtn);

  /*  These event listeners are used to determine what to do after this page
  it will either create a lobby when the create button is pressed or it will join
  the lobby input in the box when the join button is clicked  */
  createBtn.addEventListener('click', () => { createLobby(socket); });
  joinBtn.addEventListener('click', () => { joinLobby(socket, textBox.value); });
}

// Emits the socket to create a lobby
function createLobby(socket) {
  socket.emit('createLobby');
}

// Gets the username from localStorage and emits the socket to join a lobby
function joinLobby(socket, gameId) {
  const username = localStorage.getItem('username');
  socket.emit('joinLobby', { gameId: gameId, username: username });
}

// This is called
// function dropSocket(gameId, count) {
//   socket.emit('itemDropped', { gameId, droppedItems, count });
// }

// Replaces the pieces that were removed from the game board when a go is valid
function replacePieces(element) {
  socket.emit('addPiece', element);
}

// searchSocket will emit the dictionarySearch socket to initiate a search for the words in the dictionary
function searchSocket(allWords, droppedItems, gameId, allDropped) {
  socket.emit('dictionarySearch', { gameId: gameId, droppedItems: droppedItems, allDropped: allDropped, allWords: allWords });
}

function alternate(drop, bool, removeDrop) {
  for (let i = 0; i < 7; i++) {
    const dropBox = `${i}dropBox`;
    console.log(dropBox);
    const current = document.getElementById(dropBox);
    console.log(current);
    const child = current.childNodes[0];
    console.log(child);
    child.classList.remove(removeDrop);
    child.classList.add(drop);
  }
  const skipBtn = document.getElementById('skipBtn');
  skipBtn.disabled = bool;
  const finishBtn = document.getElementById('finishBtn');
  finishBtn.disabled = bool;
}

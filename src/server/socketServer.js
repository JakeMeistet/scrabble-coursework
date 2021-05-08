/*  Socket.io API is imported to allow the use of websockets as well as crypto, fs and colour:
crypto - used to generate the game id and a uid (original plan for user identification may implement later)
fs - used for reading from the dictionary.txt file
colour - to set different colour for output messages in terminal  */
const socket = require('socket.io');
const Crypto = require('crypto');
const fs = require('fs');
const colour = require('colour');
const boardState = {};
// Check server operating system, necessary for some code to work e.g. \r\n vs \n for new line
const osCheck = process.platform;
console.log(`[LOG] Server OS: ${osCheck}`);


/*  This function initialises the socket server and contains all necessary code
for which the socket server uses for online multiplayer  */
function initSocketServer(server) {
  // A basic colour theme for teminal colours
  colour.setTheme({
    startup: 'rainbow',
    running: 'blue',
    error: 'red',
    log: 'cyan',
  });
  const io = socket(server);

  io.of('/').adapter.on('create-room', (room) => {
    if (room.length <= 8) {
      console.log(`[ROOM] Game room ${room} was created`.running);
      boardState[room] = { allDropped: [], previousWords: [], round: 0 };
    }
  });

  io.of('/').adapter.on('join-room', (room, id) => {
    if (room.length <= 8) {
      console.log(`[ROOM] Socket: ${id} Joined the room: ${room}`.running);
    }
  });

  io.of('/').adapter.on('delete-room', (room, id) => {
    if (room.length <= 8) {
      console.log(`[ROOM] Room ${room} has been deleted`.running);
      delete boardState[room];
    }
  });

  /*  When the socket server recieved the socket 'connection'
  this means a user has connected and the user can then either create or join a game lobby
  The user's ip, username and credentials will also be displayed in the console  */
  io.on('connection', (socket) => {
    console.log('[LOG]  A user just connected.'.log);

    // Just handles a user disconnect console logs this event
    socket.on('disconnect', () => {
      console.log('[LOG]  A user has disconnected.'.log);
    });
    const uid = Crypto.randomBytes(32).toString('hex');
    const ip = socket.request.connection.remoteAddress;

    /*  Different events occur whether the user has been on the game before or not:
    newPlayer - this is if a user has not played the game before,
    the user has to enter a username and continue and will then be taken to the create/
    /join lobby page

    pastPlayer - the user will be loaded straight into the create/join lobby page as they have
    previously created their user.

    A user's uid and username is stored on localStorage within the browser  */
    socket.on('newPlayer', (username) => {
      const credentials = { username: username, uid: uid, ip: ip };
      io.to(socket.id).emit('newPlayer', credentials);
    });

    socket.on('pastPlayer', (credentials) => {
      const newCredentials = { username: credentials.username, uid: credentials.uid, ip: ip };
      io.to(socket.id).emit('pastPlayer', newCredentials);
    });

    /*  This is ran when the createLobby socket is emitted from the client
    it will create a new game lobby id by generating an 8 character string using
    crypto, and joining that client/user to the lobby with that gameId and then
    emits the socket 'lobbyJoined' which then loads a further page  */
    socket.on('createLobby', () => {
      const gameId = Crypto.randomBytes(4).toString('hex').toUpperCase();
      const socketId = socket.id;
      socket.join(gameId);
      io.to(gameId).emit('lobbyJoined', { gameId: gameId, socketId: socketId });
    });

    /*  This is ran when the joinLobby socket is emitted from the client
    it will attempt to join the lobby which was entered in the input box.
    Firstly, though the id will have to be checked that it exists, otherwise
    a new lobby will be created with the inputted string as id. A user can
    only join a lobby if there is only 1 other client connected/in that lobby
    as this scrabble game is currently only set up as 2 player not 3 or 4 also  */
    socket.on('joinLobby', (data) => {
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      if (lookUp === undefined) {
        io.to(socket.id).emit('noLobby', data.gameId);
      } else {
        if (lookUp.size === 2) {
          io.to(socket.id).emit('fullLobby', data.gameId);
        } else {
          socket.join(data.gameId);
          const arr = Array.from(lookUp);
          /*  playerJoined is emitted to the lobby to show the connected users
          and host is emitted to the user who created the lobby as they can now
          start the game  */
          io.in(data.gameId).emit('playerJoined', data);
          io.to(arr[0]).emit('host', data);
        }
      }
    });

    // This just emits a socket 'p2' to load the lobby screen for the second player
    socket.on('p2', (data) => {
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      io.to(arr[1]).emit('p2', data);
    });

    /*  This begins the load sequence for loading the gameboard, tiles and general layout
    for each of the players. This starts for player 1 (the host of the game) and then preceeds to player 2  */
    socket.on('beginLoad', (data) => {
      console.log('[LOG]  Begin Load'.log);
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      io.to(arr[0]).emit('startGame', data);
    });

    socket.on('startGame', (data) => {
      console.log(`[LOG]  Start Game: ${data.gameId}`.log);
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      console.log(data.gameId);
      io.to(arr[0]).emit('loadBoard', data);
    });

    /*  Each player's tiles/pieces are now loaded, using a predefined
    array 'pieceArr' which is randomised (shuffled) then one at a time
    a random position in the array is selected and a tile is generated and
    given to that user, being displayed as one of their 7 tiles. This tile is
    then removed from the array  */
    socket.on('loadPieces', (data) => {
      const pieceArr = ['1A', '2A', '3A', '4A', '5A', '6A', '7A', '8A', '1B', '2B', '1C', '2C', '1D', '2D', '3D', '4D', '1E', '2E', '3E', '4E', '5E',
        '6E', '7E', '8E', '9E', '10E', '11E', '12E', '1F', '2F', '1G', '2G', '3G', '1H', '2H', '1I', '2I', '3I', '4I', '5I', '6I', '7I', '8I', '9I', '1J',
        '1K', '1L', '2L', '3L', '4L', '1M', '2M', '1N', '2N', '3N', '4N', '5N', '6N', '1O', '2O', '3O', '4O', '5O', '6O', '7O', '8O', '9P', '10P', '1Q',
        '1R', '2R', '3R', '4R', '5R', '6R', '1S', '2S', '3S', '4S', '1T', '2T', '3T', '4T', '5T', '6T', '1U', '2U', '3U', '4U', '1V', '2V', '1W', '2W',
        '1X', '1Y', '2Y', '1Z'];
      // Blanks to be sorted out later '1_', '2_']

      // Basic shuffling/randomising algorithm for pieceArr
      for (let i = pieceArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * i);
        const temp = pieceArr[i];
        pieceArr[i] = pieceArr[j];
        pieceArr[j] = temp;
      }
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      // Player 1's pieces are loaded first, then going onto player 2
      io.to(arr[0]).emit('p1Pieces', { gameId: data.gameId, pieceArr: pieceArr });
    });

    // Once p1's pieces are done, p2's board is loaded and then p2's pieces
    socket.on('p1PiecesDone', (data) => {
      console.log('[LOG]  p1PiecesLoaded'.log);
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      console.log('[LOG]  p1BoardLoaded'.log);
      io.to(arr[1]).emit('loadBoard2', data);
    });

    // Pieces
    socket.on('loadPieces2', (data) => {
      console.log('[LOG]  p2PiecesLoaded'.log);
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      console.log('[LOG]  p2BoardLoaded'.log);
      io.to(arr[1]).emit('p2Pieces', data);
    });

    /*  Now that p1 and 2's pieces and boards are generated, the socket
    'waitOnFinish' is emitted to start the players turn, once the turn has finished,
    the program continues  */
    socket.on('p2PiecesDone', (data) => {
      pieceArr = data.pieceArr;
      io.to(data.gameId).emit('waitOnFinish', { pieceArr: data.pieceArr, gameId: data.gameId });
    });

    /*  This is where the dropped pieces are saved to an array
    this array SHOULD be shared between both users (currently a bug I am trying
    to fix) but once shared it will hold all dropped pieces so that the logic
    in which scrapes words from the board using tiles already placed (which is necessary)
    and calculating scores will all work to plan
    - It now works! */
    socket.on('saveDropped', (data) => {
      const board = boardState[data.gameId];
      for (let i = 0; i < data.droppedItems.length; i++) {
        board.allDropped.push(data.droppedItems[i]);
      }
      const map = {};
      const tempArr = [];
      board.allDropped.forEach(element => {
        if (!map[JSON.stringify(element)]) {
          map[JSON.stringify(element)] = true;
          tempArr.push(element);
        }
      });
      while (board.allDropped.length > 0) {
        board.allDropped.pop();
      }
      for (let i = 0; i < tempArr.length; i++) {
        board.allDropped.push(tempArr[i]);
      }

      // 'dropSaved' is emitted to the user along with all necessary data to confirm the data has been saved successfully
      io.in(socket.id).emit('dropSaved', { allDropped: board.allDropped, droppedItems: data.droppedItems, gameId: data.gameId });
    });

    /*  This function will be called when the turn is successful and the user needs more
    tiles generated so they still have 7 tiles. The function gets values from the pieceArr array
    and gets a random tile again. This will be repeated a maximum of 7 times per round but is
    dependent on how many tiles the user has placed on their go.  */
    socket.on('addPiece', (element) => {
      console.log(`[LOG]  addPiece: ${element}`.log);
      const random = getRandomPiece(0, pieceArr.length, pieceArr);
      /*  Check the array length, keeps adding the pieces if the array length is greater than
      0, else there is no more tiles left, this is logged, but this stops any more tiles being
      added as there is none left  */
      if (pieceArr.length > 0) {
        io.to(socket.id).emit('addPiece', { element: element, piece: random[0] });
      } else {
        console.log('[LOG]  No remaining tiles'.log);
      }
    });
    /*  Reads the dictionary.txt file and splitts the file by line
    this allows for an array to be created from the split of the string  */
    const dictionary = fs.readFileSync('./dictionary.txt', 'utf-8');
    let dictionaryArr = [];
    if (osCheck === 'win32') {
      dictionaryArr = dictionary.split('\r\n');
    } else {
      dictionaryArr = dictionary.split('\n');
    }
    /*  This function will run when the checkDropped socket is received
    it will emit a checkDropped socket with all the relevent data to search  */
    socket.on('checkDropped', (data) => {
      io.to(socket.id).emit('checkDropped', { gameId: data.gameId, droppedItems: data.droppedItems, allDropped: data.allDropped, dictionaryArr: dictionaryArr });
    });

    socket.on('skip', (data) => {
      for (let i = 0; i < data.pieces.length; i++) {
        pieceArr.push(data.pieces[i]);
      }
      io.to(socket.id).emit('skip', data);
    });

    /*  exists is later used as an array of objects relating to each word and whether it exists or not
    values holds each letter and its value in the game of scrabble in an array of objects  */
    let exists = [];
    exists = [];
    const values = [
      { letter: 'A', value: 1 },
      { letter: 'B', value: 3 },
      { letter: 'C', value: 3 },
      { letter: 'D', value: 2 },
      { letter: 'E', value: 1 },
      { letter: 'F', value: 1 },
      { letter: 'G', value: 2 },
      { letter: 'H', value: 4 },
      { letter: 'I', value: 1 },
      { letter: 'J', value: 8 },
      { letter: 'K', value: 5 },
      { letter: 'L', value: 1 },
      { letter: 'M', value: 3 },
      { letter: 'N', value: 1 },
      { letter: 'O', value: 1 },
      { letter: 'P', value: 3 },
      { letter: 'Q', value: 10 },
      { letter: 'R', value: 1 },
      { letter: 'S', value: 1 },
      { letter: 'T', value: 1 },
      { letter: 'U', value: 1 },
      { letter: 'V', value: 4 },
      { letter: 'W', value: 4 },
      { letter: 'X', value: 8 },
      { letter: 'Y', value: 4 },
      { letter: 'Z', value: 10 },
      { letter: '_', value: 0 },
    ];

    // Declares the coordinates on the board for all of the special positions in an array of objects
    const special = [
      { type: 'tripleWord', positions: ['A1', 'H1', 'O1', 'A8', 'O8', 'A15', 'H15', 'O15'] },
      { type: 'doubleWord', positions: ['B2', 'N2', 'C3', 'M3', 'D4', 'L4', 'E5', 'K5', 'E11', 'K11', 'D12', 'L12', 'C13', 'M13', 'B14', '14'] },
      { type: 'tripleLetter', positions: ['F2', 'J2', 'B6', 'F6', 'J6', 'N6', 'B10', 'F10', 'J10', 'N10', 'F14', 'J14'] },
      { type: 'doubleLetter', positions: ['D1', 'L1', 'G3', 'I3', 'A4', 'H4', 'O4', 'C7', 'G7', 'I7', 'M7', 'D8', 'L8', 'C9', 'G9', 'I9', 'M9', 'A12', 'H12', 'O12', 'G13', 'I13', 'D15', 'L15'] },
    ];

    /*  Function which runs when the dictionarySearch socket is received.
    '- Searches through the dictionaryArr using a binary search to determine
    whether the pieces placed for a valid word or not. */
    socket.on('dictionarySearch', (data) => {
      const board = boardState[data.gameId];
      let score = 0;
      score = 0;
      const allDroppedLetters = data.droppedItems;
      for (let i = 0; i < board.previousWords.length; i++) {
        removeElement(data.allWords, board.previousWords[i]);
      }

      for (let i = 0; i < data.allWords.length; i++) {
        exists.push({ word: data.allWords[i], exists: (binarySearch(dictionaryArr, data.allWords[i])) });
      }
      const allEqual = boolCheck(exists);
      console.log(allEqual);
      let scoreChange = 1;
      scoreChange = 1;
      let count = 0;

      let bool = false;
      if (allEqual === true) {
        if (boardState[data.gameId].round === 0) {
          let i = 0;
          console.log(boardState[data.gameId].allDropped.length);
          while (bool === false && i < boardState[data.gameId].allDropped.length) {
            console.log(i);
            console.log(boardState[data.gameId].allDropped);
            if (boardState[data.gameId].allDropped[i].dropZone === 'H8') {
              bool = true;
            } else {
              i += 1;
              bool = false;
            }
          }
          console.log(bool);
          if (bool === true) {
            boardState[data.gameId].round += 1;
            score = scoreFunc(data, board, special, allDroppedLetters, count, values, score, scoreChange);
          } else {
            console.log('Start on the centre star (H8)');
          }
        } else {
          boardState[data.gameId].round += 1;
          score = scoreFunc(data, board, special, allDroppedLetters, count, values, score, scoreChange);
        }
      } else {
        // None of the above will run if the play is invalid because it includes a word which doesn't exist
        for (let i = 0; i < data.allWords.length; i++) {
          console.log(exists);
          exists.pop();
        }
        console.log('[LOG]  not all words exist'.log);
        for (let i = 0; i < allDroppedLetters.length; i++) {
          boardState[data.gameId].allDropped.pop();
          console.log('[LOG] Removing incorrect letters'.log);
        }
      }

      console.log(`[LOG]  ${socket.id} score: ${score}`.log);
      /*  duplicates are removed from the previous words array as words may only
      be played once  */
      removeDuplicates(board.previousWords);
      /*  Socket is emitted to continue as the search was complete, the game will continue if it was a valid
      move, if not nothing will happen and the score will remain unchanged and the user will have to continue their
      turn till they get a valid word.  */
      console.log(allEqual);
      console.log(exists);
      io.to(socket.id).emit('searchComplete', { allEqual: allEqual, gameId: data.gameId, droppedItems: data.droppedItems, previousWords: board.previousWords, score: score, round: boardState[data.gameId].round, bool: bool });
    });

    /*  Removes draggable pieces and emits a socket to place permanent pieces on the board.
    An alternate is triggered also to alternate the users turns between player 1 and 2.  */
    socket.on('piecesRemoved', (data) => {
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      console.log(data.gameId);
      console.log('gameId above');
      io.to(data.gameId).emit('placePieces', data);
      for (let i = 0; i < 2; i++) {
        if (arr[i] !== socket.id) {
          console.log(arr);
          console.log(`[LOG]  Socket ${arr[i]} alternating`.log);
          console.log(socket.id);
          io.to(arr[i]).emit('alternate', arr[i]);
        } else {
          io.to(socket.id).emit('alternateRemove');
        }
      }
    });

    /*  This will run when the skipAlternate socket is emitted from the client (when skip is pressed).
    This will log that an alternate is occurring and will emit the 'alternate' or
    'alternateRemove' socket to the relevant user to disable/enable the buttons/pieces. */
    socket.on('skipAlternate', (data) => {
      const lookUp = io.sockets.adapter.rooms.get(data.gameId);
      const arr = Array.from(lookUp);
      console.log(data.gameId);
      console.log('gameId above');
      for (let i = 0; i < 2; i++) {
        if (arr[i] !== socket.id) {
          console.log(arr);
          console.log(`[LOG]  Socket ${arr[i]} alternating`.log);
          console.log(socket.id);
          io.to(arr[i]).emit('alternate', arr[i]);
        } else {
          io.to(socket.id).emit('alternateRemove');
        }
      }
    });
  });
}


function scoreFunc(data, board, special, allDroppedLetters, count, values, score, scoreChange) {
  boardState[data.gameId].round += 1;
  /*  Could potentially be more efficient I feel, though this will determine
  whether pieces are played on special points and therefore works out the score
  after these loops, the score is determined for that play.  */
  for (let i = 0; i < data.allWords.length; i++) {
    board.previousWords.push(data.allWords[i]);
    const currentWord = data.allWords[i].split('');
    for (let j = 0; j < currentWord.length; j++) {
      for (let k = 0; k < values.length; k++) {
        if (currentWord[j] === values[k].letter) {
          for (let l = 0; l < special.length; l++) {
            if (count > allDroppedLetters.length) {
              break;
            }
            if (special[l].positions.includes(allDroppedLetters[count].dropZone)) {
              if (special[l].type === 'doubleLetter') {
                score += (values[k].value * 2);
              } else if (special[l].type === 'tripleLetter') {
                score += (values[k].value * 3);
              } else if (special[l].type === 'tripleWord') {
                scoreChange = 3;
              } else if (special[l].type === 'doubleWord') {
                scoreChange = 2;
              }
              if (count === (allDroppedLetters.length - 1)) {
                break;
              } else {
                count += 1;
              }
            } else {
              continue;
            }
          }
          score += values[k].value;
        } else {
          continue;
        }
      }
    }
  }
  count = 0;
  score = score * scoreChange;
  console.log(`Score ${score}`);
  return score;
}


/*  Function used to get a random piece from the pieceArr
this is used when the user's pieces/tiles are first generated
and when pieces are replaced after thier turn  */
function getRandomPiece(min, max, arr) {
  const ranNum = Math.floor(Math.random() * (max - min) + min);
  const piece = arr[ranNum];
  removeElement(arr, piece);
  const ret = [piece, arr];
  return ret;
}

/*  This funciton is simply used to remove elements from an array
this is used on multiple occasions both client and server side  */
function removeElement(arr, elem) {
  const index = arr.indexOf(elem);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

// Removes and dublicate elements from an array, used as you can only play words once. Therefore remove duplicate words from the array
function removeDuplicates(arr) {
  const x = {};
  arr.forEach(function (i) {
    if (!x[i]) {
      x[i] = true;
    }
  });
  return Object.keys(x);
}

/*  This binary search is what I use to search through the dictionaryArr
I used this because of it's efficiency of searching through large sets of data
rather than using a linear search going through each word in the dictionary one by one,
a binary search splits up the data set, compares what I want to find vs that middle value,
if it's greater than, it disregards the half of the set less than and vise versa, this repeats
till the value is found, if it is not found then it returns false, if it is found then it returns true  */
function binarySearch(dictionaryArr, word) {
  let start = 0;
  let end = dictionaryArr.length - 1;
  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    if (dictionaryArr[middle] === word) {
      return true;
    } else if (dictionaryArr[middle] < word) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return false;
}

/*  Used to check whether all words that were places all exist
using the bool value of exists in the array of objects, if they are all true,
bool is true, else bool is false, this determines whether a play is valid  */
function boolCheck(arr) {
  let bool = true;
  let i = 0;
  while (i < arr.length && bool === true) {
    if (arr[i].exists === true) {
      bool = true;
      i += 1;
    } else {
      bool = false;
    }
  }
  return bool;
}

// Exports the initSocketServer function to be called from index.js
module.exports = {
  initSocketServer: initSocketServer,
};

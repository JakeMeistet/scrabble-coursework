# Scrabble Coursework - UoP Application Programming - UP2002753

This is the coursework set for Application Programming, it will be a web application game of scrabble

## Usage

Run the below command which will install any packages, navigate to the relevant directory and start the server.

```bash
npm start
```

## The Game

The scrabble game has been made using lobbies, this requires either two tabls on the same computer using 'localhost:8080' to navigate to the game.

If you wish to have different usernames per user, you can either use another device and navigate to your '[localip]:8080', though the ip address will have to be changed which I can set up ahead of time. Or you can use two different browsers or an incognito tab due to the username of each user being stored within the browsers local storage.

To note, you cannot use two devices, one on localhost and one to the localip of the computer because the websockets will not work, these are by default set for 'ws://localhost:8080/', as mentioned previously I will allow for setup so if you would like to test this between defices you can do so.

But for ease of use purposes as the game will be hosted locally, and two tabs/one incognito will work absolutely fine, all of this has been tested.

Once in you can create or join a lobby, the games are currently limited to two player, one person (host) can create the game, they will be given a lobby ID, with this they can let the other player know, this is where they then enter the lobby ID in and click join. These two clients will now be in the same lobby.

The host has the ability to start the game, when start is pressed, the board and tiles are generated ready for the host to make the first move, then play till tiles run out, scores will be calculated and a winner will be decided at the end of the game.

## The Design

I decided to keep a very clean, simple and easy to use design for this project.

As you can see I implemented a lobby system for online multiplayer, utilising socket.io which makes it simple to start and join a 2 player game of scrabble, simply by sharing the code with another, clicking join and you are in. 

The host is able to start the game, and then it begins. The pieces are displayed on the right, and the board in the middle. Using the [Interactjs] https://interactjs.io/ API for snapping and drag drop, the tiles are dragabble and droppable onto the board for each user.

The tile 'bag' uses a shared array (pieceArr) on the server between both clients so that when new tiles are generated after a user takes their go, they are all being taken from the same array i.e. bag.

The actual board is white, with the coloured special tiles and the pieces are a more traditional scrabble colour. So that the user knows they are hovering over a dropzone on the board, there will be styling feedback where the boarders of the dropzone will be thicker whilst hovering over. Once dropped, the pieces will snap to the dropzone.

To finish your turn, click the finish button at the bottom right.

## Known Issues

If ticked, fixed.

- [x] Currently the array of allDropped pieces and all words placed is not shared between clients, meaning the game logic is not functional with multiplayer
    though if you set up a game as above and just keep playing on the one user just repeating turns, currently you will see the scores and game logic do work.

- [x] Some issues with words in the shared array if a word is incorrect, issue to be fixed, word detection, is being a bit funny, not sure what this is right now.

- [ ] On window resize, the placed tiles move out of place, minor issue, probably won't be fixed at the moment due to it not effecting the game all that much.



## Features to be implemented

If ticked, done.

- [x] Need to implement starting from the centre

- [ ] Make users have to place next to a placed tile

- [ ] Up to 4 players like actual scrabble

- [ ] Make the board generation far more efficient

- [x] Alternating turns

- [x] Skip button

- [ ] Spectators

- [ ] Hints
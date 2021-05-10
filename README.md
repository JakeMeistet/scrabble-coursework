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

The host is able to start the game, and then it begins. The pieces are displayed on the right, and the board in the middle. Using the [Interactjs](https://interactjs.io/) API for snapping and drag drop, the tiles are dragabble and droppable onto the board for each user.

The tile 'bag' uses a shared array (pieceArr) on the server between both clients so that when new tiles are generated after a user takes their go, they are all being taken from the same array i.e. bag.            

The actual board is white, with the coloured special tiles and the pieces are a more traditional scrabble colour. So that the user knows they are hovering over a dropzone on the board, there will be styling feedback where the boarders of the dropzone will be thicker whilst hovering over. Once dropped, the pieces will snap to the dropzone.

To finish your turn, click the finish button at the bottom right or to skip, press skip.

## Implementation Rationale

In this coursework I chose to take it upon myself to use my previous knowledge on Node.js and Javascript to create an online multiplayer game of Scrabble over local multiplayer or singleplayer. I did this to further my knowledge in the language considering I have previously programmed javascript and used express in the past. 

I used socket.io to allow for online multiplayer using lobbys for different games. Never having used socket.io before, I was learning everything whilst completing my coursework. This proved to be a really effective way to implement simple online multiplayer between 2 players on different devices or different browser windows. It is simple and easy for the user to understand by using an 8 character lobby/game Id which a user could enter to join a game.

The user's details are stored locally on the user's browser within LocalStorage for that page. This simply holds the Username, Uid and their current socketId. I used local storage to store the user's information as it was a simple and easy way to hold user information, without storing in a file server-side, taking up storage on the server and memory in order to search the file and find whether a player had joined before. User IP addresses tend to also be dynamic which means a Uid is the only other feasible way to hold user information on the server.

I chose to use the binary search algorithm to find a word which a user has input because it's time complexity big O(log n). This means that when dealing with a larger set of data, this searching algorithm is very efficient, unlike linear search which has a big O(n), therefore with a linear search, over a large set it will take a much longer amount of time to find an elemtent as it searches each position one at a time, whereas with a binary search, the array is sorted and over a large set, the time doesen't massively increase, cutting down the time to search for the word.

I used the interact.js package to handle my drag drop and snapping rather than using the default javascript drag drop API. I chose to use interact because it allows for a far cleaner drag-drop, as well as allowing me to implement snapping to the dropzone when a piece is dropped. This gives the game an overall cleaner UI in comparison to using the default API.

Originally I planned for the web app to adjust to screensize, though this was the original plan, I never implemented this due to the amount of information to be stored on the page. I could do this in the future but for now I have left it as it is. I have tested the game on mobile, it works well despite this as you would want to zoom in anyway because no matter what the game would look too small when zoomed out anyway, so you can zoom, drag drop all as it should on mobile, with it still working well. On desktop it also works great. On very large monitors you may wish to zoom but not necessary, I use the game on a 24", 21.5" and 13" 1080p monitor and it looks good on both.

For the game, I used a mixture of the original scrabble colours and my own choice of colours. For the game pieces and special tiles, I used the scrabble colours, however for the main blank board pieces I chose to use white. I originally used a similar but darker shade of the tile colour, but when I dropped the tiles it got very confusing as there was a lot of similar coloured squared, hence I went with white to be able to differenciate between the tiles and the board.

I went with the poppins font for the whole web app because it is a very readable and clean font. It looks appealing to the eye and grants a simple to use and understandable user interface for the user. The blue background was a choice of personal preference as I believe it complements the game's colours well and looks clean and simple for the user.

## Known Issues

If ticked, fixed.

- [x] Currently the array of allDropped pieces and all words placed is not shared between clients, meaning the game logic is not functional with multiplayer
    though if you set up a game as above and just keep playing on the one user just repeating turns, currently you will see the scores and game logic do work.

- [x] Some issues with words in the shared array if a word is incorrect, issue to be fixed, word detection, is being a bit funny, not sure what this is right now.

- [x] On my locally hosted game, the word detection etc works, I tried hosting on my server, then all words returned false whether they were valid or not, not sure why.
      This was an issue with linux/windows, using '\n' and '\r\n' for new line in a string.

- [ ] On window resize, the placed tiles move out of place, minor issue, probably won't be fixed at the moment due to it not effecting the game all that much.

- [ ] Word detection works 95% of the time, there is an off chance something goes wrong, I have tested this but can't figure out in time for submission, it's very 
      inconsistent when it happens as well, hence I cannot pinpoint where this is happening

## Features to be implemented

If ticked, done.

- [x] Need to implement starting from the centre

- [x] Alternating turns

- [x] Skip button

- [ ] Adjustable to screen size

- [ ] Make users have to place next to a placed tile

- [ ] Up to 4 players like actual scrabble

- [ ] Make the board generation far more efficient

- [ ] Better modularisation of code

- [ ] Spectators

- [ ] Hints
                                                                                                                                                                                
## Packages used

- [Interact.js](https://www.npmjs.com/package/interactjs)

- [Express](https://www.npmjs.com/package/express)

- [Socket.io](https://www.npmjs.com/package/socket.io)

- [Color](https://www.npmjs.com/package/color)
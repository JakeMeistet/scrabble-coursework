# Scrabble Coursework - UoP Application Programming - UP2002753

This is the coursework set for Application Programming, it will be a web application game of scrabble

## Usage

Run the below command

```bash
npm start
```

The webserver will be hosted on localhost port 80 (Change to 8080 to submit)

## The Game

The scrabble game has been made using lobbies, this requires either two tabls on the same computer using 'localhost:8080' to navigate to the game.

If you wish to have different usernames per user, you can either use another device and navigate to your '[localip]:8080', though the ip address will have to be changed which I can set up ahead of time. Or you can use two different browsers or an incognito tab due to the username of each user being stored within the browsers local storage.

To note, you cannot use two devices, one on localhost and one to the localip of the computer because the websockets will not work, these are by default set for 'ws://localhost:8080/', as mentioned previously I will allow for setup so if you would like to test this between defices you can do so.

But for ease of use purposes as the game will be hosted locally, and two tabs/one incognito will work absolutely fine, all of this has been tested.

Once in you can create or join a lobby, the games are currently limited to two player, one person (host) can create the game, they will be given a lobby ID, with this they can let the other player know, this is where they then enter the lobby ID in and click join. These two clients will now be in the same lobby.

The host has the ability to start the game, when start is pressed, the board and tiles are generated ready for the host to make the first move, then play till tiles run out, scores will be calculated and a winner will be decided at the end of the game.

## Known Issues

- [ ] Currently the array of allDropped pieces and all words placed is not shared between clients, meaning the game logic is not functional with multiplayer
    though if you set up a game as above and just keep playing on the one user just repeating turns, currently you will see the scores and game logic do work.

- [ ] Need to implement starting from the middle and only allowing pieces to be continued from another, not just randomly on the board (I think this won't get done,
    would rather get the necessary game mechanics there as most people will know not to play anywhere on the board (this is not good for longjevity)).

- [ ] Alternating turns also needs to be implemented.
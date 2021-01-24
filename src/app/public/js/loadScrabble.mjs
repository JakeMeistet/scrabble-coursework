document.body.onload = loadScrabble()

function loadScrabble() {
    for(i = 0; i <= 224; i++){
        console.log("test");
        var grid = document.getElementsByClassName('game-board')
        var box = document.createElement('div');
        box.className = 'box';
        let text = document.createTextNode('');
        box.appendChild(text)
        // grid.appendChild(box)

    }
}


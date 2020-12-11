function loadScrabble() {
    let canvas = document.getElementById("gameboard");
    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    let x = 0;    
    let p = 692.9
        for(let i = 0; i <= 14; i++) {  
            for(let y = 0; y<=799.5; y+=53.3) {
            ctx.strokeRect(x,y,53.3,53.3)

            if (x == 373.1 && (y < 53.3 || y > 692.9)|| y == 373.1 && (x < 53.3 || x > 692.9)){
                ctx.fillStyle = "red";
                ctx.fillRect(x+1.5,y+1.5,53.3,53.3)
                ctx.strokeRect(x,y,53.3,53.3)
            } else if (((x == 53.3*3 || x == 586.3) && (y < 53.3 || y > 692.9))||((y == 53.3*3 || y == 586.3) && (x < 53.3 || x > 692.9))||((x == 319.8 || x == 319.8+53.3+53.3) && (y == 53.3 * 2 || y == 53.3*12))||((y == 319.8 || y == 319.8+53.3+53.3) && (x == 53.3 * 2 || x == 53.3*12))||((x == 373.1 && (y == 53.3*3 || y == 53.3*11))|| (y == 373.1 && (x == 53.3*3 || x == 53.3*11)))){
                ctx.fillStyle = "lightblue"
                ctx.fillRect(x+1.5,y+1.5,53.3,53.3)
                ctx.strokeRect(x,y,53.3,53.3)
            } else if (((x == 53.3*5 || x == 53.3+53.3+53.3+53.3+53.3+53.3+53.3+53.3+53.3) && (y == 53.3 || y == 53.3*12+53.3))||((y == 53.3*5 || y == 53.3+53.3+53.3+53.3+53.3+53.3+53.3+53.3+53.3) && (x == 53.3 || x == 53.3*12+53.3))){
                ctx.fillStyle = "blue"
                ctx.fillRect(x+1.5,y+1.5,53.3,53.3)
                ctx.strokeRect(x,y,53.3,53.3)
            }
            

            }

            if (x >= 0 && x <= 746.2) {
                ctx.fillStyle = "white"
                ctx.fillRect(x+1.5,x+1.5,51,51)
                ctx.fillRect(x+1.5,p+1.5+53.3,51,51)
                //  Basic block colourings for different places on scrabble board
                if (x == 0 || x == 746.9) {
                    ctx.fillStyle = "red";
                } else if (x >= 53.3 && x <= 213.2 || x >= 533 && x <= 692.9 || x == 373.1) {
                    ctx.fillStyle = "magenta";
                } else if (x == 266.5 || x == 266.5+53.3+53.3+53.3+53.3){
                    ctx.fillStyle = "blue";
                }else if (x == 319.8|| 426.4 && p > 0) {
                    ctx.fillStyle = "lightblue";
                } else {
                    ctx.fillStyle = "red";
                }
                ctx.fillRect(x+1.5,x+1.5,51,51)
                ctx.fillRect(x+1.5,p+1.5+53.3,51,51)
                x += 53.3
                p -= 53.3
            } else {
                x += 53.3
                p -= 53.3
            }      
        };
}

function loadCheckersChess() {
    let canvas = document.getElementById("gameboard");
    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    
    let x = 0;    
    let p = 0
        for(let i = 0; i <= 7; i++) {  
            for(let y = 0; y<=800; y+=100) {    
                ctx.strokeRect(x,y,100,100)
                if (i == 0 && y == 100){
                    ctx.fillStyle = "black"
                }else {
                    ctx.fillStyle = "white"
                }
                ctx.fillRect(x,y,100,100)
            }
            if (x >= 0 && x <= 800) {
                x += 100
                p += 1
            } 
                 
        };
}

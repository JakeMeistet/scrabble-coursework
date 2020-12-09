const loadGame = () => {
        let canvas = document.getElementById("gameboard");
    let ctx = canvas.getContext("2d");

    ctx.strokeStyle = "black";
    let x = 0    
        for(let i = 0; i <= 15; i++) {  
            for(let y = 0; y<=799.5; y+=53.3) 
            ctx.strokeRect(x,y,53.3,53.3)
            x += 53.3
        };
}

// style the canvas 
canvas.width = window.innerWidth - 20;
canvas.height = window.innerHeight - 60;

// global 
var canvas = document.getElementById("can");
var ctx = canvas.getContext('2d');

// use innerHtml to change the text 
var scoreLabel = document.getElementById("score");
var levelLabel = document.getElementById("level");

// game info
var currentlevel = 1;
var currentScore = 0;

var foodScore = 0; // for testing

var currentPressedKey = 'none';
var FPS = 10;



// game objects 
var Snack = new snack();
var objs = [];
objs.push(Snack);

document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        foodScore = 1;
        console.log("space is pressed")
    }
}

// handle events
document.onkeydown = function(e) { 
    switch (e.keyCode) { 
        case 37: 
            currentPressedKey = 'Left';
             
            break; 
        case 38: 
            currentPressedKey = 'Up'; 
            break; 
        case 39: 
            currentPressedKey = 'Right'; 
            break; 
        case 40: 
            currentPressedKey = 'Down'; 
            break; 
    }
    console.log(currentPressedKey, " key is pressed ");

}

function clearScreen()
{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function update(Snack, currentPressedKey)
{
    Snack.update(currentPressedKey, foodScore);
    foodScore = 0;
    return ;
}

function render(objs)
{
    for(var i=0; i<objs.length; i++){
        objs[i].render();    
    }
    return ;
}

function GameLoop()
{
    // collision detection 
    if(Snack.snack_snack_collisionDetection() == true 
    || Snack.snack_wall_collisionDetection(canvas.width, canvas.height) == true)
    {
        clearScreen();

        // gameover screen 
        ctx.font = "100px Arial";
        ctx.fillStyle = "red";
        ctx.textAlign = 'center';
        ctx.fillText("Game Over Dude", canvas.width/2, canvas.height/2);
        return ;
    }

    //console.log("in game loop dude");
    // handle events 
    
    // update 
    update(Snack, currentPressedKey);
    
    // render 
    clearScreen();
    render(objs);
    
    return ;
}

// infinite game loop
setInterval(() => {
    GameLoop(objs);
}, 1000  / FPS);


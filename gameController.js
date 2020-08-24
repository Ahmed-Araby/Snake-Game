class gameController
{
    constructor()
    {
        // game state 
        this.FPS = INITIALFPS;
        this.level = 1;
        this.score = 0;
        
        /*
        false - >> detect collision with the borders 
        true - >> wrap borders 
        */
        
        this.wrapBorders = false;

        ///////////////////////////////////
        
        /*
        possible game states:

        running 
        gameOver
        */
        this.gameState = 'running';
        

        // events 
        this.currentPressedKey = 'none';

        // game objects 
        this.Snack = new snack(LASTPRESSEDKEY, SNACKCELLWIDTH,
            SNACKCELLHeight, SNACKHEADCOLOR,
            SNACKBODYCOLOR);
        
        // food 
        var foodPosition = this.getfoodPosition();
        var foodCol = foodPosition[0];
        var foodRow = foodPosition[1];
        this.food = new food(foodCol, foodRow, FOODCELLWIDTH, FOODCELLHeight
                            , APPLEIMAGEPATH, 'apple', APPLESCOREGAIN);
        
        return; 
    }

   

    update()
    {
        // snack 
        this.Snack.update(this.currentPressedKey);

        // food , it will do nothing
        // may be in feature, reduce the size and the score gain
        this.food.update();


        return ;
    }

    render()
    {
        clearScreen();
        // snack 
        this.Snack.render();

        // food
        if(this.food.getEaten() == true)
        {
            var foodPosition = this.getfoodPosition();
            var foodCol = foodPosition[0];
            var foodRow = foodPosition[1];
            this.food.setNewFood(foodCol, foodRow, APPLEIMAGEPATH, 'apple', APPLESCOREGAIN);
        }
        this.food.render();
        
        // html
        this.htmlRender();
    }

    collisionDetection()
    {
        /*
        [TO DO ]
        Split each collision detection type into one function
        */



        /*
        snack with it's body,
         eat it self 
        */ 
        var SnackCells  = this.Snack.getSnackCells();
        var SnackHead = this.Snack.getHead();
        var SnackHeadRectangle = SnackHead.getRectangle();
        
        for(var i=3; i<SnackCells.length; i++)
        {
            var SnackCellRectangle =  SnackCells[i].getRectangle();

            if(SnackHeadRectangle.rect_rect_collisionDetection(SnackCellRectangle))
            {
                this.Snack.collisionResolverBody(i);
                break;
            }
        }

        if(!this.wrapBorders){
            /*
            snack with the wall if enabled
            take this decision form the user throw html             
            */ 

            /*
            we need to get the direction of movement 
            to get the next possible position
            */
            var dCol=0;
            var dRow=0;
            var snackMovementDirecton = this.Snack.getMovementDirection()
            if(snackMovementDirecton == 'Left')
                dCol = -1;
            else if(snackMovementDirecton == 'Down')
                dRow = 1;
            else if(snackMovementDirecton == 'Right')
                dCol = 1;
            else if(snackMovementDirecton == 'Up')
                dRow = -1;

            var SnackHead = this.Snack.getHead();

            /*
            next step in your current direction
            */
            if(SnackHead.col + dCol * SNACKCELLWIDTH < 0 ||
                 SnackHead.col + dCol * SNACKCELLWIDTH >= canvas.width ||
                 SnackHead.row  + dRow * SNACKCELLHeight < 0 ||
                 SnackHead.row  + dRow * SNACKCELLHeight >= canvas.height){
                 this.gameState = 'gameOver';
            }
            
        }
        
        // snack with food
        var SnackRectangle = SnackHead.getRectangle();
        var foodRectangle = this.food.getRectangle();

        if(SnackRectangle.rect_rect_collisionDetection(foodRectangle))
        {
            //console.log("snack wiht food collision detected")
            this.Snack.collisionResolverFood();
            this.food.collisionResolver();  // no need for for now 
            this.score += this.food.getScoreGain();
        }

        return ;
    }

    gameLoop()
    {
        /*
        thjs could be better implemented using game states and 
        stack of states
        */

        //console.log(this.gameState, "game State")
        
        if(this.gameState =='stop'){
            return ;
        }

        else if(this.gameState == 'gameOver'){
            this.gameOver();
            return ;
        }

        else if(this.score >= WINNINGSCORE){ // winning = level up 
            this.levelUp();
            return ;
        }

        // listen to events here 

        this.update();

        this.render();
        
        this.collisionDetection();

        return ;
    }
    
    levelUp()
    {
        this.reset();

        this.level +=1;
        this.score = 0;
        this.FPS +=FPSINCREMENT;

        // load the image 
        var image = loadImage(LEVELUPIMAGEPATH);
        putImageIntoCanvas(image);

        this.gameState = 'stop';
    }

    gameOver()
    {
        
        this.reset();
        
        this.level = 1;
        this.score = 0;

        // load the image
        var Image = loadImage(GAMEOVERIMAGEPATH); 
        putImageIntoCanvas(Image);

        this.gameState = 'stop';
    }

    reset()
    {
        clearScreen();
        this.Snack = new snack(LASTPRESSEDKEY, SNACKCELLWIDTH,
            SNACKCELLHeight, SNACKHEADCOLOR,
            SNACKBODYCOLOR);
        this.food.collisionResolver();         

    }

    htmlRender()
    {
        scoreLabel.innerHTML = this.score;
        levelLabel.innerHTML = this.level;
        snackLength.innerHTML = this.Snack.getSnackLength();

    }

    setGameState(gameState)
    {
        this.gameState = gameState;
    }

    setCurrentKeyPressed(currentPressedKey)
    {
        /*
        if the user didn't press any key 
        keep the last one as current decision
        */
        if(currentPressedKey!="")
            this.currentPressedKey = currentPressedKey;
    }

    flipWrapBorders()
    {
        this.wrapBorders = ! this.wrapBorders;
        return ;
    }

    getFPS()
    {
        return this.FPS;
    }

    getfoodPosition()
    {
        /*
        alternative procedure is to keep track 
        the empty cells and use one of them when needed 
        but this will require alot of memory 

        this function have to be in the game controller as 
        it needs to interact with the snack object 
        */

        var SnackCells = this.Snack.getSnackCells();

        var tmpCol;
        var tmpRow;
        var search = true;

        while(search == true)
        {
            tmpCol = parseInt(Math.random() * canvas.width);
            tmpRow = parseInt(Math.random() * canvas.height);
            search = false;

            if(tmpCol + FOODCELLWIDTH >= canvas.width || tmpRow + FOODCELLHeight >=canvas.height)
            {
                search = true;
                continue;
            }

            for(var i=0; i<SnackCells.length; i++)
            {
                if(SnackCells[i].col == tmpCol && SnackCells[i].row == tmpRow)
                {
                    search = true;
                    break;
                }
            }
        }
        return [tmpCol, tmpRow];
    }
}

var SnackGame = new gameController();

// handle events
document.onkeydown = function(e) {
    var currentPressedKey = "";
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
    SnackGame.setCurrentKeyPressed(currentPressedKey);
    if(currentPressedKey !="")
        SnackGame.setGameState('running');

    //console.log(currentPressedKey, " key is pressed ");
}

wrapBorders.addEventListener('change', function(){
    SnackGame.wrapBorders = !SnackGame.wrapBorders;
});

// infinite game loop
setInterval(() => {
    SnackGame.gameLoop();
}, 1000  / SnackGame.getFPS());

class gameController
{
    constructor()
    {
        // game state 
        this.FPS = 10;
        this.level = 1;
        this.score = 0;

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

        // html document
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
    }

    collisionDetection()
    {
        // snack with it's body 
        var SnackCells  = this.Snack.getSnackCells();
        for(var i=1; i<SnackCells.length; i++)
        {
            if(SnackCells[0].col == SnackCells[i].col 
                && SnackCells[0].row == SnackCells[i].row)
            {
                this.Snack.collisionResolverBody(i);
                break;
            }
        }

        // snack with the wall 
        var SnackHead = this.Snack.getHead();
        if(SnackHead.col < 0 || SnackHead.col >= canvas.width ||
            SnackHead.row < 0 || SnackHead.row >= canvas.height){
            this.gameState = 'gameOver';
        }
        
        // snack with food
        var SnackRectangle = SnackHead.getRectangle();
        var foodRectangle = this.food.getRectangle();

        if(SnackRectangle.rect_rect_collisionDetection(foodRectangle))
        {
            console.log("snack wiht food collision detected")
            this.Snack.collisionResolverFood();
            this.food.collisionResolver();  // no need for for now 
            this.score += this.food.getScoreGain();
        }

        return ;
    }

    gameLoop()
    {

        if(this.gameState == 'gameOver'){
            this.gameOver();
            return ;
        }
        if(this.score >= 100){
            this.levelLabel();
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
    }

    gameOver()
    {
    }

    updateHtml()
    {
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
    console.log(currentPressedKey, " key is pressed ");
}

// infinite game loop
setInterval(() => {
    SnackGame.gameLoop();
}, 1000  / SnackGame.getFPS());

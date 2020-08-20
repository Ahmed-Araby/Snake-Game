// OOP 
var canvas = document.getElementById("can");

class snack
{
    /*
    U have to define what kind of information this class need 
    from the out side world

    - last clicked button
    - food position 
    */

    constructor(color = 'red', headColor = "yellow",
                cellWidth = 25, cellHeight = 25,
                currentLevel = 1)
    {
        // snack structure
        this.snackCells = [];
        this.speed = currentLevel;
        this.color = color;
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;
        this.lastPressedKey = 'Left';
        this.snackLength = 1;
        this.headColor = headColor
        this.score = 0;

        // get strating point
        var tmpCol = parseInt(canvas.width /2 );  //parseInt(Math.random() * canvas.width);
        var tmpRow =  parseInt(canvas.height /2 ); //parseInt(Math.random() * canvas.height);

        // used for addign new cell for the snack on eating
        this.tailCol = tmpCol-1;
        this.tailRow = tmpRow;
        
        this.snackCells.push(new point(tmpCol, tmpRow));
        return ;
    }

    handleEvents(currentPressedKey)
    {
        var dCol = 0;
        var dRow = 0;

        /*
        forbidden movement
        if this happen stay on UR way
        */

        if(currentPressedKey == "Left" && this.lastPressedKey=='Right'
        && this.snackLength > 1){
            currentPressedKey = 'Right';
        }
        else if(currentPressedKey =='Right' && this.lastPressedKey == 'Left'
        && this.snackLength > 1){
            currentPressedKey = 'Left';
        }
        
        else if(currentPressedKey == "Up" && this.lastPressedKey=='Down'
        && this.snackLength > 1){
            currentPressedKey = 'Down'
        }
        else if(currentPressedKey =='Down' && this.lastPressedKey == 'Up'
        && this.snackLength > 1){
            currentPressedKey = 'Up'
        }

        
        // available movement
        if(currentPressedKey == "Left")
            dCol = -1;
        else if(currentPressedKey == "Right"){
            dCol = 1;
        }
        else if(currentPressedKey == 'Up'){
            dRow = -1;
        }
        else if(currentPressedKey == 'Down')
            dRow = 1;

        this.lastPressedKey = currentPressedKey;
        
        return [dCol, dRow];
    }

    getScore()
    {
        return this.score;
    }

    update(currentPressedKey, score)
    {
        
        console.log(score, this.snackLength)
        // update food score 
        this.score += score;

        // update tail (next empty position to place a cell when we eat)
        
        this.tailCol = this.snackCells[this.snackLength-1].col;
        this.tailRow = this.snackCells[this.snackLength-1].row;

        // move body 
        for(var i=this.snackLength-1; i>0; i--)
        {
            // bring vector of movement 
            var dCol = (this.snackCells[i-1].col - this.snackCells[i].col) / this.cellWidth;
            var dRow = (this.snackCells[i-1].row - this.snackCells[i].row) / this.cellWidth;
            
            this.snackCells[i].col += dCol * this.cellWidth;
            this.snackCells[i].row += dRow * this.cellHeight;    
        }

        // move head, depending on the last pressed key 
        var dArr = this.handleEvents(currentPressedKey);
        
        // vector of movements 
        var dCol  = dArr[0];
        var dRow = dArr[1];
        
        this.snackCells[0].col +=dCol * this.cellWidth;
        this.snackCells[0].row += dRow * this.cellHeight;
        
        // add new cell if foodScore > 0
        if(score > 0){
            //console.log("enlarge the snack ")
            this.enlargeSnake();    
            this.snackLength +=1;
        }  
    }

    enlargeSnake()
    {
        this.snackCells.push(new point(this.tailCol, this.tailRow));
    }

    render()
    {
        for(var i=0; i<this.snackLength; i++)
        {   
            drawRectangle(this.snackCells[i].col, this.snackCells[i].row,
                this.cellWidth, this.cellHeight, i==0?this.headColor:this.color);                                      
        }
        return ;
    }

    snack_snack_collisionDetection()
    {
        /*
        collision will always be initiated 
        by the snack head  
        */

        for(var i=1; i<this.snackLength; i++){
            if(this.snackCells[i].col == this.snackCells[0].col && 
                this.snackCells[i].row == this.snackCells[0].row){
                    console.log("collision here", 0, i)
                    return true;
                }
        }
        return false;
    }

    snack_wall_collisionDetection(canvasWidth, canvasHeight)
    {
        /*
        collision will always be initiated 
        by the snack head  
        */

        if(this.snackCells[0].col < 0 
            || this.snackCells[0].col >=canvasWidth)
            return true;

        else if(this.snackCells[0].row < 0 
            || this.snackCells[0].row >=canvasHeight)
            return true;
            
        return false;
    }
}

/*
- working form linux
*/
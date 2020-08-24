class snackCell extends sprite
{
    constructor(col, row, width, height, color)
    {
        super(col, row, width, height);
        this.color = color;
        return ;
    }

    getRectangle()
    {
        /*
        return rectangle for that represent
        this snack cell for collision detection
        */
       return new rectangle(this.col, this.row,
                            this.width, this.height); 
    }
}

class snack
{
    /*
    this class have associative relation 
    with the class snackCell
    */

    constructor(lastPressedKey, cellWidth, cellHeight,
         headColor, bodyColor)
    {
        this.cells = [];
        this.lastPressedKey = lastPressedKey;
        
        this.cellWidth = cellWidth;
        this.cellHeight = cellHeight;

        this.tailCol;  // undefined
        this.tailRow;

        this.headColor = headColor;
        this.bodyColor = bodyColor;

        this.initSnackHead();
        return ;
    }

    initSnackHead()
    {
        var tmpCol = parseInt(canvas.width /2 ); 
        var tmpRow =  parseInt(canvas.height /2 );
        this.cells.push(new snackCell(tmpCol, tmpRow, 
                        this.cellWidth, this.cellHeight, this.headColor));
        this.tailCol = tmpCol;
        this.tailRow = tmpRow;
        return ;
    }

    getSnackCells()
    {
        return this.cells;
    }

    getSnackLength()
    {
        return this.cells.length;
    }

    handleEvents(currentPressedKey)
    {
        var dCol = 0;
        var dRow = 0;

        /*
        forbidden movement
        if this happen stay on UR way
        */
        var snackLength = this.getSnackLength();

        if(currentPressedKey == "Left" && this.lastPressedKey=='Right'
        && snackLength > 1){
            currentPressedKey = 'Right';
        }
        else if(currentPressedKey =='Right' && this.lastPressedKey == 'Left'
        && snackLength > 1){
            currentPressedKey = 'Left';
        }
        
        else if(currentPressedKey == "Up" && this.lastPressedKey=='Down'
        && snackLength > 1){
            currentPressedKey = 'Down'
        }
        else if(currentPressedKey =='Down' && this.lastPressedKey == 'Up'
        && snackLength > 1){
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

    update(currentPressedKey)
    {
        var snackLength = this.getSnackLength();

        // update tail (next empty position to place a cell when we eat)
        this.tailCol = this.cells[snackLength-1].col;
        this.tailRow = this.cells[snackLength-1].row;

        // move body 
        for(var i=snackLength-1; i>0; i--)
        {
            /*
            // fancy stuff with no need
            // bring vector of movement
            var dCol = (this.cells[i-1].col - this.cells[i].col);
            var dRow = (this.cells[i-1].row - this.cells[i].row);
            // move this cell
            this.cells[i].col += dCol
            this.cells[i].row += dRow   
            */
           
            this.cells[i].col = this.cells[i-1].col;
            this.cells[i].row = this.cells[i-1].row;
        }

        // move head, depending on the last pressed key 
        var dArr = this.handleEvents(currentPressedKey);
        
        // vector of movements normalized
        var dCol  = dArr[0];
        var dRow = dArr[1];
        
        this.cells[0].col +=dCol * this.cellWidth;
        this.cells[0].row += dRow * this.cellHeight;
        
        /*
        wrapping : 
        - we only need to wrap the head, 
          and the rest of the body will be handled automatically 
        - snack will hit only one border at a time.
        */

        // right corner
        if(this.cells[0].col + SNACKCELLWIDTH <= 0){            
            this.cells[0].col = canvas.width;
            //this.lastPressedKey = 'Left';
        }
        else if(this.cells[0].col >= canvas.width){
            this.cells[0].col = - SNACKCELLWIDTH;
            //this.lastPressedKey = 'Right';
        }
        // lower corner 
        else if(this.cells[0].row + SNACKCELLHeight <=0){
            this.cells[0].row = canvas.height;
            //this.lastPressedKey = 'Up';
        }    
        else if(this.cells[0].row >= canvas.height){
            this.cells[0].row = - SNACKCELLHeight;
            //this.lastPressedKey = 'Down';
        }

        // enlarge the snack here if needed
    }

    getHead()
    {
        return this.cells[0];
    }
    getMovementDirection()
    {
        return this.lastPressedKey;
    }
    enlargeSnake()
    {
        this.cells.push(new snackCell(this.tailCol, this.tailRow, this.cellWidth, this.cellHeight));
    }

    collisionResolverFood()
    {
        this.enlargeSnake();
        return ;
    }
    collisionResolverBody(bodyCellIndex)
    {
        /*
        reduce the size of the snack
        garbage collector delete the ramaining cells
        */
        this.cells.length = bodyCellIndex;
        return ;
    }

    render()
    {

        //console.log(this.cells)
        var snackLength = this.getSnackLength();

        for(var i=0; i<snackLength; i++)
        {   
            drawRectangle(this.cells[i].col, this.cells[i].row,
                this.cellWidth, this.cellHeight, i==0?this.headColor:this.bodyColor);                                      
        }
        return ;
    }
}
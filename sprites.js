class rectangle
{
    constructor(upperLeftCol, upperLeftRow, width, height)
    {
        this.upperLeftCol = upperLeftCol;
        this.upperLeftRow = upperLeftRow;
        this.width = width;
        this.height = height;
        
        this.lowerRightCol = upperLeftCol + width;
        this.lowerRightRow = upperLeftRow + height;

        return ;
    }
    

    rect_rect_collisionDetection(rect)
    {
        /*
        colllision detection logic here
        true -> collision detected 
        false -> no collision
        */
        var tmpULCol = Math.max(this.upperLeftCol, rect.upperLeftCol);
        var tmpULRow = Math.max(this.upperLeftRow, rect.upperLeftRow);

        var tmpLRCol = Math.min(this.lowerRightCol, rect.lowerRightCol);
        var tmpLRRow = Math.min(this.lowerRightRow, rect.lowerRightRow);

        /*
        sharing: 
        2D area  is the only thing to be 
        consideread as detection
        */
        if(tmpULCol < tmpLRCol && tmpULRow < tmpLRRow){
            return true;
        }

        return false;
    }
}

class sprite
{
    constructor(col, row, width, height)
    {
        this.col = col;
        this.row = row;
        this.width = width;
        this.height = height;
        return ;
    }
}


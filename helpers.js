function drawRectangle(upperLeftCol, upperLeftRow, width, height, color)
{
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCol, upperLeftRow, width, height);
    return ;
}





class point
{
    constructor(col, row)
    {
        this.col = col;
        this.row = row;
        return ;
    }
}
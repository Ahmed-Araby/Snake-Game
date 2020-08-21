function drawRectangle(upperLeftCol, upperLeftRow,
                         width, height, color)
{
    //console.log(upperLeftCol, upperLeftCol, width, height, color, "in drawing")
    ctx.fillStyle = color
    ctx.fillRect(upperLeftCol, upperLeftRow, width, height);
    return ;
}

function clearScreen()
{
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

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


function loadImage(imagePath)
{
    var image = new Image(canvas.width, canvas.height);
    image.src = imagePath;
    return image;
}

function putImageIntoCanvas(image)
{
    if(image.complete == false){
        setTimeout(() => {
            putImageIntoCanvas(image);
        }, 50);

        return ;
    }

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return ;

}
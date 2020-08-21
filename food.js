class food extends sprite
{
    constructor(col, row, width, height, 
             imagePath, foodType , scoreGain)
    {
        super(col, row, width, height);

        this.imagePath = imagePath;
        this.image;
        this.scoreGain = scoreGain;
        this.foodType = foodType;

        this.eaten = false; // collision detection indicator

        this.loadImage();
        return ;
    }

    loadImage()
    {
        /*
        take into account that there could be lag in loading the image 
        so if we tried to use the image before it load there would be an error
        */
       this.image = new Image(this.width, this.height);
       this.image.src = this.imagePath;
       return ;
    }

    putImageIntoCanvas(image)
    {
        /*
        use it before rendering 
        to make sure that the image is loaded and ready to be used
        */
       if(!image.complete)
       {
           setTimeout(() => {
               this.putImageIntoCanvas(image);
           }, 50);
           return ;
       }

       // put the image into the canvas 
       ctx.drawImage(image, this.col, this.row, this.width, this.height);
       return;   
    }

    update()
    {
        /*
        no need for this
        */
    }

    render()
    {
        // not eaten image 
        this.putImageIntoCanvas(this.image);
    }

    setNewFood(col, row,imagePath,
             foodType , scoreGain)
    {
        /*
        the new position is determined by the gameController 
        and it have to make sure that this position is clear
        */
        this.eaten = false;
        
        this.col = col;
        this.row = row;
        this.imagePath = imagePath;
        this.foodType = foodType;
        this.scoreGain = scoreGain;

        this.loadImage();
        return ;
    }

    collisionResolver()
    {
        this.eaten = true;
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

    getScoreGain()
    {
        return this.scoreGain;
    }

    getEaten()
    {
        return this.eaten;
    }
}
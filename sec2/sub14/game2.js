class Game {
    constructor(){
        
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")        
        this.spriteInstructions = {}
        this.spriteImageFile = ""
        this.spriteFrames = []
        this.spriteImage = new Image()
        
        this.loadFromJSON("flowers.json")
    }
    
    loadFromJSON(filename){
        
        var xmlhttp = new XMLHttpRequest();
        const game = this;
        
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            game.spriteInstructions = JSON.parse(this.responseText);
            game.loadSprites();
          }
        };
        
        xmlhttp.open("GET", filename, true);
        xmlhttp.send();
    }
    
    loadSprites(){
        this.spriteImage.src = this.spriteInstructions.meta.image
        this.spriteFrames = this.spriteInstructions.frames
        
        const game = this
        this.spriteImage.onload = function(){game.drawSprite();}
    }
    
    drawSprite(){
        var frame = this.spriteFrames[0].frame
        
        this.context.drawImage(
            this.spriteImage,
            frame.x, frame.y, frame.w, frame.h,
            100, 100, frame.w, frame.h)
    }
}
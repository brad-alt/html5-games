class Game {
    
    constructor(){
        this.canvas = document.getElementById("game")
        this.context = this.canvas.getContext("2d")        
        this.spriteInstructions = {}
        this.spriteImageFile = ""
        this.spriteFrames = []
        this.spriteImage = new Image()
        
        const game = this;
        window.addEventListener('gameLoadedJSON', function (e) { game.loadSprites(e.detail);}, false)
        window.addEventListener('gameLoadedSprites', function (e) { game.startAnimation();}, false)
        
        
        this.loadFromJSON("flowers.json")
    }
    
    
    loadFromJSON(filename){    
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            window.dispatchEvent(new CustomEvent('gameLoadedJSON', {detail: JSON.parse(this.responseText)}))
          }
        };
        
        xmlhttp.open("GET", filename, true);
        xmlhttp.send();
    }
    
    
    loadSprites(spriteInstructions){
        this.spriteImage.src = spriteInstructions.meta.image
        this.spriteFrames = spriteInstructions.frames
        this.spriteImage.onload = function(){window.dispatchEvent(new Event('gameLoadedSprites'));}
    }
    
    startAnimation() {
        
        this.drawSprite()
        this.animationStartTime = Date.now()
        this.lastUpdate = this.animationStartTime
        this.totalElapsedTime = 0
        this.refresh()
    }
    
    refresh() {
        const currentTime = Date.now()
        const timeSinceLastDraw = (currentTime - this.lastUpdate)
        this.totalElapsedTime = currentTime - this.animationStartTime
        
        if (timeSinceLastDraw > 10) {
            this.drawSprite(Math.max(300, totalElapsedTime))
            this.lastUpdate = currentTime
        }
        
        
    }
    
    
    drawSprite(){
        this.context.clearRect()
        
        var frame = this.spriteFrames[0].frame
        
        this.context.drawImage(
            this.spriteImage,
            frame.x, frame.y, frame.w, frame.h,
            100, 100, frame.w, frame.h)
    }
}
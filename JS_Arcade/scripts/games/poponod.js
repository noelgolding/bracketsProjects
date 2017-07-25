class Poponod extends Game{
        constructor(canvas_id){
        super("Poponod", 720, 405, canvas_id, "maroon");
        this.gameOver = false;
        this.score = 0;
        this.audioOn = false;
    }

    init(){
        this.assetMgr.addImage("assets/common/dried_mud.png");
    }

    assetsReady(){
        this.backgroundPattern = this.ctx.createPattern(this.assetMgr.getImage("assets/common/dried_mud.png"), "repeat");
    }

    draw(){
        super.draw();
        this.ctx.rect(0,0,1024*4,768*4);
        this.ctx.fillStyle = this.backgroundPattern;
        this.ctx.fill();

        this.ctx.fillStyle = "white";
        this.ctx.fillRect(100, 100, 100, 100);
    }
}

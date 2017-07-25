class AlienAttack extends Game{
    constructor(canvas_id, assets_dir){
        super("Alien Attack!", 448, 512, canvas_id, "black", assets_dir);
        this.gameOver = false;
        this.score = 0;
        this.audioOn = false;
        if (isMobile.any()) {
            this.canvas.height = 552;
        }

    }

    init(){
        this.images = {
            ui_control_move_left    : this.assetsDir + "/common/ui_controls/left_yellow_arrow.png",
            ui_control_move_right   : this.assetsDir + "/common/ui_controls/right_yellow_arrow.png",
            ui_control_shoot        : this.assetsDir + "/common/ui_controls/round_yellow_button.png",
            player                  : this.assetsDir + "/alienattack/player/finger_gun_24.png",
            alien1                  : this.assetsDir + "/alienattack/aliens/alien1/aa_alien_01_01.png",
            alien2                  : this.assetsDir + "/alienattack/aliens/alien2/aa_alien_02_01.png",
            alien3                  : this.assetsDir + "/alienattack/aliens/alien3/aa_alien_03_01.png",
        };
        for (var key in this.images) {
            this.assetMgr.addImage(this.images[key]);
        }
    }

    assetsReady(){
        this.player = new Player(this.assetMgr.getImage(this.images.player));
        this.player.x = (this.width/2) - (this.player.width/2);
        this.player.y = this.height - this.player.height*2;

        this.bullets = [];
        this.aliens = [];        
    }

    update(elapsedSinceLastLoop){
        // handle input.
        this.__handleInput(elapsedSinceLastLoop);

        // update the player
        this.__updatePlayer(elapsedSinceLastLoop);

        // TODO update the aliens
        // TODO update the bullets
        // TODO check for collisions
    }

    __handleInput(elapsedSinceLastLoop){
        // TODO if touch is enabled, handle touch input instead?

        // - keyboard input
        if (32 in this.keysdown) { //space bar shoots.
            this.player.shoot();
        }
        if ("A".charCodeAt(0) in this.keysdown) {
            this.player.velocityX = -this.player.speed;
        } else if ("D".charCodeAt(0) in this.keysdown) {
            this.player.velocityX = this.player.speed;
        } else {
            this.player.velocityX = 0;
        }
    }

    __updatePlayer(elapsedSinceLastLoop){
        this.player.update(elapsedSinceLastLoop);
        // clamp the player to the field.
        if (this.player.x < 0) {
            this.player.x = 0;
        } else if (this.player.x > this.canvas.width - this.player.width) {
            this.player.x = this.canvas.width - this.player.width;
        }
    }

    draw(){
        // clear the screen
        this.ctx.clearRect(0,0,this.width, this.height);

        // draw the bullets
        for (var bullet of this.bullets) {
            bullet.draw(this.ctx)
        }

        // draw the player
        this.player.draw(this.ctx);

        // if this is a mobile device draw the controls
        if (this.touchEnabled) {
            this.ctx.drawImage(this.assetMgr.getImage(this.images.ui_control_move_left), 10, this.canvas.height - 20 - 20, 30, 30);
            this.ctx.drawImage(this.assetMgr.getImage(this.images.ui_control_move_right), 60, this.canvas.height - 20 - 20, 30, 30);
            this.ctx.drawImage(this.assetMgr.getImage(this.images.ui_control_shoot), this.canvas.width - 40, this.canvas.height - 20 - 20, 30, 30);
        }

        // draw the enemies
        for (var alien of this.aliens) {
            alien.draw(this.ctx);
        }
    }
}

class Player extends RectImageSprite{
    constructor(img, x, y, width, height){
        super(img, x, y, width, height, "red");
        this.velocityX = 0;
        this.speed = 10;
        this.shotFired = false;
        this.shotRechargeMs = 100;
    }

    update(elapsedSinceLastLoop) {
        this.x += this.velocityX;
    }

    shoot(){
        if (this.shotFired === false) {
            this.shotFired = true;
            console.log("shoot");
            setTimeout(() => this.shotFired = false, this.shotRechargeMs);
        }
    }
}
// SimplePhysics
// SimpleCollisionDetection
// SimpleMovement - Vectors
// SimpleGameObjects - With animation?
    // PlayableCharacters
    // NPCs
    // Platforms
    // etc.
// SimpleGameManager - s?
// autoscale?


// TODO asset manager.
class SimpleGame{
    constructor(props){
        this.name = (props && props.name) ? props.name : "SimpleGame";
        this.width = (props && props.width) ? props.width : 720;
        this.height = (props && props.height) ? props.height : 405;
        this.bgcolor = (props && props.bgcolor) ? props.bgcolor : "black";
        
        var _container = (props && props.container) ? props.container :  document.body;
        _container.style += ";margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;"
        console.log(_container);
        
        // set the browser window/tab title to the game's name
        document.title = this.name;
        
        // create the canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        _container.appendChild(this.canvas);
        
        // get the painting toolkit
        this.ctx = this.canvas.getContext("2d");
        
        // outline the canvas to make it visible
        this.ctx.strokeStyle = this.bgcolor;
        this.ctx.strokeRect(0, 0, this.width, this.height);
        
        if (props && props.autoScale === true) {
            // TODO handle resize.
        } else {
            // center the canvas
            this.canvas.style = "margin: auto; position: absolute; top: 0; left: 0; bottom: 0; right: 0;";
        }
    }

    init(){}
    update(){}
    draw(ctx){}

    start(){
        this.init();
        this.gameLoop();
    }

    updateInternal(){
        this.update();
    }

    drawInternal(){
        // clear background
        this.ctx.fillStyle = this.bgcolor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.draw(this.ctx);
    }

    gameLoop(){
        this.updateInternal();
        this.drawInternal();
        requestAnimationFrame(() => this.gameLoop());
    }
}

function rectCollision(r1, r2) {
    rect1 = {
        left   :r1[0],
        top    :r1[1],
        right  :r1[0] + r1[2],
        bottom :r1[1] + r1[3]  
    };
    rect2 = {
        left   :r2[0],
        top    :r2[1],
        right  :r2[0] + r2[2],
        bottom :r2[1] + r2[3]
    };
    return (    rect1.left < rect2.right
                && rect1.right > rect2.left
                && rect1.top < rect2.bottom
                && rect1.bottom > rect2.top
           )
}

class SimpleGameObject{
    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
    
    update(){}
    
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    
    getRect(){
        return [this.x, this.y, this.width, this.height];
    }
}

class SimpleGame{
    constructor(title, width, height, bgcolor){
        this.running = false;
        this.title = title || "My Simple Game";
        this.width = width || 640;
        this.height = height || 480;
        this.bgcolor = bgcolor || 'black';
        
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.ctx = this.canvas.getContext('2d');
        document.title = this.title;
        
        this.keyspressed = {};
        window.addEventListener('keydown', (e) => this.keyspressed[e.code] = true);
        window.addEventListener('keyup', (e) => delete this.keyspressed[e.code]);
        this.canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
    }
    
    onMouseDown(e){}
    
    init(){}
    update(){}
    draw(ctx){}
    
    start(){
        document.body.appendChild(this.canvas);
        this.init();
        this.running = true;
        this.gameloop();
    }
    
    updateInternal(){
        if (this.running) {
            this.update();
        }
    }
    
    drawInternal(){
        if (this.running) {
            this.ctx.fillStyle = this.bgcolor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.draw(this.ctx);
        }
        
    }
    
    gameloop(){
        this.drawInternal();
        this.updateInternal();
        requestAnimationFrame(() => this.gameloop());
    }
}
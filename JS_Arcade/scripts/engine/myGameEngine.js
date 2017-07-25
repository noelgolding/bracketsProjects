// ***************************
// * FREE FUNCTIONS 
// ***************************
function collidesWith(rect1, rect2) {
	return ( rect1.x < rect2.x + rect2.width
		&& rect1.x + rect1.width > rect2.x
		&& rect1.y < rect2.y + rect2.height
		&& rect1.y + rect1.height > rect2.y);
};

function transform(x, y, camera) {
    return [x - camera.x, y - camera.y];
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

// ***************************
// * ASSET MANAGER
// ***************************
class AssetManager{
	constructor(){
		this.imgSuccessCount = 0;
		this.imgFailCount = 0;
		this.imgDownloadQueue = [];
		this.imgCache = {};

		this.audioSuccessCount = 0;
		this.audioFailCount = 0;
		this.audioDownloadQueue = [];
		this.audioCache = {};
	}

	getImage(path) {
		return this.imgCache[path];
	}

	addImage(path) {
		this.imgDownloadQueue.push(path);
	}

	downloadAllImages(callback){
		for (var src of this.imgDownloadQueue){
			var img = new Image();
			img.addEventListener("load", () => this.imgSuccessCount++ );
			img.addEventListener("error", () => this.imgFailCount++ );
			img.src = src;
			this.imgCache[src] = img;
		}
		this.waitForDownload(() => this.downloadAllImagesIsDone(), callback);
	}

	waitForDownload(isDone, callback){
		if (isDone()) {
			callback();
		} else {
			setTimeout(() => this.waitForDownload(isDone, callback), 10);
		}
	}

	downloadAllImagesIsDone(){
		return (this.imgDownloadQueue.length == this.imgSuccessCount + this.imgFailCount);
	}

	getAudio(path) {
		return this.audioCache[path];
	}

	enqueueAudioDownload(path) {
		this.audioDownloadQueue.push(path);
	}

	downloadAllAudio(callback){
		for (var src of this.audioDownloadQueue){
			var audio = new Audio();
			audio.addEventListener("load", () => this.audioSuccessCount++ );
			audio.addEventListener("error", () => this.audioFailCount++ );
			audio.src = src;
			this.imgCache[src] = audio;
		}
		this.waitForDownload(() => this.downloadAllAudioIsDone(), callback);
	}

	downloadAllAudioIsDone(){
		return (this.audioDownloadQueue.length == this.audioSuccessCount + this.audioFailCount);
	}

	downloadAll(callback){
		this.downloadAllImages(() => this.downloadAllAudio(callback));
	}
}


// ***************************
// * GAME CAMERA 
// ***************************
GameCamera = function(x, y, width, height, margin_x, margin_y){
    this.set_margin = function(margin_x, margin_y) {
        this.margin_x = margin_x || this.width / 3;
        this.margin_y = margin_y || this.height / 3;
    };
    
    this.set_world_bounds = function(max_world_x, max_world_y) {
        this.max_world_x = max_world_x || this.x + this.width;
        this.max_world_y = max_world_y || this.y + this.height;
    };
    
    this.set_focus_sprite = function(focus_sprite) {
        this.focus_sprite = focus_sprite || RectSprite(x, y, width, height);
        return this.focus_sprite;
    };
    
    this.update = function(){
        coords = this.focus_sprite.get_center_coords();
        center_x = coords[0];
        center_y = coords[1];
        if (center_x < this.x + this.margin){
            this.x = Math.max(0, center_x - this.margin);
        } else if (center_x > this.x + this.width - this.margin) {
            this.x = Math.min(this.max_world_x - this.width, center_x + this.margin_x - this.width );
        }
    };
    
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    this.set_margin(margin_x, margin_y);
    this.set_world_bounds();
    this.set_focus_sprite();
};

// ***************************
// * GAME 
// ***************************
class Game{
    constructor(title, width, height, canvas_id, background_color="blue", assets_dir="assets") {
        this.title = title;
        this.width = width;
        this.height = height;
        this.backgroundColor = background_color;
        this.assetsDir = assets_dir;
        this.canvas = document.getElementById(canvas_id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style.background = this.backgroundColor;
        this.aspect_ratio = width/height;
        this.ctx = this.canvas.getContext("2d");
        this.keysdown = {};
		this.keystate = {};
		this.assetMgr = new AssetManager();
    }

    scaleCanvas() {
        var win_width = window.innerWidth;
        var win_height = window.innerHeight;
        var win_ratio = win_width/win_height;

        var c_width, c_height
        if (win_ratio > this.aspect_ratio) {
            c_width = this.width * win_height/this.height;
            c_height = win_height;
        } else {
            c_width = win_width;
            c_height = this.height * win_width/this.width;
        }

        this.canvas.style.width = c_width+'px';
        this.canvas.style.height = c_height+'px';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = ((win_height - c_height)/2)+'px';
        this.canvas.style.left = ((win_width - c_width)/2)+'px';
    }

	keyDown(e){
		// console.log("key down: " + e.keyCode);  
		this.keysdown[e.keyCode] = true;
	}

	keyUp(e){
		// console.log("key up: " + e.keyCode);   
		delete this.keysdown[e.keyCode];
	}

	touchStart(e){
		// console.log("touch start:", e);
	}

	touchMove(e){
		// console.log("touch move:", e);
	}

	touchEnd(e){
		// console.log("touch end:", e);
	}

    setup(){
    	document.title = this.title;

        this.startingTime;
        this.lastTime;
        this.totalElapsedTime= 0;
        this.elapsedSinceLastLoop = 0;

        this.scaleCanvas();
        window.addEventListener('resize', () => this.scaleCanvas(), false);
		window.addEventListener("keydown", (e) => this.keyDown(e), false);
		window.addEventListener("keyup", (e) => this.keyUp(e), false);

		if (isMobile.any()) {
			this.canvas.addEventListener("touchstart", (e) => this.touchStart(e), false);
			this.canvas.addEventListener("touchmove", (e) => this.touchMove(e), false);
			this.canvas.addEventListener("touchend", (e) => this.touchEnd(e), false);
			this.touchEnabled = true;
		}

		this.init();
        // TODO pop the current scene

        // TODO show loading screen
        // == expect Game to override, will provide default impl

        // Load the assets.
		this.assetMgr.downloadAll(() => this.run());
    }

    assetsReady(){}

	draw(){
	    // clear the screen
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.fillRect(0, 0, this.width, this.height);

		// TODO draw the current scene
	}

	update(elapsedSinceLastLoop){
	    // TODO update the current scene
	}
	
	gameloop(currentTime){
		if(!this.running)
			return;

        if(!this.startingTime){this.startingTime=currentTime;}
        if(!this.lastTime){this.lastTime=currentTime;}
        this.totalElapsedTime=(currentTime-this.startingTime);
        
        var elapsedSinceLastLoop=(currentTime-this.lastTime);
        this.lastTime=currentTime;
        
		this.draw(this.totalElapsedTime);
		this.update(elapsedSinceLastLoop);
		window.requestAnimationFrame(() => this.gameloop());
	};

	run(){
		this.assetsReady();
		this.running = true;
        this.gameloop();
	}

    start(){
        this.setup();
    }

    stop(){
    	this.running = false;
    }
 }

// ***************************
// * GameObject
// ***************************
class GameObject{
	constructor(x, y){
		this.x = x || 0;
		this.y = y || 0;
	}
}

class RectSprite extends GameObject{
	constructor(x, y, width, height, color){
		super(x, y);
		this.width = width || 1;
		this.height = height || 1;
		this.color = color || "#ffffff";
	}

	update(elapsedSinceLastLoop){}

	draw(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	getRect(){
		return ({
			"x"			: this.x,
			"y"			: this.y,
			"width" 	: this.width,
			"height"	: this.height	
		});
	}
}

class RectImageSprite extends RectSprite{
	constructor(image, x, y, width, height, color){
		width = width || image.width;
		height = height || image.height;
		super(x, y, width, height, color);
		this.image = image; // TODO if no image throw an error
	}

	update(elapsedSinceLastLoop){}

	draw(ctx){
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		
		// TODO ONLY if debug mode include this rect outline.
		ctx.strokeStyle = this.color;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		// TODO ONLY if debug mode include this rect cross cut
		ctx.beginPath();
		ctx.moveTo(this.x, this.y);
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.stroke();
	}

	getRect(){
		return ({
			"x"			: this.x,
			"y"			: this.y,
			"width" 	: this.width,
			"height"	: this.height	
		});
	}

}

// ***************************
// * Animation
// ***************************
class Animation {
    constructor(frames, frame_rate, loop=true){
        this.frames = frames;
        this.current_frame = 0;
        this.loop = loop
        this.next_frame_at = frame_rate;
    }

    get_key_frame(elapsedTime) {
        if (elapsedTime >= this.next_frame_at) {
            this.current_frame++;
            this.next_frame_at = elapsedTime + frame_rate;
        }

        if (this.current_frame >= this.frames.length) {
            if (this.loop) {
                this.current_frame = 0;
            } else {
                this.current_frame = this.frames.length - 1;
            }
        }
        next_frame_at = elapsedTime + frame_rate;
        return this.frames[this.current_frame];
    }
}
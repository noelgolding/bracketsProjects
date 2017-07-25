# Simple 2D Game Framework  

---

### The Game - manages the game play  
* setup the dimensions of the displayable area  
* setup the drawing surface and drawing tools  
* maintains the state of the game  
* maintains the simple game loop  

```
# PSEUDO CODE
class Game:
    setDimensions(width, height)
    setupCanvas()
    initState()
    gameLoop:
        updateAllTheThings()
        drawAllTheThings()
        repeat()
```

--- 

### GameObject
* has a position
* has a height and width
* update when the gameloop updates
* draw when the gameloop draws

```
# PSEUDO CODE
class GameObject:
    setPosition(x, y)
    setDimensions(width, height)
    
    update:
        subclasses will define behavior
    draw:
        subclasses will define behavior
```

---

#### Javascript implementation  

```javascript
// -- manages the game play --
class SimpleGame {
    constructor(name, width, height, bgcolor){
        this.name = name;
        
        // * setup the dimensions of the displayable area  
        this.width = width;
        this.height = height;
        this.bgColor = bgcolor || "black";
        
        // * setup the drawing surface and drawing tools 
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // clear the screen
        this.cls();
        
        // * maintains the state of the game
        this.gameIsRunning = false;
        this.gameObjects = [];
    }
        
    start(){
        document.title = this.name;
        this.gameIsRunning = true;
        this.gameloop(0);
    }
    
    cls(){
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    update(){
        for(var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }
    
    draw(){
        // clear the screen, then draw everything.
        this.cls();
        for(var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.ctx);
        }
    }
    
    // * maintains the simple game loop 
    gameloop(n) {
        if (this.gameIsRunning){
            this.update();
            this.draw();
            requestAnimationFrame((n) => this.gameloop(n))
        }
    }
}  
    
class SimpleGameObject {
    constructor(x, y, w, h){
        // * has a position
        this.position = {x: x, y: y};
        
        // * has a height and width
        this.width = w;
        this.height = h;
    }    
    
    // * update when the gameloop updates
    update(){} // meant to be overridden by subclasses
    
    // * draw when the gameloop draws
    draw(ctx){} // meant to be overridden by subclasses
}
```

---

#### Let's test it out with javascript!
```javascript
class MyFirstGame extends SimpleGame{
    constructor(){
        super("My First Game!", 800, 600, "black");
    }
}

function main(){
    game = new MyFirstGame();
    game.start();
}

window.addEventListener('load', main);
```

---


How the players move is unique to each game so let's add a player to our first game to get an idea on how to handle keyboard input.


### The Player - is a GameObject
* can move using keyboard input.
    
```
# PSEUDO CODE
class MyPlayer extends GameObject implements KeyInputHandler:        
    onKeyDown:
        if UP_ARROW:
            moveUp()
        else if DOWN_ARROW:
            moveDown()

        if LEFT_ARROW:
            moveLeft()
        else if RIGHT_ARROW:
            moveRight()

    onKeyUp:
        if UP_ARROW:
            stopMovingUp()
        else if DOWN_ARROW:
            stopMovingDown()

        if LEFT_ARROW:
            stopMovingLeft()
        else if RIGHT_ARROW:
            stopMovingRight()
```


---

#### Let's test it out with javascript!
We will start with just drawing our player.  
```html
&lt;script src="SimpleGameFramework.js">&lt;/script>
&lt;script>
class Player extends SimpleGameObject{
    constructor(){
        super(100, 100, 32, 48);
        this.color = "blue";
    }
    
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class MyFirstGame extends SimpleGame{
    constructor(){
        super("My First Game!", 800, 600, "black");
        this.player = new Player();
        this.gameObjects.push(this.player);
    }
}

function main(){
    game = new MyFirstGame();
    game.start();
}

window.addEventListener('load', main);
&lt;/script>
```

---

Now let's move the player.  
1st we need to define a method in the simple game to register event handlers.
We will also need a way to unregister event handlers

```
# PSEUDO CODE
class Game:
    addEventHandler(event, handler):
        registerEventHandler(event, handler)
        
    removeEventHandler(event, handler):
        unRegisterEventHandler(event, handler)
```

Now we need to update MyFirstGame to register MyPlayer as an event handler

```
# PSEUDO CODE
class MyFirstGame extends SimpleGameObject:
    addEventHandler(onKeyUp, myPlayer.onKeyUp):
    addEventHandler(onKeyDown, myPlayer.onKeyDown):

```

---

#### Let's test it out with javascript!
Add the following methods to SimpleGame:

```javascript
class SimpleGame{
    // ... 
    addEventHandler(target, event, handler) {
        target.addEventListener(event, handler);
    }
    // ...
}
```

---

Update the MyFirstGame class to register the player as an event handler:

```javascript
class MyFirstGame extends SimpleGame {
    constructor(){
        // ...
        this.addEventHandler(window, 'keydown', (e) => this.player.onKeyDown(e))
    }
    //...
}
```


---

Now let's get that player moving!

```javascript
class MyPlayer extends SimpleGameObject {
    constructor(){
        // ...
        this.speed = 5;
        this.velocity = {x: 0, y: 0};
    }
    // ...
    
    onKeyDown(e){
        if (e.code === "ArrowUp") {
            this.velocity.y = -this.speed;
        } else if (e.code === "ArrowDown") {
            this.velocity.y = this.speed;
        }
        
        if (e.code === "ArrowLeft") {
            this.velocity.x = -this.speed;
        } else if (e.code === "ArrowRight") {
            this.velocity.x = this.speed;
        }
    }
    
    onKeyUp(e){
        if (e.code === "ArrowUp" && this.velocity.y < 0) {
            this.velocity.y = 0;
        } else if (e.code === "ArrowDown" && this.velocity.y > 0) {
            this.velocity.y = 0;
        }
        
        if (e.code === "ArrowLeft" && this.velocity.x < 0) {
            this.velocity.x = 0;
        } else if (e.code === "ArrowRight" && this.velocity.x > 0) {
            this.velocity.x = 0;
        } 
    }

    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    // ...
}
```

---

Full code listing.

```javascript
// -- manages the game play --
class SimpleGame {
    constructor(name, width, height, bgcolor){
        this.name = name;
        
        // * setup the dimensions of the displayable area  
        this.width = width;
        this.height = height;
        this.bgColor = bgcolor || "black";
        
        // * setup the drawing surface and drawing tools 
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        
        // clear the screen
        this.cls();
        
        // * maintains the state of the game
        this.gameIsRunning = false;
        this.gameObjects = [];
    }
    
    addEventHandler(target, event, handler) {
        target.addEventListener(event, handler);
    }
    
    start(){
        document.title = this.name;
        this.gameIsRunning = true;
        this.gameloop(0);
    }
    
    cls(){
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    update(){
        for(var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update();
        }
    }
    
    draw(){
        // clear the screen, then draw everything.
        this.cls();
        for(var i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw(this.ctx);
        }
    }
    
    // * maintains the simple game loop 
    gameloop(n) {
        if (this.gameIsRunning){
            this.update();
            this.draw();
            requestAnimationFrame((n) => this.gameloop(n))
        }
    }
}  
    
class SimpleGameObject {
    constructor(x, y, w, h){
        // * has a position
        this.position = {x: x, y: y};
        
        // * has a height and width
        this.width = w;
        this.height = h;
    }    
    
    // * update when the gameloop updates
    update(){} // meant to be overridden by subclasses
    
    // * draw when the gameloop draws
    draw(ctx){} // meant to be overridden by subclasses
}

// **** Simple Game Framework above

// **** My Game Starts here

class MyPlayer extends SimpleGameObject{
    constructor(){
        super(100, 100, 32, 48);
        this.color = "blue";
        this.speed = 5;
        this.velocity = {x: 0, y: 0};
    }
    
    onKeyDown(e){
        if (e.code === "ArrowUp") {
            this.velocity.y = -this.speed;
        } else if (e.code === "ArrowDown") {
            this.velocity.y = this.speed;
        }
        
        if (e.code === "ArrowLeft") {
            this.velocity.x = -this.speed;
        } else if (e.code === "ArrowRight") {
            this.velocity.x = this.speed;
        }
    }
    
    onKeyUp(e){
        if (e.code === "ArrowUp" && this.velocity.y < 0) {
            this.velocity.y = 0;
        } else if (e.code === "ArrowDown" && this.velocity.y > 0) {
            this.velocity.y = 0;
        }
        
        if (e.code === "ArrowLeft" && this.velocity.x < 0) {
            this.velocity.x = 0;
        } else if (e.code === "ArrowRight" && this.velocity.x > 0) {
            this.velocity.x = 0;
        } 
    }

    update(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    
    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

class MyFirstGame extends SimpleGame{
    constructor(){
        super("My First Game!", 800, 600, "black");
        this.player = new MyPlayer();
        this.gameObjects.push(this.player);
        this.addEventHandler(window, 'keydown', (e) => this.player.onKeyDown(e));
        this.addEventHandler(window, 'keyup', (e) => this.player.onKeyUp(e));
    }
}

function main(){
    game = new MyFirstGame();
    game.start();
}

window.addEventListener('load', main);
```

---

# LEVEL UP

```
# PSEUDO CODE
class Level extends GameObject:
    super(0, 0, width, height)
    setBackground()
    addStaticObjects()
    addCollectibleObjects()
    addEnemies()
    addPlayer()
    start()
    update()
    draw()

class Game:
    start:
        nextLevel();

    nextLevel:
        if (hasNextLevel):
            if (level != null):
                gameObjects.remove(level)

            level = new Level()
            gameObjects.add(level)
        else:
            gameOver()
    
```


---

# GAME OVER

__Note:__ this solutions presented here are not idiomatic, but simplified to be as close to uniform across all the languages for educational purposes. To see idiomatic implementations, refer to the Appendix.

### javascript implementation

### python implementation

### java implementation

### c++ implementation

# Appendix A. 
## Glossary

# Appendix B. 
## TBD

# Appendix C. 
## TBD

# Appendix D. 
## UML Diagram
<table>
    <tr>
        <th align="center">
            Game
        </th>
    </tr>
    <tr>
        <td>
            <ul>
                <li>name: string</li>
                <li>dimensions: {float, float}</li>
                <li>bgcolor: color</li>
                <li>gameObjects: GameObject[]</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td style="background-color: white;">
            + constructor(string name, {} dimensions, color bgcolor) -> Game 
        </td>
    </tr>
    <tr>
        <td style="background-color: white;">
            + start() -> void 
        </td>
    </tr>
     <tr>
        <td style="background-color: white;">
            + addGameObject(GameObject obj) -> void 
        </td>
    </tr>
    <tr>
        <td style="background-color: white;">
            + removeGameObject(GameObject obj) -> void 
        </td>
    </tr>
     <tr>
        <td style="background-color: white;">
            + addEventHandler(Event evt, EventHandler handler) -> void 
        </td>
    </tr>
    <tr>
        <td style="background-color: white;">
            + removeEventHandler(Event evt, EventHandler handler) -> void 
        </td>
    </tr>
   <tr>
        <td style="background-color: white;">
            - gameLoop() -> void 
        </td>
    </tr>
    <tr>
        <td style="background-color: white;">
            - update() -> void 
        </td>
    </tr>
    <tr>
        <td style="background-color: white;">
            - draw() -> void 
        </td>
    </tr>

</table>

<table>
    <tr>
        <th align="center">
            GameObject
        </th>
    </tr>
    <tr>
        <td>
            <ul>
                <li>postion: {float, float}</li>
                <li>dimensions: {float, float}</li>
            </ul>
        </td>
    </tr>
     <tr>
        <td style="background-color: white;">
            + constructor({} position, {} dimensions) -> GameObject 
        </td>
    </tr>
   <tr>
        <td style="background-color: white;">
            ~ update() -> void 
        </td>
    </tr>
    <tr>
        <td style="background-color: white;">
            ~ draw(GraphicsContext ctx) -> void 
        </td>
    </tr>
</table>



# Appendix E. 
## Additional References

# Appendix F. 
## Framework listings (idiomatic)
#### javascript (es6) implementation

#### python 2.7/3.4 implementation

#### java 8 implementation

#### c++ (10? 11?) implementation

# Appendix G. 
## Game listings (idiomatic)
#### javascript (es6) implementation

#### python 2.7/3.4 implementation

#### java 8 implementation

#### c++ (10? 11?) implementation

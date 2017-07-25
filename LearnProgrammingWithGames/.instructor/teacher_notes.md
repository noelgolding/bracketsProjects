00 - computer graphics coord system
computer scientists count starting from 0
|          |          |
|          |          |
|          |          |
|          |          |
|----------|----------|
|          |          |
|          | computer |
|          | graphics |
|          |          |

* talk about graphics coord sys, top left == (0,0)  bottom right == (width, height)
* pixel is a point on the screen
* we will think of this area as the canvas

01 - Getting our feet wet
let's start with writing some psuedo code. PSEUDO CODE is like creating magic spells! We use pseudo code as the recipe to writing actual computer code.
```
paint
    - get a canvas to paint on.
    - get paint and paintbrushes.
    - paint a picture.
    - show it to the world!
```

Note: do not get bogged down in explaining the details, just let students copy the code, and answer questions if they have any. Don't information overload too soon.
```
<script>
function paint() {
    // get a canvas to paint on
    canvas = document.createElement('canvas');
    
    // get paint and paintbrushes
    ctx = canvas.getContext('2d');

    // =================
    // paint a picture
    // 
    
    // paint the background black
    ctx.fillStyle = 'black'; // get some black paint
    ctx.fillRect(0, 0, 300, 150); // paint with the rectangle brush

    // paint a red square
    ctx.fillStyle = 'red'; // get some red paint
    ctx.fillRect(140, 140, 20, 20); // paint with the rectangle brush
    
    // show it to the world!
    document.body.appendChild(canvas);
}
window.onload = paint;
</script>
```

01 - a shallow dive
`<script>` and `</script>` this tells the browser that the "stuff" in between should be considered a program.
`function paint() { ... }` this is our magic spell from our pseudo code. When we turn our magic spells into code, we will usually create functions.  We will discuss more about functions later.
`window.onload = paint;` this tells the browser to say the magic spell "paint" whenever it is ready.
anything after `//` are comments for humans to read and are ignored by the computer.

01 - a little deeper
for now we will ignore the ines of code used to `createSurface`
we are just going to always include them for now.

ok, so what did we make our pseudo code `paintOnSurface` do?

1. painted the background black
2. painted a white square

so let's break them down, a little bit.  Every computer language will solve this problem in slightly different ways, but essentially we have to tell the computer what color we want to use, and what we want to draw.  This is accomplished by setting properties making function calls.  Let's take these one at a time.

1. using variables.
`ctx.fillStyle = 'white';` (I know this is technically a property, but the kids don't need that level of detail yet... geesh)
here `ctx.fillStyle` is a variable and we are assigning it's value to `'white'`.
A variable is a "friendly" name or a "placeholder" for a value.  For example remember word problems in math class?
```
---------------------------------
| Question:
| s = a + b
| solve for s if a = 1 and b = 2
---------------------------------
If we substitue a and b we get the following
Solution:
s = 1 + 2
then we add 1 and 2 and assign the results to s
s = 3

a is a variable that holds the value 1
b is a variable that holds the value 2
s is a variable that we are assinging the value 1 + 2
now s is a variable the holds the value 3
```
If you still are not quite sure, don't worry, we will learn more about variables as we go along.  For now what I want to you to learn is a variable is a placeholder and the `=` is used to assign `values`.  Don't worry you don't have to memorize this, we will have LOT's of practice doing this.

2. function calls 
`ctx.fillRect(140, 140, 20, 20);`
# TODO come up with some good Harry Potter spells. one with no parameters, and one with.
You can think of a method call kind of like our magic spell like 'Stupify' or 'Some spell with more than one work'.  Simply by saying the "magic words", the computer wil do stuff for you.  Here we are asking the computer to draw a rectangle for us. Functions sometimes need additional information to get the job done.  It gets the information via parameters. 
here `ctx.fillRect` is the method and `(140, 140, 20, 20)` are the parameters.  Here the function needs to know where to draw.  The parameters tell the function the x, y, width and height.

(x,y) is the top left corner ( remember the graphics coord system? )
|-------------|
|             |
|    |--|     |
|    |__|     |
|             |
|_____________|

what did we learn?
setting properties looks like `property = value`
calling functions look like `functionName()` if no parameters are need or `functionName(parameter1, parameter2)` if 2 parameters are needed.  The parameters can be anywhere from 0 to as many parameters as required to get the job done.


EXPERIMENT
make your own painting by adding more boxes with different colors and sizes


OK no back to the single box
01 - variable box
```
# PSEUDO CODE
# create a surface to paint on 
# paint on the surface
createSurface
paintOnSurface
    paintBackground(black)
    paintAWhiteSquare
```

Note: do not get bogged down in explaining the details, just let students copy the code, and answer questions if they have any. Don't information overload too soon.
```
<script>
function paint() {
    // get a canvas to paint on
    canvas = document.createElement('canvas');
    
    // get paint and paintbrushes
    ctx = canvas.getContext('2d');

    // =================
    // paint a picture
    // 
    
    // paint the background black
    ctx.fillStyle = 'black'; // get some black paint
    ctx.fillRect(0, 0, 300, 300); // paint with the rectangle brush

    // paint a white square
    ctx.fillStyle = 'white'; // get some white paint
    ctx.fillRect(140, 140, 20, 20); // paint with the rectangle brush
    
    // show it to the world!
    document.body.appendChild(canvas);
}
window.onload = paint;
</script>
```

EXPERIMENT
play with adjusting the variable values
change the canvas size


OK back to the variable box
creating many boxes like a computer programmer.

Time to introduce looping and random
diagram what a for loop is, and how the index is used

```
# PSEUDO CODE
initialize index
check if the loop should continue or GOTO END
execute the steps in the loop
increment the index
GOTO check if the loop should continue
END ... continue with the rest of the program.
```

... Time to introduce arrays
colors = ['', '', '', '', ''];
we want to randomly pick on







################ on to the game
After the paint spell we are read to make games!!!!!!!
maybe play a finished game first to get the hang of it.
talk about the rules of the game
draw the game to get an idea of what it should look like
pseudo code 
```
draw the game board.
draw the paddles.
draw the ball.
bounce the ball around the screen.
move the paddles to bounce the ball back to the other side.
```

ok, let's formalize this a little bit.
```
fancy ball
        ctx.fillStyle = 'black';
        ctx.fillRect(this.ballX, this.ballY, 4, 4);
        ctx.fillRect(this.ballX+12, this.ballY, 4, 4);
        ctx.fillRect(this.ballX, this.ballY+12, 4, 4);
        ctx.fillRect(this.ballX+6, this.ballY+6, 4, 4);
        ctx.fillRect(this.ballX+12, this.ballY+12, 4, 4);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.ballX, this.ballY, 16, 16);
```


00 = graphics coord, counting starts at 0, pseudo code is magic!, pseudo code as comments, pseudo code => real code
What's being introduced.
    - new ways of thinking about problems
    - refactoring
    - graphics coord
    - functions
    - animation loop - explain with a flipbook animation example. make box shrink and grow

01 = Gooooooooaaaaaal!!!!!
animation loop => game loop
don't teach, just discuss as you type the code and answer questions.  
What's being introduced.
    - classes
    - methods
    - if/else if/else
    -- Game specific
    - gameloop
    - collision detection
    - handle user input
What's being reinforced
    - programming can be fun!
    - graphics coords
    - problem solving
    - functions
    
02 = Hangman
don't teach, just discuss as you type the code and answer questions.  
What's being introduced.
    - arrays
    - iteration
What's being reinforced
    - programming can be fun!
    - graphics coords
    - problem solving
    - functions
    - classes
    - methods
    - if/else if/else
    -- Game specific
    - gameloop
    - collision detection
    - handle user input

03 = Alien Attack
don't teach, just discuss as you type the code and answer questions.  
What's being introduced.
    - inheritance
    - composition
    - Sprites
    - audio
What's being reinforced
    - programming can be fun!
    - graphics coords
    - problem solving
    - functions
    - classes
    - methods
    - if/else if/else
    - arrays
    - iteration
    -- Game specific
    - gameloop
    - collision detection
    - handle user input
    
04 = tank wars
    - handle keyboard AND mouse input
    - top down
    
05 = Dave the tri-athelete run, bike, swim - ala flappy bird, mario underwater
don't teach, just discuss as you type the code and answer questions.  
What's being introduced.
    - flying/swimming physics
    - side scroller asthetic, really it scrolls :)
    - camera
    - animation
    - menu system
What's being reinforced
    - programming can be fun!
    - graphics coords
    - problem solving
    - functions
    - classes
    - methods
    - if/else if/else
    - arrays
    - iteration
    - inheritance
    - composition
    - Sprites
    - tiled based level design
    - multi-level game
    - scrolling world
    -- Game specific
    - gameloop
    - collision detection
    - handle user input

06 = Bug Out
don't teach, just discuss as you type the code and answer questions.  
What's being introduced.
    - jumping physics
    - tiled based level design
    - multi-level game
    - side (scroller) asthetic
    - menu system
What's being reinforced
    - programming can be fun!
    - graphics coords
    - problem solving
    - functions
    - classes
    - methods
    - if/else if/else
    - arrays
    - iteration
    - inheritance
    - composition
    - Sprites
    -- Game specific
    - gameloop
    - collision detection
    - handle user input
    
07- pacman 
    - grid based game

08 = Legend of Jonah
don't teach, just discuss as you type the code and answer questions.  
What's being introduced.
    - top down asthetic
    - multi-player?
    - more on grid-based movement
What's being reinforced
    - programming can be fun!
    - animation
    - graphics coords
    - problem solving
    - functions
    - classes
    - methods
    - if/else if/else
    - arrays
    - iteration
    - inheritance
    - composition
    - Sprites
    - tiled based level design
    - multi-level game
    - camera
    - scrolling world
    -- Game specific
    - gameloop
    - collision detection
    - handle user input

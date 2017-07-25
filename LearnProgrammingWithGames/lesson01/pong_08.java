import common.SimpleGameEngine
import static common.SimpleGameEngine.rectCollision

public class Pong extends SimpleGame {
    public void init(){
        this.ballX = 312;
        this.ballY = 232;
        this.ballSpeed = 3;
        this.ballSpeedX = this.ballSpeed;
        this.ballSpeedY = this.ballSpeed;
        
        this.playerSpeed = 6;
        this.player1X = 0;
        this.player1Y = 190;
        this.player1SpeedY = 0;
        this.player2X = 620;
        this.player2Y = 190;
        this.player2SpeedY = 0;
        
        this.player1Score = 0;
        this.player2Score = 0;
    }
    
    private void handleInput(){
        // player 1 (on the left) uses 'W' to move up and 'S' to move down
        if("W".charCodeAt(0) in this.keypressed) {
            this.player1SpeedY = this.playerSpeed * -1;
        } else if ("S".charCodeAt(0) in this.keypressed){
            this.player1SpeedY = this.playerSpeed;
        } else {
            this.player1SpeedY = 0;
        }
        // player 2 (on the right) uses 'I' to move up and 'K' to move down
        if("I".charCodeAt(0) in this.keypressed) {
            this.player2SpeedY = this.playerSpeed * -1;
        } else if ("K".charCodeAt(0) in this.keypressed){
            this.player2SpeedY = this.playerSpeed;
        } else {
            this.player2SpeedY = 0;
        }
    }

        
    public void draw(Graphics g){
        // draw the game board.
        g.setPaint(Color.green);
        g.fillRect(318, 0, 4, 480);
        
        // draw the paddles.
        g.fillRect(this.player1X, this.player1Y, 20, 100);    // player1
        g.fillRect(this.player2X, this.player2Y, 20, 100);    // player 2
        
        // draw the ball.
        g.setPaint(Color.white);
        g.fillRect(this.ballX, this.ballY, 16, 16);
        
        // draw the scores
        g.setPaint(Color.blue);
        g.setFont(new Font("monospace", Font.PLAIN, 20));
        g.drawString("Player 1: " + this.player1Score, 20, 16);
        g.drawString("Player 2: " + this.player2Score, 580, 16);
    }
    
    public void update(){
        this.handleInput();
        // bounce the ball around the screen.
        this.ballX = this.ballX + this.ballSpeedX;
        this.ballY = this.ballY + this.ballSpeedY;
        
        // check if the ball bounces of any of the sides.
        // careful, some math below, but it's not too hard.
        // if the ball hits the left wall, then player 2 scores
        // if the ball hits the right wall, then player 1 scores
        if (this.ballX < 0) {
            this.player2Score = this.player2Score + 1;
            this.ballX = 0;
            this.ballSpeedX = this.ballSpeedX * -1;
        } else if (this.ballX + 16 > this.canvas.width) {
            this.player1Score = this.player1Score + 1;
            this.ballX = this.canvas.width - 16;
            this.ballSpeedX = this.ballSpeedX * -1;
        }
        
        if (this.ballY < 0){
            this.ballY = 0;
            this.ballSpeedY = this.ballSpeedY * -1;
        } else if (this.ballY + 16 > this.canvas.height) {
            this.ballY = this.canvas.height - 16;
            this.ballSpeedY = this.ballSpeedY * -1;
        }
        
        // move the paddles
        this.player1Y = this.player1Y + this.player1SpeedY;
        this.player2Y = this.player2Y + this.player2SpeedY;
        // stop the players from going off the field.
        if (this.player1Y < 0){
            this.player1Y = 0;
        } else if (this.player1Y + 100 > this.canvas.height) {
            this.player1Y = this.canvas.height - 100;
        }
        
        if (this.player2Y < 0){
            this.player2Y = 0;
        } else if (this.player2Y + 100 > this.canvas.height) {
            this.player2Y = this.canvas.height - 100;
        }
        // bounce the ball back to the other side
        int[] ballRect = {this.ballX, this.ballY, 16, 16};
        int[] player1Rect = {this.player1X, this.player1Y, 20, 100};
        int[] player2Rect = {this.player2X, this.player2Y, 20, 100]};
        if (rectCollision(ballRect, player1Rect)) {
            this.ballX = this.player1X + 20;
            this.ballSpeedX = this.ballSpeed;
        } else if (rectCollision(ballRect, player2Rect)){
            this.ballX = this.player2X - 20;
            this.ballSpeedX = this.ballSpeed * -1;
        }
    }
    
    public static void main(String[] args){
        SimpleGame game = new Pong("Pong", 640, 480, 'lightgreen');
        game.start();
    }
}

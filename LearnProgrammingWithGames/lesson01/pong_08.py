from SimpleGameEngine import SimpleGame, rectCollision

def Pong(SimpleGame):
    def init(self):
        self.ballX = 312
        self.ballY = 232
        self.ballSpeed = 3
        self.ballSpeedX = self.ballSpeed
        self.ballSpeedY = self.ballSpeed
        
        self.playerSpeed = 6
        self.player1X = 0
        self.player1Y = 190
        self.player1SpeedY = 0
        self.player2X = 620
        self.player2Y = 190
        self.player2SpeedY = 0
        
        self.player1Score = 0
        self.player2Score = 0
    
    
    def handleInput(self):
        # player 1 (on the left) uses 'W' to move up and 'S' to move down
        if ord("W") in self.keypressed: 
            self.player1SpeedY = self.playerSpeed * -1
         elsif ord("S") in self.keypressed:
            self.player1SpeedY = self.playerSpeed
         else:
            self.player1SpeedY = 0
        
        # player 2 (on the right) uses 'I' to move up and 'K' to move down
        if ord("I") in self.keypressed: 
            self.player2SpeedY = self.playerSpeed * -1
         elsif ord("K") in self.keypressed:
            self.player2SpeedY = self.playerSpeed
         else:
            self.player2SpeedY = 0

            
    def draw(self, c):
        # draw the game board.
        c.create_rectangle(318, 0, 322, 480, fill='green')
        
        # draw the paddles.
        c.create_rectangle(self.player1X, self.player1Y, self.player1X + 20, self.player1Y + 100, fill='green') # player1
        c.create_rectangle(self.player2X, self.player2Y, self.player2X + 20, self.player2Y+ 100, fill='green') # player 2
        
        # draw the ball.
        c.create_rectangle(self.ballX, self.ballY, self.ballX + 16, self.ballY + 16, fill='white')
        
        # draw the scores
        font = tkFont.Font(size=20, family='monospace')
        c.create_text(20, 16, font=font, fill='blue', anchor="nw", text="Player 1: " + str(self.player1Score))
        c.create_text(20, 16, font=font, fill='blue', anchor="ne", text="Player 2: " + str(self.player2Score))

    
    
    def update():
        self.handleInput()
        # bounce the ball around the screen.
        self.ballX = self.ballX + self.ballSpeedX
        self.ballY = self.ballY + self.ballSpeedY
        
        # check if the ball bounces of any of the sides.
        # careful, some math below, but it's not too hard.
        # if the ball hits the left wall, then player 2 scores
        # if the ball hits the right wall, then player 1 scores
        if self.ballX < 0: 
            self.player2Score = self.player2Score + 1
            self.ballX = 0
            self.ballSpeedX = self.ballSpeedX * -1
         elsif self.ballX + 16 > self.canvas.width: 
            self.player1Score = self.player1Score + 1
            self.ballX = self.canvas.width - 16
            self.ballSpeedX = self.ballSpeedX * -1
        
        
        if self.ballY < 0:
            self.ballY = 0
            self.ballSpeedY = self.ballSpeedY * -1
         elsif self.ballY + 16 > self.canvas.height: 
            self.ballY = self.canvas.height - 16
            self.ballSpeedY = self.ballSpeedY * -1
        
        
        # move the paddles
        self.player1Y = self.player1Y + self.player1SpeedY
        self.player2Y = self.player2Y + self.player2SpeedY
        # stop the players from going off the field.
        if self.player1Y < 0:
            self.player1Y = 0
         elsif self.player1Y + 100 > self.canvas.height: 
            self.player1Y = self.canvas.height - 100
        
        
        if self.player2Y < 0:
            self.player2Y = 0
         elsif self.player2Y + 100 > self.canvas.height: 
            self.player2Y = self.canvas.height - 100
        
        # bounce the ball back to the other side
        var ballRect = [self.ballX, self.ballY, 16, 16]
        var player1Rect = [self.player1X, self.player1Y, 20, 100]
        var player2Rect = [self.player2X, self.player2Y, 20, 100]
        if rectCollision(ballRect, player1Rect):
            self.ballX = self.player1X + 20
            self.ballSpeedX = self.ballSpeed
         elsif rectCollision(ballRect, player2Rect):
            self.ballX = self.player2X - 20
            self.ballSpeedX = self.ballSpeed * -1


if __name__ ==  '__main__':
    game = Pong("Pong", 640, 480, 'lightgreen')
    game.start()

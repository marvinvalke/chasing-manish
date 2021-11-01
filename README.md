# chasing-manish
Javascript Game

## Description
Chasing Manish is a game where the player has to jump to catch the pieces of his stolen code and dodge the error throwed by Manish. The game ends when the player get hitten by an error. When the game is over the score is calculated based on how many tag the player got and the amount of time the game lasted. 
## MVP (DOM - CANVAS)

- game has a main character that moves vertically by jumping
- bricks of code are coming randomly from the right side of the screen
- blocks of errors comes randomly from the right side of the screen 
- getting hit by an error will end the game
- bricks of code increases the score
- Increasing dificulty

## Backlog

- add scoreboard
- add a levels 
- possibility to start the game at different levels
- boss fight on a shooter base

## Data Structure
# main.js

- buildSptartcreen () {}
- buildGameScreen () {}
- buildGameOverScreen () {}

# game.js

- Game () {}
- starLoop () {}
- checkCollisions () {}
- addCodes () {}
- addErrors () {}
- clearCanvas () {}
- updateCanvas () {}
- drawCanvas () {}
- GameOver () {}

# geek.js 

- Geek () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- jump () {}


# code.js 

- Code () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollision () {}

# error.js 

- Error () {
    this.x;
    this.y;
    this.direction;
    this.size
}
- draw () {}
- move () {}
- checkCollision () {}

## States y States Transitions
Definition of the different states and their transition (transition functions)

- startScreen
- gameScreen
- gameOverScreen

## Task

- main - buildDom
- main - buildStartScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- game - startLoop
- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- code - draw
- code - move
- game - addCode
- error - draw
- error - move
- game - addError
- geek - draw
- geek - move
- game - addGeek
- game - checkCollision
- game - GameOver
- game - addEventListener

## Links

### Trello
[Link url](https://trello.com/b/weL1AYtp/chasing-manish)

### Git
URls for the project repo and deploy
[Link Repo](https://github.com/marvinvalke/chasing-manish)
[Link Deploy](https://jorgeberrizbeitia.github.io/kraken-brigade/)

### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/138o01hAz-0gXepN78RsDgse12HiiuN7Fz_N_hJnI9_g/edit?usp=sharing)
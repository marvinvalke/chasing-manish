# chasing-manish
https://marvinvalke.github.io/chasing-manish/

## Description
Chasing Manish is a game where the player has to jump to catch the pieces of his stolen code and dodge the error throwed by Manish. The game ends when the player get hitten by an error. When the game is over the score is calculated based on how many tag the player got and the amount of time the game lasted. 
## MVP (DOM - CANVAS)

- game has a main character that moves horizontally and vertically by jumping
- bricks of code are coming randomly from the right side of the screen
- blocks of errors comes randomly from the right side of the screen 
- getting hit by an error will end the game
- catching bricks of code increases the score

## Backlog

- add scoreboard
- add musics
- easter egg

## Data Structure
# script.js
- targeting DOM element
- global variables for sounds and images
- game settings variables
- startPlaying() 
- gameOverScreen()
- finish()
- draw() 
- animation()
- moves()
- window.addEventListener()
- audioBtn.addEventListener()
- document.addEventListener('keydown')
- document.addEventListener('keyup')
- restartBtn.addEventListener()




## States y States Transitions
Definition of the different states and their transition (transition functions)

- startScreen
- gameScreen
- gameOverScreen
- gameFinishScreen

## Task

- main - buildDom
- main - buildStartScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- main - buildGameFinishScreen
- game - buildCanvas
- game - drawCanvas
- game - updateCanvas
- game - addEventListener
- game - checkCollision
- game - GameOver
- game - draw
- game - startLoop
- game - addScore
- catch - draw
- catch - move
- error - draw
- error - move
- geek - draw
- geek - move
- manish - draw
- manish - move


## Links

### Git
URls for the project repo and deploy
[Link Repo](https://github.com/marvinvalke/chasing-manish)
[Link Deploy](https://jorgeberrizbeitia.github.io/kraken-brigade/)

### Slides
URls for the project presentation (slides)
[Link Slides.com](https://docs.google.com/presentation/d/1PYwUBCCkPf7CQ_TjjzqE04Kj56uZlNsag45Hc2cWPjY/edit?usp=sharing)

//-----------------------------------------------------
//                       DOM
//-----------------------------------------------------

let canvas = document.querySelector("canvas");
canvas.style.border = "2px solid black";
let ctx = canvas.getContext("2d");
let playBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let startImage = document.querySelector("#startImage");
let text = document.querySelector("#intro");
let gameOverText = document.querySelector("#GameOverText");
let gameOverTitle = document.querySelector("#gameOverTitle");
let mainTitle = document.querySelector("#mainTitle");
let gameOverImg = document.querySelector("#gameOverImg");
let gameOverScore = document.querySelector("#gameOverScore");
let audioBtn = document.querySelector(".botón");
let instructions = document.querySelector("#instructions");
let finishTitle = document.querySelector("#finishTitle");
let finishText = document.querySelector("#finishText");
let finishImg = document.querySelector("#finishImg");
let linkManish = document.querySelector("#linkManish");

//-----------------------------------------------------
//                     MUSIC & SOUNDS
//-----------------------------------------------------

let startAudio = new Audio();
startAudio.src = "./images/startAudio.mp3";
let gameAudio = new Audio();
gameAudio.src = "./images/gameSound.wav";
let gameOverAudio = new Audio();
gameOverAudio.src = "./images/gameOverSound.wav";
let catchSound = new Audio();
catchSound.src = "./images/catchSound.mp3";
let errorSound = new Audio();
errorSound.src = "./images/errorSound.mp3";

//-----------------------------------------------------
//                     IMAGES
//-----------------------------------------------------

let bg = new Image();
bg.src = "./images/background.png";

let manish = new Image();
manish.src = "./images/manish.png";
let manishX = 700;
let manishY = 150;

let manish2 = new Image();
manish2.src = "./images/manish2.png";

let manish3 = new Image();
manish3.src = "./images/manish3.png";

let manish4 = new Image();
manish4.src = "./images/manish4.png";

let manishSprite = [manish, manish2, manish3, manish4];
let manishCount = 0;
let manishIndex = 0;

let road = new Image();
road.src = "./images/road.png";
let roadX = 0,
  roadY = 120;

let shop = new Image();
shop.src = "./images/minishop.png";
let shopX = 50,
  shopY = 85;

let tag = new Image();
tag.src = "./images/tag.png";

let geek = new Image();
geek.src = "./images/geek.png";
let geekX = 100,
  geekY = 390;
let geekWidth = 70;
let geekHeight = 100;

let geekRight2 = new Image();
geekRight2.src = "./images/Run2.png";

let geekRight3 = new Image();
geekRight3.src = "./images/Run3.png";

let geekRight4 = new Image();
geekRight4.src = "./images/Run4.png";

let geekRight6 = new Image();
geekRight6.src = "./images/Run6.png";

let geekRight7 = new Image();
geekRight7.src = "./images/Run7.png";

let run = [geek, geekRight2, geekRight3, geekRight4, geekRight6, geekRight7];
let rightCount = 0;
let runIndex = 0;

let geekJump3 = new Image();
geekJump3.src = "./images/Jump3.png";

let html = new Image();
html.src = "./images/html.png";

let css = new Image();
css.src = "./images/css.png";

let js = new Image();
js.src = "./images/js.png";

let error = new Image();
error.src = "./images/error.png";

let images = [error, html, error, css, error, js];

//-------------------Objects----------------------------

let shops = [
  { x: roadX, y: 100 },
  { x: roadX + 805, y: 100 },
];

let background = [
  { x: 0, y: 0 },
  { x: 800, y: 0 },
];

let projectiles = [
  { x: manishX, y: manishY, img: css, isGood: true, width: 50, height: 50 },
];

//-----------------------------------------------------
//                     SETTINGS
//-----------------------------------------------------
let speed = 10;
let geekSpeed = 0.2;
let projectileSpeed = 6;
let gravity = 8.3;
let geekGravity = 10;
let jump = -20;
let score = 0;
let projectileLimite = 550;
let gameOver = false;
let intervalId = 0;
let isRight = false;
let isJumping = false;
let finished = false;

//-----------------------------------------------------
//                     FUNCTIONS
//-----------------------------------------------------

//--------------------------Play---------------------------
function startPlaying() {
  canvas.style.display = "block";
  playBtn.style.display = "none";
  restartBtn.style.display = "none";
  startImage.style.display = "none";
  text.style.display = "none";
  gameOverTitle.style.display = "none";
  gameOverImg.style.display = "none";
  gameOverText.style.display = "none";
  gameOverScore.style.display = "none";
  audioBtn.style.display = "none";
  animation();
  gameAudio.play();
  gameAudio.volume = 0.1;
  gameAudio.loop = true;
  startAudio.volume = 0;
  gameOverAudio.volume = 0;
  instructions.style.display = "block";
  mainTitle.style.display = "block";
  finishTitle.style.display = "none";
  finishText.style.display = "none";
  finishImg.style.display = "none";
  linkManish.style.display = "none";
}

//-------------------------Game Over--------------------
function gameOverScreen() {
  canvas.style.display = "none";
  playBtn.style.display = "none";
  restartBtn.style.display = "block";
  startImage.style.display = "none";
  gameOverTitle.style.display = "block";
  mainTitle.style.display = "none";
  gameOverImg.style.display = "block";
  gameOverText.style.display = "block";
  gameOverScore.style.display = "block";
  gameOverScore.innerText = `SCORE: ${score}... Not too bad`;
  gameOverAudio.play();
  gameOverAudio.volume = 0.1;
  gameOverAudio.loop = true;
  gameAudio.pause();
  gameAudio.loop = false;
  startAudio.pause();
  audioBtn.style.display = "none";
  instructions.style.display = "none";
  finishTitle.style.display = "none";
  finishText.style.display = "none";
  finishImg.style.display = "none";
  linkManish.style.display = "none";
}
//-------------------------Finish--------------------
function finish() {
  linkManish.style.display = "block";
  finishTitle.style.display = "block";
  finishText.style.display = "block";
  finishImg.style.display = "block";
  canvas.style.display = "none";
  playBtn.style.display = "none";
  restartBtn.style.display = "none";
  startImage.style.display = "none";
  mainTitle.style.display = "none";
  audioBtn.style.display = "none";
  instructions.style.display = "none";
  startAudio.play();
  startAudio.volume = 0.1;
  gameAudio.pause();
}

// -----------Draw images & backgound------------------
function draw() {
  // Background----------------------------------------

  for (let j = 0; j < background.length; j++) {
    ctx.drawImage(bg, background[j].x, background[j].y, 800, 500);
    background[j].x = background[j].x - speed / 3;

    if (background[j].x + 799 < 0) {
      background[j].x = canvas.width;
      background[j].y = 0;
    }
  }

  // Road animation------------------------------------
  for (let i = 0; i < shops.length; i++) {
    ctx.drawImage(road, shops[i].x, shops[i].y, 900, 400);
    ctx.drawImage(shop, shops[i].x, shops[i].y, 800, 500);
    shops[i].x = shops[i].x - speed;

    if (shops[i].x + 900 < 0) {
      shops[i].x = canvas.width;
      shops[i].y = 100;
    }
  }

  // Projectiles animation------------------------------
  for (let i = 0; i < projectiles.length; i++) {
    ctx.drawImage(
      projectiles[i].img,
      projectiles[i].x,
      projectiles[i].y,
      50,
      50
    );
    projectiles[i].x = projectiles[i].x - projectileSpeed;

    if (projectiles[i].x === projectileLimite) {
      projectiles.push({
        x: manishX,
        y: manishY,
        img: images[Math.floor(Math.random() * images.length)],
      });
    }

    // Collision-----------------------------------
    if (
      projectiles[i].x < geekX + geekWidth &&
      projectiles[i].x + 50 > geekX &&
      projectiles[i].y < geekY + geekHeight &&
      projectiles[i].y + 50 > geekY
    ) {
      if (projectiles[i].img !== error) {
        score++;
        projectiles[i].y = -100;
        catchSound.play();
        catchSound.volume = 0.1;
        catchSound.currentTime = 0;
      } else {
        errorSound.play();
        errorSound.volume = 0.1;
        gameOver = true;
        projectiles[i].y = -100;
      }
    }
  }
  if (
    manishX < geekX &&
    manishX + manish.width > geekX &&
    manishY < geekY + geekHeight &&
    manishY + manish.height > geekY
  ) {
    finished = true;
  }
  // Score
  ctx.font = "28px Chakra Petch";
  ctx.fillStyle = "#ffc43b";
  ctx.fillText(`SCORE: ${score}`, 30, 30);

  // Drawing Manish---------------------------
  ctx.drawImage(manish, manishX, manishY);

  // Drawing main character-----------------------------
  if (isJumping) {
    ctx.drawImage(geekJump3, geekX, geekY, geekWidth + 50, geekHeight + 50);
  } else if (isRight) {
    rightCount++;
    runIndex = rightCount % run.length;
    ctx.drawImage(run[runIndex], geekX, geekY, geekWidth, geekHeight);
  } else {
    ctx.drawImage(geek, geekX, geekY, geekWidth, geekHeight);
  }
}

// ------------------------Animation-------------------------
function animation() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Trigger other functions
  draw();
  moves();

  // Game flow
  if (gameOver) {
    cancelAnimationFrame(intervalId);
    gameOverScreen();
  } else if (finished === true) {
    cancelAnimationFrame(intervalId);
    finish();
  } else {
    intervalId = requestAnimationFrame(animation);
  }
}

// -----------------------MOVEMENTS-------------------------
function moves() {
  //Manish's moves---------------------------------
  manishY = manishY + gravity;
  if (manishY + manish.height > canvas.height) {
    gravity = -gravity;
  }
  if (manishY < 100) {
    gravity = -1 * gravity;
  }

  //Geek's moves--------------------------------------
  if (isRight == true) {
    geekX = geekX + geekSpeed;
  }
  if (geekX > manishX) {
    isRight = false;
  }

  if (isJumping == true && geekY > 0) {
    geekY = geekY + jump;
  }
  if (geekY < 390) {
    geekY = geekY + geekGravity;
  }
  if (geekY < 20 && geekY > 390) {
    geekY = geekY + geekGravity;
  }
}

//-----------------------------------------------------
//                     EVENTS
//-----------------------------------------------------

window.addEventListener("load", () => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";
  gameOverTitle.style.display = "none";
  gameOverImg.style.display = "none";
  gameOverText.style.display = "none";
  gameOverScore.style.display = "none";
  finishTitle.style.display = "none";
  finishText.style.display = "none";
  finishImg.style.display = "none";
  linkManish.style.display = "none";

  audioBtn.addEventListener("click", (event) => {
    if (startAudio.paused) {
      startAudio.play();
      startAudio.volume = 0.1;
    } else {
      startAudio.pause();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowRight") {
      isRight = true;
    }

    if (event.key == " ") {
      isJumping = true;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight") {
      isRight = false;
    }

    if (event.key == " ") {
      isJumping = false;
    }
  });

  playBtn.addEventListener("click", () => {
    startPlaying();
  });

  restartBtn.addEventListener("click", () => {
    finished = false;
    gameOver = false;
    geekX = 100;
    geekY = 390;
    projectiles = [{ x: manishX, y: manishY, img: css, isGood: true }];
    score = 0;
    startPlaying();
  });
});

let canvas = document.querySelector("canvas");
canvas.style.border = "2px solid black";
let ctx = canvas.getContext("2d");
let playBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let startImage = document.querySelector("#startImage");
let gameOver = false;
let intervalId = 0;
let isRight = false;
let isLeft = false;
let isJumping = false;

//-----------------------------------------------------
//                     IMAGES
//-----------------------------------------------------

let bg = new Image();
bg.src = "./images/background.png";

let manish = new Image();
manish.src = "./images/manish.png";
let manishX = 700;
let manishY = 150;

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

let html = new Image();
html.src = "./images/html.png";

let css = new Image();
css.src = "./images/css.png";

let js = new Image();
js.src = "./images/js.png";

let error = new Image();
error.src = "./images/error.png";

let images = [error, html, error, css, error, js];

//-------------------Objects-------------------------------------

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
let gravity = 8.3;
let geekGravity = 10;
let jump = -20;
let score = 0;
let projectileLimite = 590;

//-----------------------------------------------------
//                     FUNCTIONS
//-----------------------------------------------------

//--------------------------Play---------------------------
function play() {
  canvas.style.display = "block";
  playBtn.style.display = "none";
  restartBtn.style.display = "none";
  startImage.style.display = "none";
  animation();
}

//-------------------------Game Over------------------------

function gameOverScreen() {
  canvas.style.display = "none";
  playBtn.style.display = "none";
  restartBtn.style.display = "block";
  startImage.style.display = "none";
}

/* function restartGame () {
  gameOver = false;
  geekX = 100;
  geekY = 390;
  projectiles = [{ x: manishX, y: manishY, img: css, isGood: true }];
  score = 0;
} */

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
    projectiles[i].x--;

    if (projectiles[i].x === projectileLimite) {
      projectiles.push({
        x: manishX,
        y: manishY,
        img: images[Math.floor(Math.random() * images.length)],
      });
    }

    // Collision-----------------------------------
    if (projectiles[i].img !== error) {
      // Collision FRONT-------------------------
      if (
        geekX + geekWidth < projectiles[i].x + 50 &&
        geekX + geekWidth >= projectiles[i].x &&
        geekY + geekHeight >= projectiles[i].y &&
        geekY < projectiles[i].y
      ) {
        score++;
        projectiles[i].y = -100;
      }
      // Collision TOP-----------------------------
      if (
        geekX + geekWidth >= projectiles[i].x &&
        geekX + geekWidth < projectiles[i].x + 50 &&
        geekY >= projectiles[i].y &&
        geekY < projectiles[i].y + 50
      ) {
        score++;
        projectiles[i].y = -100;
      }
      // Collision BOTTOM----------------------------
      if (
        geekY + geekHeight >= projectiles[i].y &&
        geekX >= projectiles[i].x &&
        geekX < projectiles[i].x + 50 &&
        geekY + geekHeight <= projectiles[i].y + 50
      ) {
        score++;
        projectiles[i].y = -100;
      }
    } else {
      // Collision FRONT-------------------------
      if (
        geekX + geekWidth < projectiles[i].x + 50 &&
        geekX + geekWidth >= projectiles[i].x &&
        geekY + geekHeight >= projectiles[i].y &&
        geekY < projectiles[i].y
      ) {
        gameOver = true;
        projectiles[i].y = -100;
      }
      // Collision TOP-----------------------------
      if (
        geekX + geekWidth >= projectiles[i].x &&
        geekX + geekWidth < projectiles[i].x + 50 &&
        geekY >= projectiles[i].y &&
        geekY < projectiles[i].y + 50
      ) {
        gameOver = true;
        projectiles[i].y = -100;
      }
      // Collision BOTTOM----------------------------
      if (
        geekY + geekHeight >= projectiles[i].y &&
        geekX >= projectiles[i].x &&
        geekX < projectiles[i].x + 50 &&
        geekY + geekHeight <= projectiles[i].y + 50
      ) {
        gameOver = true;
        projectiles[i].y = -100;
      }
    }
  }

  // Drawing Manish---------------------------
  ctx.drawImage(manish, manishX, manishY);

  // Drawing main character-----------------------------

  if (isRight) {
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
  // Score
  /* ctx.fillStyle = "white" */
  ctx.font = "20px Chakra Petch";
  ctx.fillText(`SCORE: ${score}`, 30, 30);
  // Trigger other functions
  draw();
  moves();

  // Game flow
  if (gameOver) {
    cancelAnimationFrame(intervalId);
    gameOverScreen();
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
    play();
  });

  restartBtn.addEventListener("click", () => {
    play();
    gameOver = false;
    geekX = 100;
    geekY = 390;
    projectiles = [{ x: manishX, y: manishY, img: css, isGood: true }];
    score = 0;
    //restartGame();
  });
});

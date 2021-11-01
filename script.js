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
  geekY = 410;

let geekRigt1 = new Image();
geekRigt1.src = "./images/Run (2).png";

let geekRigt2 = new Image();
geekRigt1.src = "./images/Run (3).png";

let geekRigt3 = new Image();
geekRigt1.src = "./images/Run (6).png";

let geekRigt4 = new Image();
geekRigt1.src = "./images/Run (2).png";

let run = [geekRigt1, geekRigt2, geekRigt3, geekRigt4];

let html = new Image();
html.src = "./images/html.png";

let css = new Image();
css.src = "./images/css.png";

let js = new Image();
js.src = "./images/js.png";

let error = new Image();
error.src = "./images/error.png";

let images = [html, css, js, error, error];

//-------------------Objects-------------------------------------

let shops = [
  { x: roadX, y: 100 },
  { x: roadX + 805, y: 100 },
];

let background = [
  { x: 0, y: 0 },
  { x: 800, y: 0 },
];

let projectiles = [{ x: manishX, y: manishY, img: css, isGood: true }];

//-----------------------------------------------------
//                     SETTINGS
//-----------------------------------------------------
let speed = 7;
let geekSpeed = 0.1;
let gravity = 5;
let geekGravity = 8;
let jump = -18;
let score = 0;
let projectileLimite = 460;

//-----------------------------------------------------
//                     FUNCTIONS
//-----------------------------------------------------

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
  }

  // Drawing Manish---------------------------
  ctx.drawImage(manish, manishX, manishY);

  // Drawing main character-----------------------------
  ctx.drawImage(geek, geekX, geekY, 100, 100);
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
  } else {
    intervalId = requestAnimationFrame(animation);
  }
}

//--------------------------Play---------------------------
function play() {
  canvas.style.display = "block";
  playBtn.style.display = "none";
  restartBtn.style.display = "none";
  startImage.style.display = "none";

  animation();
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
    for (let i = 0; i < run.lenght; i++) {}
  }
  if (isLeft == true) {
    geekX = geekX - geekSpeed;
  }
  if (isJumping == true && geekY > 0) {
    geekY = geekY + jump;
  }
  if (geekY < 410) {
    geekY = geekY + geekGravity;
  }

  // Collision------------------------------------------
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
      isLeft = false;
    }

    if (event.key == "ArrowLeft") {
      isRight = false;
      isLeft = true;
    }

    if (event.key == " ") {
      isJumping = true;
      isRight = false;
      isLeft = false;
    }
  });

  document.addEventListener("keyup", (event) => {
    if (event.key == "ArrowRight") {
      isRight = false;
    }

    if (event.key == "ArrowLeft") {
      isLeft = false;
    }

    if (event.key == " ") {
      isJumping = false;
    }
  });

  playBtn.addEventListener("click", () => {
    play();
  });

  restartBtn.addEventListener("click", () => {});
});

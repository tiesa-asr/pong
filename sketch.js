//ball's variables
let xBall = 300;
let yBall = 200;
let diameter = 13;
let radius = diameter / 2;

//ball speed
let speedXBall = 6;
let speedYBall = 6;

//racket's variables
let xRacket = 5;
let yRacket = 150;
let lRacket = 5;
let aRacket = 90; 

//opponent's variables
let xOpponentRacket = 589;
let yOpponentRacket = 150;
let speedYOpponent;

let collision = false;

//game score
let myPoints = 0;
let opponentsPoints = 0;

//opponent's error
let opponentPointsDifference = 0;

//game sounds
let racket;
let points;
let soundTrack;

//game table
let pongTable;

function preload(){
  soundtrack = loadSound("soundtrack.mp3");
  points = loadSound("points.mp3");
  racket = loadSound("racket.mp3");
  pongTable = loadImage("pong-table.jpg")
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(pongTable);
  showBall();
  moveBall();
  checkCollisionWithEdge(); 
  showRacket(xRacket, yRacket);
  moveMyRacket();
  //checkRacketCollision();
  checkRacketCollisionLibraryVersion(xRacket, yRacket);
  showRacket(xOpponentRacket, yOpponentRacket);
  moveOpponentsRacket();
  checkRacketCollisionLibraryVersion(xOpponentRacket, yOpponentRacket);
  addScore();
  scorePoints();
  //moveOpponentsRacketMultiplayer();
  trappedBallSolution();
  fieldDivision();
}

function fieldDivision(){
  rect(300, 0, 1, 400);
}

function trappedBallSolution(){
    if (xBall - radius < 0){
      xBall = 23;
  }
    if (xBall + radius > 600){
      xBall = 580;
  }
}

function showBall(){
 circle(xBall, yBall, diameter); 
}

function moveBall(){
  xBall += speedXBall;
  yBall += speedYBall;
}

function checkCollisionWithEdge(){
  if (xBall + radius > width ||
     xBall - radius < 0){
    speedXBall *= -1;
  }
  if (yBall + radius > height ||
     yBall - radius < 0){
    speedYBall *= -1;
  }
}

function showRacket(x, y){
  rect(x, y, lRacket, aRacket);

}

function moveMyRacket(){
  if (keyIsDown(UP_ARROW)){
    yRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRacket += 10;
  }
}

function checkRacketCollision(){
  if (xBall - radius < xRacket + lRacket && yBall - radius < yRacket + aRacket && yBall + radius > yRacket){
    speedXBall *= -1;
    racket.play();
  }
}

function checkRacketCollisionLibraryVersion(x, y){
  collision = collideRectCircle(x, y, lRacket, aRacket, xBall, yBall, radius);
  if (collision){
    speedXBall *= -1;
    racket.play();
  }
}

function moveOpponentsRacket(){
    speedYOpponent = yBall - yOpponentRacket - lRacket / 2 - opponentPointsDifference;
    yOpponentRacket += speedYOpponent
  if (opponentsPoints > myPoints){
    opponentPointsDifference = 100;
  }
  if (opponentsPoints < myPoints && opponentPointsDifference > 50){
    opponentPointsDifference = 3;
  }
}

function moveOpponentsRacketMultiplayer(){
  if (keyIsDown(87)){
    yOpponentRacket -= 10;
  }
  if (keyIsDown(83)){
    yOpponentRacket += 10;
  }
}

function addScore(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 69, 0));
  rect(130, 7, 40, 20, 20);
  fill(255)
  text(myPoints, 150, 23);
  fill(color(255, 69, 0));
  rect(430, 7, 40, 20, 20);
  fill(255)
  text(opponentsPoints, 450, 23);
}

function scorePoints(){
  if (xBall + radius > width ){
   myPoints += 1;
    points.play();
  }
  if (xBall - radius < 0){
    opponentsPoints += 1;
    points.play();
  }
}


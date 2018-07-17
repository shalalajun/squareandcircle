var particles = [];
var mouse;

x = 0;
y = 0;

var colorA;
var colorB;
var colorC;
var colorD;

function setup() {
  mouse = createVector(mouseX, mouseY);
  createCanvas(windowWidth, windowHeight);
  MnowPos = createVector(500, 500);
  Macc = createVector(2, -2);

}

function draw() {
  frameRate(30);
  //background
  background(random(10, 30), 10);

  //define variables
  col = {
    r: 10,
    g: 10,
    b: 10
  };
  spot = {
    x: 0,
    y: 0
  }

  colorA = map(mouseX, 0, windowWidth, (255, 0, 0), (100, 0, 0));
  colorB = map(mouseX, 0, windowWidth, (0, 255, 0), (0, 100, 0));
  colorC = map(mouseY, 0, windowHeight, (0, 255, 0), (0,100, 0));
  colorD = map(mouseY, 0, windowHeight, (0, 0, 255), (0, 0, 100));

  col.r = random(100, 255);
  col.g = random(0, 255);
  col.b = random(100, 255);
  spot.x = random(0, width);
  spot.y = random(0, height);

  var red = map(mouseX, 0, width, 100, 255);
  var green = map((mouseX - mouseY), 0, (width - height), 100, 100);
  var blue = map(mouseY, 0, height, 100, 255);

  var diffx = mouseX - x;
  var diffy = mouseY - y;

  strokeWeight (7);
  stroke(red, green, blue, 80);

  // copied this part from p5js.org page - mouse functions
  mouse.set(mouseX, mouseY)
  for (var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    var noiseRot = map(noise(particles[i].nowPos.x * .006, particles[i].nowPos.y * .006), .2, .8, 0, PI * 2);
    particles[i].acc.set(cos(noiseRot) * 3, sin(noiseRot) * 3);
  }
  if (particles.length < 500) {
    MnowPos.set(mouse);
    MnowPos.add(random(-10, 10), random(-10, 10));
    var mLoc = int(map(mouseX, 0, width, 0, 4));
    if (mLoc == 0) {
      particles[i] = new Particle(MnowPos, Macc, colorA);
    } else if (mLoc == 1) {
      particles[i] = new Particle(MnowPos, Macc, colorB);
    } else if (mLoc == 2) {
      particles[i] = new Particle(MnowPos, Macc, colorC);
    } else if (mLoc == 3) {
      particles[i] = new Particle(MnowPos, Macc, colorD);
    }
  }
  for (var j = 0; j < particles.length; j++) {
    if (particles[j].nowPos.x >= width - 10 || particles[j].nowPos.x <= 10 || particles[j].nowPos.y >= height - 10 || particles[j].nowPos.y <= 10 || particles[j].lifeCount <= 0) {
      particles.splice(j, 1);
      //println("kill : " + j);
    }
  }
}

function Particle(posN, accN, colorIn) {
  this.nowPos = createVector(posN.x, posN.y);
  this.acc = createVector(accN.x, accN.y);
  this.lifeCount = random(100, 400);
  this.colorN = colorIn;
}

Particle.prototype.update = function() {
  this.lifeCount--;
  this.nowPos.add(this.acc);
}

Particle.prototype.draw = function() {
  fill(this.colorN);
  ellipse(this.nowPos.x, this.nowPos.y, 2, 2);

  //random ellipses on w/ random colors, subjected to mouse position
  fill(col.r, col.g, col.b);
  ellipse(spot.x, spot.y, random(0, 30), random(0, 30));

}

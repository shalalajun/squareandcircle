function setup() {
  createCanvas(windowWidth,windowHeight);
  // put setup code here
}

function draw() {
  background(150);
  smooth();
  noStroke();
  ellipse(width/2,height/2,40,40);
  // put drawing code here
}

document.ontouchmove = function(event) {
    event.preventDefault();
};

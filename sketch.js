let balls = [];

function setup() {
  createCanvas(windowWidth, 400);
  for(i = 0; i < 20; i++){
    balls.push(new Ball(random(0,width), random(0,height/2), random(4,20)));
  }

}

function draw() {
  background(220);
  let gravity = createVector(0, 0.7);
  let wind = createVector(0.3,0);
  for( b of balls){
     b.applyForce(gravity);
     //b.applyForce(wind);
     b.ballUpdate();
  }
}

class Ball{

 constructor(x,y,r){

	 this.pos = createVector(x,y);
	 this.vel = createVector(random(-2,2),random(1,2));
	 this.acc = createVector(0,0);
   this.r = r;

   this.friction = 0.982;
 }

 applyForce(force){
 	this.acc.add(force);
 }

 ballEdge(){
 	 if(this.pos.x <= 0 + this.r){
    this.pos.x = this.r;
  	this.vel.x = this.vel.x * -0.9;
  }

   if(this.pos.x >= width - this.r){
    this.pos.x = width - this.r;
  	this.vel.x = this.vel.x * -0.9;
  }

   if(this.pos.y <= 0 + this.r){
    this.pos.y = this.r;
  	this.vel.y = this.vel.y * -0.9;
  }

   if(this.pos.y >= height - this.r){
    this.pos.y = height - this.r;
    this.vel.x = this.vel.x * this.friction;
  	this.vel.y = this.vel.y * -0.9;
  }

 }

 ballMove(){
   this.vel.add(this.acc);
   this.pos.add(this.vel);
   this.acc.set(0,0);
 }

 ballDraw(){
   ellipse(this.pos.x,this.pos.y,this.r*2, this.r*2);
 }

 ballUpdate(){
 		this.ballEdge();
    this.ballMove();
    this.ballDraw();
 }

}

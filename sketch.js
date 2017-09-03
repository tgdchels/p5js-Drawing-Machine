var diam = 12;
var fillAlpha;
var x = [];
var y = [];
var globalColor;
var globDiam = 50;
var paintGlobs = [];
//constructor function for the paint glob colors
var PaintGlob = function(xPos, yPos, diam, myFill, k) {
 	this.x = xPos;
  this.y = yPos;
  this.diam = diam;
  this.fill = myFill;
  this.k = k;
  this.display = function(){
    fill(this.fill);
    noStroke();
    ellipse(this.x,this.y,this.diam,this.diam);
  }
  //change global fill color when clicked which affects other mouse press function
  this.changeColor = function(){
  	if(dist(mouseX, mouseY, this.x, this.y) < this.diam /2){
      if(mouseIsPressed){
      	globalColor = this.fill;
      } 
    }
  }
}

var myPaint = [];
var gridTiles = [];
//constructor function for grid squares ("pixels")
var GridTile = function(xPos, yPos, diam){
	this.xPos = xPos;
  this.yPos = yPos;
  this.diam = diam;
  this.display = function(){   
    //change color of grid square to current global fill when clicked
    if(mouseX > this.xPos && mouseX < this.xPos + this.diam && mouseY > this.yPos && mouseY < this.yPos + this.diam){
    	if(mouseIsPressed){
      	fill(globalColor);
      }	
    }else{
      noFill(); 
    }
  	rect(this.xPos, this.yPos, this.diam, this.diam); 
  }
}

var myStroke = 240;

function setup() { 
  //sharpen edges
  pixelDensity(1);
  //reduce lag on grid square color changes
  frameRate(120);
  createCanvas(900, 900);
  globalColor = color(216, 97, 91);
  background(250);
  stroke(myStroke);
  strokeWeight(1);
  fill('rgb(r,g,b)');
  //create grid tiles and push into grid tile array
  //.. conditional value is set to fill current screen size
  for(var i = 0; i < 100; i++) {
    for(var j = 0; j < 100; j++){
      var x = i*12;
      var y = j*12;
      gridTiles.push(new GridTile(x, y, diam));
    }
  }
  //set paint glob colors
  //.. more can be added by adding colors to array
  //.. and then increasing k conditional value (currently 8)
  var paintFill = [color(216, 97, 91), color(219, 171, 105), 
                   color(229, 220, 98), color(140, 193, 116),
                   color(116, 190, 193), color(103, 130, 178),
                   color(130, 116, 193), color(187, 116, 193)];
  for(var k = 0; k < 8; k++){
    paintGlobs.push(new PaintGlob(100+(102 * k), height - globDiam - 20, globDiam+40, paintFill[k], k));
  }  
} 

function draw() { 
  myWidth = 10;
  myHeight = 10; 
  //set mouse position variables for tracking which grid tile to recolor
  xPos = map(mouseX,0, width, 200, 600);
  yPos = map(mouseY,0, height, 200, 600);
  //display grid tiles
	for(var i=0; i < gridTiles.length; i++){
		gridTiles[i].display();
	}
  //display paint globs
  for(var j=0; j < paintGlobs.length; j++){
   	paintGlobs[j].display();
    paintGlobs[j].changeColor();
  } 
	}


function keyPressed() {
    for(var i = 0; i < 100; i++) {
    for(var j = 0; j < 100; j++){
      var x = i*12;
      var y = j*12;
      gridTiles.push(new GridTile(x, y, diam));
    }
  }
    background(250);
  stroke(myStroke);
  strokeWeight(1);
}
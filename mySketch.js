// Draw the flat platform
let platformWidth;
let platformHeight = 10; // Adjust the height as needed
let platformX;
let platformY = -platformHeight; // Adjust the Y-coordinate as needed

// Cart Size
let cartWidth = 100;
let cartHeight = 50;
let cart;

let g = 9.81; //Gravity
let friction = 0.15; //Friction
let Force = 500; //External Force
const dt = 1e-3; // Time step
const frames = 100;


function setup() {
	// Setting up the canvas
	frameRate(60);
	pixelDensity(1);
	let canvas = createCanvas(windowWidth*0.98, windowHeight);
	canvas.parent('canvas-container');
	background(255);
	
	// the Platform
	platformWidth = width;
	platformX = -width/2;
	
	cart = new CartVerlet(0, 0, 100, 250, 50); //Create the cart
}


function draw() {
	setCartesianCoordinate(); //Set coordinate to cartesian
	
	for(let i=0; i<frames; i++){
		background(70);

		fill(255); // Color of the platform
		rect(platformX, platformY, platformWidth, platformHeight);

		// Exert external forces
		if (keyIsDown(LEFT_ARROW)) {
			cart.force = createVector(-Force,0);
		}

		if (keyIsDown(RIGHT_ARROW)) {
			cart.force = createVector(Force,0);
		}
		
		
		cart.update(); //Update and Show Cart
		cart.show();

		cart.force = createVector(0,0);
	}
}


function setCartesianCoordinate(){
	// Translate to the middle of the canvas
  translate(width / 2, height / 2);
  // Flip the y-axis
  scale(1, -1);
	//You can now use the Cartesian coordinate in P5
}
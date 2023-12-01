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
let Force = 5000; //External Force
const dt = 1e-3; // Time step
const frames = 100;

let score = 0;
let high_score = 0;


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
	
	//cart = new CartDoublePendulum(0, 0, 100, 250, 50); //Create the cart
	cart = new CartDoublePendulum(0, 0, 100, 50); //Create the cart
}


function draw() {
	setCartesianCoordinate(); //Set coordinate to cartesian
	
	for(let i=0; i<frames; i++){
		background(70);
		
		show_score(); //Display Player Score

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


function show_score(){
	push();
	// Display Score
  fill(255);
	scale(1, -1); //Rescale
  textSize(36);
  text(`Score: ${score.toFixed(1)}`, width / 2-220, -height / 2+80);

  // Display High Score
  textSize(24);
  text(`High Score: ${high_score.toFixed(1)}`, width / 2-220, -height / 2+130);
	pop();
}

function setCartesianCoordinate(){
	// Translate to the middle of the canvas
  translate(width / 2, height / 2);
  // Flip the y-axis
  scale(1, -1);
	//You can now use the Cartesian coordinate in P5
}
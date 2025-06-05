let sound, playBotton, pauseBottom, x, y, cx, cy, motionRate, ellipseSize; // declare variables for sound and images
let h = 360; // set the hue to 360
let s = 100; // set the saturation to 100
let b = 100; // set the brightness to 100

function preload() {
  sound = loadSound('libraries/bgm.mp3'); // Load the music file
  playBotton = loadImage('libraries/play_music.svg'); // Load the play button image
  pauseBottom = loadImage('libraries/pause_music.svg'); // Load the pause button image
}

function setup() {
  createCanvas(windowWidth, windowHeight); // window size canvas
  colorMode(HSB, 360, 100, 100); // set the color mode to HSB
  background("#170033"); // dark purple background  
  motionRate = 0.01; // set the motion rate
  ellipseSize = 50; // set the size of the ellipses
}

function draw() {
  drawBackground(); // Draw motioned background
  drawBottom(); // Set area of the bottom

  // set the position of the play/pause button
  x = width - 100
  y = height - 100;
  // Draw the play button if the sound is not playing
  if (!sound.isPlaying()) {
    image(playBotton, x, y, 50, 50);
  } else {
    image(pauseBottom, x, y, 50, 50);
  }
}

function drawBackground(){
  background("#170033"); // dark purple background
  fill(h, s, b); // set the fill color
  for (let i = 0; i < width + ellipseSize; i=i+50) { // draw ellipses x
    for (let j = 0; j < height + ellipseSize; j=j+50) { // draw ellipses y
      h = 180 + 180 * sin((frameCount + i + j) * motionRate);
      s = 100;
      b = 100;
      fill(h, s, b); // set the fill color
      ellipse(i, j, ellipseSize); // line of circles
    }
  }
}

function drawBottom(){
  noFill();
  noStroke();
  cx = (x + width) / 2;
  cy = (y + height) / 2;
  ellipse(cx, cy, 50, 50); // draw the bottom
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Play the sound when the ellispes are clicked
function mousePressed() {
  if (mouseX > x && mouseX < x + 50 && mouseY > y && mouseY < y + 50) {
    if (!sound.isPlaying()) {
      sound.play();
      motionRate = 0.02; // background motion faster
    } else {
      sound.pause();
      motionRate = 0.01; // background motion slower
    }
  }
}
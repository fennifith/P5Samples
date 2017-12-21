var dagger;
var capture;
var graphics;
var cRotationX = 0;
var cRotationY = 0;
var cRotationZ = 0;
var cTranslateX = 0;
var cTranslateY = 0;
var cTranslateZ = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  graphics = createGraphics(windowWidth, windowHeight, WEBGL);
  dagger = loadModel("dagger.obj", true);
  capture = createCapture({
    audio: false,
    video: {
      facingMode: "environment",
			width: windowWidth,
			height: windowHeight
    }
  });
  capture.size(windowWidth, windowHeight);
}

function draw() {
  graphics.resetMatrix();
  graphics.background(0, 0, 0, 0);
  background(200);
  image(capture, 0, 0, windowWidth, windowHeight);

	cTranslateX = ((accelerationX * 10) + (cTranslateX * 5) / 6;
	cTranslateY = ((accelerationY * 10) + (cTranslateY * 5) / 6;
	cTranslateZ = ((accelerationZ * 10) + (cTranslateZ * 5) / 6;
	if (windowWidth < 1000) {
		graphics.translate(cTranslateX + 75 - (windowWidth / 2), cTranslateY + 75 - (windowHeight / 2));
	} else graphics.translate(cTranslateX, cTranslateY);
	graphics.scale(cTranslateZ > 0 ? Math.min(3, 1 + (cTranslateZ / 10000)) : Math.max(1 - Math.abs(cTranslateZ / 50000), 0));

  if (rotationX > 0 || rotationY > 0 || rotationZ > 0) {
    cRotationX = (cRotationX - radians(rotationX)) / 2;
    cRotationY = (cRotationY - radians(rotationY)) / 2;
    cRotationZ = (cRotationZ - radians(rotationZ)) / 2;
  } else {
    cRotationX = (cRotationX + (Math.PI * -(mouseY / windowHeight))) / 2;
    cRotationZ = (cRotationZ + (Math.PI * (0.5 - (mouseX / windowWidth)))) / 2;
  }

	graphics.rotateX(cRotationX);
	graphics.rotateY(cRotationY);
	graphics.rotateZ(cRotationZ);

  graphics.pointLight(100, 100, 100, 0, windowHeight / 2, 0);
  graphics.ambientMaterial(50);
  graphics.model(dagger);

  image(graphics, 0, 0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graphics.resizeCanvas(windowWidth, windowHeight);
}

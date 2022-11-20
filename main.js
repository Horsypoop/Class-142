img="";
marioX="325";
marioY="325";
gameStatus = "";

function preload() {
	img = loadImage("mario.jpg");
	world_start = loadSound("world_start.wav");
}

function setup() {
	canvas = createCanvas(650,400);
	canvas.parent('canvas');	

	video = createCapture(VIDEO);
	video.size(600,300);
	video.parent('game_console');

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);

	instializeInSetup(mario);
}

function draw() {
	background("#D3D3D3")
	image(img, marioX, marioY, 40, 70);
	game();

	if(noseX < 300){
		marioX = marioX - 1;
	}
	if(noseX > 300){
		marioX = marioX + 1;
	}
	if(noseY < 150){
		marioY = marioY + 1;
	}
	image(img,marioX, marioY, 40,70);
}

function modelLoaded(){
	console.log('Model Loaded!');
}

function gotPoses(results){
	if(results.length >0){
		console.log(results);
		noseX = results[0].poseNet.x;
		noseY = results[0].poseNet.y;
	}
}


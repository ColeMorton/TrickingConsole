var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83,
	ONE: 49,
	TWO: 50,
	THREE: 51,
	FOUR: 52,
	FIVE: 53,
	SIX: 54,
	SEVEN: 55,
	EIGHT: 56,
	NINE: 57,
}

var GAMESPEED = 15;

var pingpong = {}
pingpong.pressedKeys = [];
pingpong.gameSpeed = GAMESPEED;

pingpong.ball = {
speed: 2,
x: 150,
y: 100,
directionX: 1,
directionY: 1
}

$(function(){

	// set interval to call gameloop every x milliseconds
	setGameSpeed();

	// mark down what key is down and up into an array called "pressedKeys"
	$(document).keydown(function(e){
		pingpong.pressedKeys[e.which] = true;
	});
	
	$(document).keyup(function(e){
		pingpong.pressedKeys[e.which] = false;
	});
});

function gameloop() {
 
	moveBall();
	movePaddles();
	setGameSpeed();
	outputKeyPressed();
}

function setGameSpeed() {

	if (pingpong.pressedKeys[KEY.ONE]) { // arrow-up
		pingpong.gameSpeed = 22;
	}
	
	if (pingpong.pressedKeys[KEY.NINE]) { // arrow-up
		pingpong.gameSpeed = 8;
	}

	pingpong.timer = setInterval(gameloop, pingpong.gameSpeed);
}

function outputKeyPressed() {
	if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
		var text = $("#textArea").val() + "UP|";		
		$("#textArea").val(text);
	}

	if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
		var text = $("#textArea").val() + "DOWN|";		
		$("#textArea").val(text);
	}

	if (pingpong.pressedKeys[KEY.W]) { // w
		var text = $("#textArea").val() + "W|";		
		$("#textArea").val(text);
	}

	if (pingpong.pressedKeys[KEY.S]) { // s
		var text = $("#textArea").val() + "S|";		
		$("#textArea").val(text);
	}
}

function movePaddles() {
	// use our custom timer to continuously check if a key is pressed.

	if (pingpong.pressedKeys[KEY.UP]) { // arrow-up

		// move the paddle B up 5 pixels
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top-3);
	}

	if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down

		// move the paddle B down 5 pixels
		var top = parseInt($("#paddleB").css("top"));
		$("#paddleB").css("top",top+3);
	}

	if (pingpong.pressedKeys[KEY.W]) { // w

		// move the paddle A up 5 pixels
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top-3);
	}

	if (pingpong.pressedKeys[KEY.S]) { // s

		// move the paddle A down 5 pixels
		var top = parseInt($("#paddleA").css("top"));
		$("#paddleA").css("top",top+3);
	}
}

function moveBall() {
// reference useful variables
var playgroundHeight = parseInt($("#playground").height());
var playgroundWidth = parseInt($("#playground").width());
var ball = pingpong.ball;
// check playground boundary
// check bottom edge
if (ball.y + ball.speed*ball.directionY > playgroundHeight)
{
ball.directionY = -1;
}
// check top edge
if (ball.y + ball.speed*ball.directionY < 0)
{
ball.directionY = 1;
}

// check right edge
if (ball.x +ball.speed*ball.directionX > playgroundWidth)
{
// player B lost.
// reset the ball;
ball.x = 250;
ball.y = 100;
$("#ball").css({
"left": ball.x,
"top" : ball.y
});
ball.directionX = -1;
}

// check left edge
if (ball.x + ball.speed*ball.directionX < 0)
{
	// player A lost.
	// reset the ball;
	ball.x = 150;
	ball.y = 100;
	$("#ball").css({"left": ball.x,"top" : ball.y});
	ball.directionX = 1;
}

// check left paddle
var paddleAX = parseInt($("#paddleA").css("left")) + parseInt($("#paddleA").css("width"));
var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
var paddleAYTop = parseInt($("#paddleA").css("top"));

if (ball.x + ball.speed*ball.directionX < paddleAX){
	if (ball.y + ball.speed*ball.directionY <= paddleAYBottom && ball.y + ball.speed*ball.directionY >= paddleAYTop) {
		ball.directionX = 1;
	}
}

// check right paddle
var paddleBX = parseInt($("#paddleB").css("left"));
var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
var paddleBYTop = parseInt($("#paddleB").css("top"));

if (ball.x + 20 + ball.speed*ball.directionX >= paddleBX) {
	if (ball.y + ball.speed*ball.directionY <= paddleBYBottom && ball.y + ball.speed*ball.directionY >= paddleBYTop) {
		ball.directionX = -1;
	}
}

ball.x += ball.speed * ball.directionX;
ball.y += ball.speed * ball.directionY;

// actually move the ball with speed and direction
$("#ball").css({"left" : ball.x,"top" : ball.y});
}
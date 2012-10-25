var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
}

var pingpong = {}
pingpong.pressedKeys = [];

pingpong.ball = {
speed: 2,
x: 150,
y: 100,
directionX: 1,
directionY: 1
}

$(function(){

	// set interval to call gameloop every 15 milliseconds
	pingpong.timer = setInterval(gameloop,15);

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
if (ball.x + ball.speed*ball.directionX > playgroundWidth)
{
ball.directionX = -1;
}
// check left edge
if (ball.x + ball.speed*ball.directionX < 0)
{
ball.directionX = 1;
}
ball.x += ball.speed * ball.directionX;
ball.y += ball.speed * ball.directionY;
// check moving paddle here, later.
// actually move the ball with speed and direction
$("#ball").css({
"left" : ball.x,
"top" : ball.y
});
}
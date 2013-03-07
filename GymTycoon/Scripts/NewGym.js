var locations = [
    { x: 10, y: 10, r: 10 },
    { x: 200, y: 200, r: 10 },
    { x: 300, y: 300, r: 300 },
    { x: 975, y: 550, r: 10 }];

var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;

var bgLoaded = false;
var bg = new Image();
bg.onload = function () {
    bgLoaded = true;
};
bg.src = 'Content/Images/worldmap.png';

var mouseX = 0;
var mouseY = 0;
var targetLocation = undefined;

function newGym() {
    if (!bgLoaded) {
        setTimeout('newGym()', 100);
        return;
    }
    
    drawBackgroundImage();
    drawLocations();
    addListeners();
}

function drawLocations() {
    for (var i = 0; i < locations.length; i++) {
        drawLocation(ctx, locations[i].x, locations[i].y, locations[i].r);
    }
}

function addListeners() {
    $("#game").mousedown(function (e) {
        mouseX = e.offsetX || 0;
        mouseY = e.offsetY || 0;
        getLocationSelected();
    });
    
    $(document).keydown(function (e) {
        keylogger.keydown(e);
    });
}

function drawBackgroundImage() {
    height = bg.height;
    width = bg.width;
    canvas.height = height;
    canvas.width = width;
    ctx.drawImage(bg, 0, 0, width, height);
}

function drawLocation(ctx, x, y, radius) {
    ctx.fillStyle = "rgba(200, 200, 100, .9)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

function getLocationSelected() {
    for (var i = 0; i < locations.length; i++) {
        var x = locations[i].x;
        var y = locations[i].y;
        var r = locations[i].r;

        if (Math.pow(mouseX - x, 2) + Math.pow(mouseY - y, 2) < Math.pow(r, 2)) {
            targetLocation = i;
            break;
        }
    }
}

newGym();
var Graphics = {};

var animations = Animations;
var layers = new Array();
var canvas = document.getElementById('bg');
var context = {};
var checkImagesLoaded = null;

Graphics.circleRadius = 10;
Graphics.thinLineThickness = 1;
Graphics.boldLineThickness = 5;
Graphics.lineStrokeStyle = "#cfc";
Graphics.imagesLoaded = false;

$(function () {
    "use strict";

    loadImages();
    checkImagesLoaded = setInterval(checkImagesLoaded, 1);

    // prepare layer 0 (bg)
    var canvasBg = document.getElementById("bg");
    layers[0] = canvasBg.getContext("2d");
    
    // prepare layer 1 (guide)
    var canvasGuide = document.getElementById("guide");
    layers[1] = canvasGuide.getContext("2d");
    
    // prepare layer 1 (game)
    context = canvas.getContext('2d');
    layers[2] = context;
    
    // prepare layer 3 (ui)
    var canvasUi = document.getElementById("ui");
    layers[3] = canvasUi.getContext("2d");
});

loadImages = function () {
    imageLoader.load("Images/guide_sprite.png");
    imageLoader.load("Images/board.png");
};

checkImagesLoaded = function () {
    if (imageLoader.loaded === true) {
        clearInterval(checkImagesLoaded);
        Graphics.imagesLoaded = true;
    }
};

clear = function (context) {
    "use strict";

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
};

Graphics.Circle = function (x, y) {
    "use strict";
    
    this.x = x;
    this.y = y;
};

Graphics.Line = function (startPoint, endPoint, thickness) {
    "use strict";
    
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness !== undefined ? thickness : Graphics.thinLineThickness;
};

Graphics.drawLine = function (x1, y1, x2, y2, thickness) {
    "use strict";
    
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = thickness;
    context.strokeStyle = Graphics.lineStrokeStyle;
    context.stroke();
};

Graphics.drawCircle = function (x, y) {
    "use strict";

    // prepare the radial gradients fill style
    var circleGradient = context.createRadialGradient(x - 3, y - 3, 1, x, y, Graphics.circleRadius);
    circleGradient.addColorStop(0, "#fff");
    circleGradient.addColorStop(1, "#cc0");
    context.fillStyle = circleGradient;

    // draw path
    context.beginPath();
    context.arc(x, y, Graphics.circleRadius, 0, Math.PI * 2, true);
    context.closePath();

    // actually fill the circle
    context.fill();
};

Graphics.drawText = function (progressPercentage) {
    "use strict";

    // draw the title text
    context.font = "26px 'WellFleet'";
    context.textAlign = "center";
    context.fillStyle = "#ffffff";

    // draw the level progress text
    context.textAlign = "left";
    context.textBaseline = "bottom";
    context.fillText("Puzzle " + progressPercentage + "%", 60, context.canvas.height - 80);
};

Graphics.drawBackgroundGradient = function () {
    "use strict";

    // draw gradients background
    var bgGradient = context.createLinearGradient(0, 0, 0, context.canvas.height);
    bgGradient.addColorStop(0, "#000000");
    bgGradient.addColorStop(1, "#555555");
    context.fillStyle = bgGradient;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
};

Graphics.drawLoadingBackgroundText = function () {
    "use strict";

    // draw the loading text
    context.font = "34px 'Rock Salt'";
    context.textAlign = "center";
    context.fillStyle = "#333333";
    context.fillText("loading...", context.canvas.width / 2, context.canvas.height / 2);
};

Graphics.drawBackgroundImage = function () {
    "use strict";

    var context = layers[0];
    clear(context);

    // load the background image
    Graphics.background = new Image();
    
    Graphics.background.onerror = function () {
        console.log("Error loading the image.");
    };
    
    // draw the image background
    Graphics.background.src = "Images/board.png";
    context.drawImage(Graphics.background, 0, 0);
};

Graphics.refresh = function (lines, circles, progressPercentage) {
    "use strict";

    // clear the canvas before re-drawing.
    clear(context);

    // draw background
    Graphics.drawBackgroundGradient();
    
    // draw the loading text
    Graphics.drawLoadingBackgroundText();
    
    // load the background image
    Graphics.drawBackgroundImage();

    // draw text
    Graphics.drawText(progressPercentage);

    // draw all remembered line
    $.each(lines, function (index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        Graphics.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(circles, function (index, circle) {
        Graphics.drawCircle(circle.x, circle.y);
    });
};

Graphics.lineIsBold = function (line) {
    "use strict";

    line.thickness = Graphics.boldLineThickness;
};

Graphics.drawGuide = function () {
    "use strict";
    
    // the dimension of each frame is 80x30.
    if (animations.guideReady) {
        var nextFrameX = animations.guideNextFrameX();
        var nextFrameY = animations.guideNextFrameY();
        context.drawImage(animations.guide, nextFrameX, nextFrameY, 80, 130, 325, 130, 80, 130);
    }
};
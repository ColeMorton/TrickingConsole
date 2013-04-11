var Graphics = {};

Graphics.Animations = Animations;
Graphics.circleRadius = 10;
Graphics.thinLineThickness = 1;
Graphics.boldLineThickness = 5;
Graphics.lineStrokeStyle = "#cfc";
Graphics.canvas = document.getElementById('game');

$(function () {
    "use strict";

    // get the reference of the canvas element and the drawing context.
    Graphics.ctx = Graphics.canvas.getContext('2d');
});

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

Graphics.clear = function () {
    "use strict";
    
    var ctx = Graphics.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

Graphics.drawLine = function (x1, y1, x2, y2, thickness) {
    "use strict";
    
    var ctx = Graphics.ctx;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = Graphics.lineStrokeStyle;
    ctx.stroke();
};

Graphics.drawCircle = function (x, y) {
    "use strict";

    // prepare the radial gradients fill style
    var ctx = Graphics.ctx;
    var circleGradient = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, Graphics.circleRadius);
    circleGradient.addColorStop(0, "#fff");
    circleGradient.addColorStop(1, "#cc0");
    ctx.fillStyle = circleGradient;

    // draw path
    ctx.beginPath();
    ctx.arc(x, y, Graphics.circleRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    // actually fill the circle
    ctx.fill();
};

Graphics.drawText = function (progressPercentage) {
    "use strict";

    // draw the title text
    var ctx = Graphics.ctx;
    ctx.font = "26px 'WellFleet'";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";

    // draw the level progress text
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText("Puzzle " + progressPercentage + "%", 60, ctx.canvas.height - 80);
};

Graphics.drawBackgroundGradient = function () {
    "use strict";

    // draw gradients background
    var ctx = Graphics.ctx;
    var bgGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    bgGradient.addColorStop(0, "#000000");
    bgGradient.addColorStop(1, "#555555");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

Graphics.drawLoadingBackgroundText = function () {
    "use strict";

    // draw the loading text
    var ctx = Graphics.ctx;
    ctx.font = "34px 'Rock Salt'";
    ctx.textAlign = "center";
    ctx.fillStyle = "#333333";
    ctx.fillText("loading...", ctx.canvas.width / 2, ctx.canvas.height / 2);
};

Graphics.LoadBackgroundImage = function () {
    "use strict";

    // load the background image
    var ctx = Graphics.ctx;
    Graphics.background = new Image();
    
    Graphics.background.onerror = function () {
        console.log("Error loading the image.");
    };
    
    // draw the image background
    Graphics.background.src = "Images/board.png";
    ctx.drawImage(Graphics.background, 0, 0);
};

Graphics.refresh = function (lines, circles, progressPercentage) {
    "use strict";

    // clear the canvas before re-drawing.
    Graphics.clear();

    // draw background
    Graphics.drawBackgroundGradient();
    
    // draw the loading text
    Graphics.drawLoadingBackgroundText();
    
    // load the background image
    Graphics.LoadBackgroundImage();

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
    
    // the demension of each frame is 80x30.
    if (Graphics.Animations.guideReady) {
        var nextFrameX = Graphics.Animations.guideFrame * 80;
        Graphics.ctx.drawImage(Graphics.Animations.guide, nextFrameX, 0, 80, 130, 325, 130, 80, 130);
    }
};

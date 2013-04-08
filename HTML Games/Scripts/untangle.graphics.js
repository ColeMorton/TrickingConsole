var UntangleGraphics = {};

UntangleGraphics.circleRadius = 10;
UntangleGraphics.thinLineThickness = 1;
UntangleGraphics.boldLineThickness = 5;
UntangleGraphics.lineStrokeStyle = "#cfc";
UntangleGraphics.canvas = document.getElementById('game');

$(function () {
    "use strict";

    // get the reference of the canvas element and the drawing context.
    UntangleGraphics.ctx = UntangleGraphics.canvas.getContext('2d');
});

UntangleGraphics.Circle = function (x, y) {
    "use strict";
    
    this.x = x;
    this.y = y;
};

UntangleGraphics.Line = function (startPoint, endPoint, thickness) {
    "use strict";
    
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness !== undefined ? thickness : UntangleGraphics.thinLineThickness;
};

UntangleGraphics.clear = function () {
    "use strict";
    
    var ctx = UntangleGraphics.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

UntangleGraphics.drawLine = function (x1, y1, x2, y2, thickness) {
    "use strict";
    
    var ctx = UntangleGraphics.ctx;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = UntangleGraphics.lineStrokeStyle;
    ctx.stroke();
};

UntangleGraphics.drawCircle = function (x, y) {
    "use strict";

    // prepare the radial gradients fill style
    var ctx = UntangleGraphics.ctx;
    var circleGradient = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, UntangleGraphics.circleRadius);
    circleGradient.addColorStop(0, "#fff");
    circleGradient.addColorStop(1, "#cc0");
    ctx.fillStyle = circleGradient;

    // draw path
    ctx.beginPath();
    ctx.arc(x, y, UntangleGraphics.circleRadius, 0, Math.PI * 2, true);
    ctx.closePath();

    // actually fill the circle
    ctx.fill();
};

UntangleGraphics.drawText = function (progressPercentage) {
    "use strict";

    // draw the title text
    var ctx = UntangleGraphics.ctx;
    ctx.font = "26px 'WellFleet'";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Untangle Game", ctx.canvas.width / 2, 50);

    // draw the level progress text
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText("Puzzle " + progressPercentage + "%", 20, ctx.canvas.height - 5);
};

UntangleGraphics.drawBackgroundGradient = function () {
    "use strict";

    // draw gradients background
    var ctx = UntangleGraphics.ctx;
    var bgGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    bgGradient.addColorStop(0, "#000000");
    bgGradient.addColorStop(1, "#555555");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

UntangleGraphics.refresh = function (lines, circles, progressPercentage) {
    "use strict";

    // clear the canvas before re-drawing.
    UntangleGraphics.clear();

    // draw background
    UntangleGraphics.drawBackgroundGradient();

    // draw text
    UntangleGraphics.drawText(progressPercentage);

    // draw all remembered line
    $.each(lines, function (index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        UntangleGraphics.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(circles, function (index, circle) {
        UntangleGraphics.drawCircle(circle.x, circle.y);
    });
};

UntangleGraphics.lineIsBold = function (line) {
    "use strict";

    line.thickness = UntangleGraphics.boldLineThickness;
};

var UntangleGraphics = {};

UntangleGraphics.circleRadius = 10;
UntangleGraphics.thinLineThickness = 1;
UntangleGraphics.boldLineThickness = 5;
UntangleGraphics.lineStrokeStyle = "#cfc";
UntangleGraphics.canvas = null;
UntangleGraphics.ctx = null;

$(function () {
    "use strict";

    // get the reference of the canvas element and the drawing context.
    UntangleGraphics.canvas = document.getElementById('game');
    UntangleGraphics.ctx = canvas.getContext('2d');
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
    this.thickness = thickness !== undefined ? thickness : this.thinLineThickness;
};

UntangleGraphics.clear = function () {
    "use strict";
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

UntangleGraphics.drawLine = function (x1, y1, x2, y2, thickness) {
    "use strict";
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.lineWidth = thickness;
    this.ctx.strokeStyle = this.lineStrokeStyle;
    this.ctx.stroke();
};

UntangleGraphics.drawCircle = function (x, y) {
    "use strict";

    // prepare the radial gradients fill style
    var circleGradient = this.ctx.createRadialGradient(x - 3, y - 3, 1, x, y, this.circleRadius);
    circleGradient.addColorStop(0, "#fff");
    circleGradient.addColorStop(1, "#cc0");
    this.ctx.fillStyle = circleGradient;

    // draw path
    this.ctx.beginPath();
    this.ctx.arc(x, y, this.circleRadius, 0, Math.PI * 2, true);
    this.ctx.closePath();

    // actually fill the circle
    this.ctx.fill();
};

UntangleGraphics.drawText = function (progressPercentage) {
    "use strict";

    // draw the title text
    this.ctx.font = "26px 'WellFleet'";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillText("Untangle Game", this.ctx.canvas.width / 2, 50);

    // draw the level progress text
    this.ctx.textAlign = "left";
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText("Puzzle " + progressPercentage + "%", 20, this.ctx.canvas.height - 5);
};

UntangleGraphics.drawBackgroundGradient = function () {
    "use strict";

    // draw gradients background
    var bgGradient = this.ctx.createLinearGradient(0, 0, 0, this.ctx.canvas.height);
    bgGradient.addColorStop(0, "#000000");
    bgGradient.addColorStop(1, "#555555");
    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
};

UntangleGraphics.refresh = function (lines, circles, progressPercentage) {
    "use strict";

    // clear the canvas before re-drawing.
    this.clear();

    // draw background
    this.drawBackgroundGradient();

    // draw text
    this.drawText(progressPercentage);

    // draw all remembered line
    $.each(lines, function (index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        this.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(circles, function (index, circle) {
        this.drawCircle(circle.x, circle.y);
    });
};

UntangleGraphics.lineIsBold = function(line) {
    line.thickness = this.boldLineThickness;
};

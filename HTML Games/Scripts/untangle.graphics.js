var UntangleGraphics = {};

UntangleGraphics.circleRadius = 10;
UntangleGraphics.thinLineThickness = 1;
UntangleGraphics.boldLineThickness = 5;
UntangleGraphics.lineStrokeStyle = "#cfc";

UntangleGraphics.init = function (canvas) {
    "use strict";
    this.context = canvas.getContext('2d');
};

UntangleGraphics.clear = function () {
    "use strict";
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
};

UntangleGraphics.drawLine = function (x1, y1, x2, y2, thickness) {
    "use strict";
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineWidth = thickness;
    this.context.strokeStyle = this.lineStrokeStyle;
    this.context.stroke();
};

UntangleGraphics.drawCircle = function (x, y) {
    "use strict";

    // prepare the radial gradients fill style
    var circleGradient = this.context.createRadialGradient(x - 3, y - 3, 1, x, y, UntangleGraphics.circleRadius);
    circleGradient.addColorStop(0, "#fff");
    circleGradient.addColorStop(1, "#cc0");
    this.context.fillStyle = circleGradient;

    // draw path
    this.context.beginPath();
    this.context.arc(x, y, UntangleGraphics.circleRadius, 0, Math.PI * 2, true);
    this.context.closePath();

    // actually fill the circle
    this.context.fill();
};

UntangleGraphics.drawText = function (progressPercentage) {
    "use strict";

    // draw the title text
    this.context.font = "26px 'WellFleet'";
    this.context.textAlign = "center";
    this.context.fillStyle = "#ffffff";
    this.context.fillText("Untangle Game", this.context.canvas.width / 2, 50);

    // draw the level progress text
    this.context.textAlign = "left";
    this.context.textBaseline = "bottom";
    this.context.fillText("Puzzle " + progressPercentage + "%", 20, this.context.canvas.height - 5);
};

UntangleGraphics.drawBackgroundGradient = function () {
    "use strict";

    // draw gradients background
    var bgGradient = this.context.createLinearGradient(0, 0, 0, this.context.canvas.height);
    bgGradient.addColorStop(0, "#000000");
    bgGradient.addColorStop(1, "#555555");
    this.context.fillStyle = bgGradient;
    this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
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
        UntangleGraphics.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(circles, function (index, circle) {
        UntangleGraphics.drawCircle(circle.x, circle.y);
    });
};

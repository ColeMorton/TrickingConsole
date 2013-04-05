function Circle(x, y) {
    "use strict";
    
    this.x = x;
    this.y = y;
}

function Line(startPoint, endPoint, thickness) {
    "use strict";
    
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness !== undefined ? thickness : untangleGame.thinLineThickness;
}

var untangleGame = {
    levels: UntangleLevels,
    circles: [],
    circleRadius: 10,
    thinLineThickness: 1,
    boldLineThickness: 5,
    lines: [],
    currentLevel: 0,
    progressPercentage: 0
};

function drawLine(ctx, x1, y1, x2, y2, thickness) {
    "use strict";
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = "#cfc";
    ctx.stroke();
}

function drawCircle(ctx, x, y) {
    "use strict";
    
    // prepare the radial gradients fill style
    var circleGradient = ctx.createRadialGradient(x - 3, y - 3, 1, x, y, untangleGame.circleRadius);
    circleGradient.addColorStop(0, "#fff");
    circleGradient.addColorStop(1, "#cc0");
    ctx.fillStyle = circleGradient;
    
    // draw path
    ctx.beginPath();
    ctx.arc(x, y, untangleGame.circleRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    
    // actually fill the circle
    ctx.fill();
}

function clear(ctx) {
    "use strict";
    
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function setupCurrentLevel() {
    "use strict";
    
    untangleGame.circles = [];
    var level = untangleGame.levels[untangleGame.currentLevel];

    $.each(level.circles, function(index, circle) {
        untangleGame.circles.push(new Circle(circle.x, circle.y, 10));
    });

    // setup line data after setup the circles.
    connectCircles();
    updateLineIntersection();
}

function connectCircles() {
    "use strict";
     
    // setup all lines based on the circles relationship
    var level = untangleGame.levels[untangleGame.currentLevel];
    untangleGame.lines.length = 0;
    
    $.each(level.relationships, function (i) {
        var connectedPoints = level.relationships[i].connectedPoints;
        var startPoint = untangleGame.circles[i];

        $.each(connectedPoints, function(j) {
            var endPoint = untangleGame.circles[connectedPoints[j]];
            untangleGame.lines.push(new Line(startPoint, endPoint));
        });
    });
}

function updateLevelProgress() {
    "use strict";
    
    // check the untangle progress of the level
    var progress = 0;
    $.each(untangleGame.lines, function(index, line) {
        if (line.thickness === untangleGame.thinLineThickness) {
            progress++;
        }
    });
    
    untangleGame.progressPercentage = Math.floor(progress / untangleGame.lines.length * 100);
    $("#progress").html(untangleGame.progressPercentage);
    $('#progressBar').css('width', untangleGame.progressPercentage + '%');

    // display the current level
    $("#level").html(untangleGame.currentLevel);
}

var canvas = document.getElementById('game');

function gameloop() {
    "use strict";
    
    // get the reference of the canvas element and the drawing context.
    var ctx = canvas.getContext('2d');

    // clear the canvas before re-drawing.
    clear(ctx);
    
    // draw background
    drawBackgroundGradient(ctx, "#000000", "#555555");

    // draw text
    drawText(ctx);

    // draw all remembered line
    $.each(untangleGame.lines, function(index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        drawLine(ctx, startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(untangleGame.circles, function (index, circle) {
        drawCircle(ctx, circle.x, circle.y);
    });
}

function drawText(ctx) {
    "use strict";
    
    // draw the title text
    ctx.font = "26px 'WellFleet'";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Untangle Game", ctx.canvas.width / 2, 50);

    // draw the level progress text
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.fillText("Puzzle " + untangleGame.progressPercentage + "%", 20, ctx.canvas.height - 5);
}

function drawBackgroundGradient(ctx, colorStop1, colorStop2) {
    "use strict";
    
    // draw gradients background
    var bgGradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
    bgGradient.addColorStop(0, colorStop1);
    bgGradient.addColorStop(1, colorStop2);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

$(function () {
    "use strict";
    
    setupCurrentLevel();
    connectCircles();
    updateLineIntersection();
    
    // get the reference of the canvas element and the drawing context.
    var canvas = document.getElementById('game');
    var ctx = canvas.getContext('2d');

    // clear the canvas before re-drawing.
    clear(ctx);
    
    // draw a splash screen when loading the game background
    drawBackgroundGradient(ctx, "#cccccc", "#efefef");

    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle
    // and set that circle as target dragging circle.
    $("#game").mousedown(function (e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        $.each(untangleGame.circles, function(index, circle) {
            if (Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2) < Math.pow(untangleGame.circleRadius, 2)) {
                untangleGame.targetCircle = index;
                return;
            }
        });
    });

    // we move the target dragging circle when the mouse is moving
    $("#game").mousemove(function (e) {
        if (untangleGame.targetCircle !== undefined) {
            var mouseX = e.offsetX || 0;
            var mouseY = e.offsetY || 0;
            untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, untangleGame.circleRadius);
        }
        connectCircles();
        updateLineIntersection();
        updateLevelProgress();
    });

    // We clear the dragging circle data when mouse is up
    $("#game").mouseup(function () {
        untangleGame.targetCircle = undefined;
        
        // on every mouse up, check if the untangle puzzle is solved.
        checkLevelCompleteness();
    });

    //setup an interval to loop the game loop
    setInterval(gameloop, 30);
});

function isIntersect(line1, line2) {
    "use strict";

    // convert line1 to general form of line: Ax+By = C
    var a1 = line1.endPoint.y - line1.startPoint.y;
    var b1 = line1.startPoint.x - line1.endPoint.x;
    var c1 = a1 * line1.startPoint.x + b1 * line1.startPoint.y;
    
    // convert line2 to general form of line: Ax+By = C
    var a2 = line2.endPoint.y - line2.startPoint.y;
    var b2 = line2.startPoint.x - line2.endPoint.x;
    var c2 = a2 * line2.startPoint.x + b2 * line2.startPoint.y;
    
    // calcualte the intersection point
    var d = a1 * b2 - a2 * b1;
    
    // parallel when d is 0
    if (d === 0) {
        return false;
    } else {
        var x = (b2*c1 - b1*c2) / d;
        var y = (a1 * c2 - a2 * c1) / d;
        
        // check if intersection line is on both line segments
        if ((isInBetween(line1.startPoint.x, x, line1.endPoint.x) ||
                isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
            (isInBetween(line2.startPoint.x, x, line2.endPoint.x) ||
                isInBetween(line2.startPoint.y, y, line2.endPoint.y))) {
            return true;
        }
        return false;
    }
}

// return true if b is between a and c,
// we exclude the result when a==b or b==c
function isInBetween(a, b, c) {
    "use strict";
    
    // return false if b is almost equal to a or c
    // this is to eliminate some floating point when
    // tow value is equal to but different with 0.00000...0001
    if (Math.abs(a - b) < 0.000001 || Math.abs(b - c) < 0.000001) {
        return false;
    }

    //true when b is in between a and c
    return (a < b && b < c) || (c < b && b < a);
}

function updateLineIntersection() {
    "use strict";
    
    // checking lines intersection and bold those lines.
    $.each(untangleGame.lines, function (index) {
        for (var j = 0; j < index; j++) {
            var line1 = untangleGame.lines[index];
            var line2 = untangleGame.lines[j];

            // we check if two lines are intersected,
            // and bold the line if they are.
            if (isIntersect(line1, line2)) {
                line1.thickness = untangleGame.boldLineThickness;
                line2.thickness = untangleGame.boldLineThickness;
            }
        }
    });
}

function checkLevelCompleteness() {
    "use strict";
    
    if (untangleGame.progressPercentage === 100) {
        if (untangleGame.currentLevel + 1 < untangleGame.levels.length) {
            untangleGame.currentLevel++;
        }
        setupCurrentLevel();
    }
}
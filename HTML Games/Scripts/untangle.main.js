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
    logic: UntangleLogic,
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
    untangleGame.logic.updateLineIntersection(untangleGame.lines);
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
    untangleGame.logic.updateLineIntersection(untangleGame.lines);
    
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
        untangleGame.logic.updateLineIntersection(untangleGame.lines);
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

function checkLevelCompleteness() {
    "use strict";
    
    if (untangleGame.progressPercentage === 100) {
        if (untangleGame.currentLevel + 1 < untangleGame.levels.length) {
            untangleGame.currentLevel++;
        }
        setupCurrentLevel();
    }
}
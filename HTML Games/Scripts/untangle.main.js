function Circle(x, y) {
    "use strict";
    
    this.x = x;
    this.y = y;
}

function Line(startPoint, endPoint, thickness) {
    "use strict";
    
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.thickness = thickness !== undefined ? thickness : UntangleGraphics.thinLineThickness;
}

var untangleGame = {
    levels: UntangleLevels,
    graphics: UntangleGraphics,
    logic: UntangleLogic,
    circles: [],
    lines: [],
    currentLevel: 0,
    progressPercentage: 0
};

function setupCurrentLevel() {
    "use strict";
    
    untangleGame.circles = [];
    var level = untangleGame.levels[untangleGame.currentLevel];

    $.each(level.circles, function(index, circle) {
        untangleGame.circles.push(new untangleGame.graphics.Circle(circle.x, circle.y, 10));
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
        if (line.thickness === UntangleGraphics.thinLineThickness) {
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

    // clear the canvas before re-drawing.
    untangleGame.graphics.clear();
    
    // draw background
    untangleGame.graphics.drawBackgroundGradient();

    // draw text
    untangleGame.graphics.drawText(untangleGame.progressPercentage);

    // draw all remembered line
    $.each(untangleGame.lines, function(index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        untangleGame.graphics.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(untangleGame.circles, function (index, circle) {
        untangleGame.graphics.drawCircle(circle.x, circle.y);
    });
}

$(function () {
    "use strict";
    
    setupCurrentLevel();
    connectCircles();
    untangleGame.logic.updateLineIntersection(untangleGame.lines);
    
    // clear the canvas before re-drawing.
    untangleGame.graphics.clear();
    
    // draw a splash screen when loading the game background
    untangleGame.graphics.drawBackgroundGradient();

    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle
    // and set that circle as target dragging circle.
    $("#game").mousedown(function (e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        $.each(untangleGame.circles, function(index, circle) {
            if (Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2) < Math.pow(untangleGame.graphics.circleRadius, 2)) {
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
            untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, untangleGame.graphics.circleRadius);
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
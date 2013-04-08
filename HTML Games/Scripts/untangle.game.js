var UntangleGame = {};

UntangleGame.levels = UntangleLevels;
UntangleGame.graphics = UntangleGraphics;
UntangleGame.logic = UntangleLogic;
UntangleGame.circles = [];
UntangleGame.lines = [];
UntangleGame.currentLevel = 0;
UntangleGame.progressPercentage = 0;

function setupCurrentLevel() {
    "use strict";
    
    UntangleGame.circles = [];
    var level = UntangleGame.levels[UntangleGame.currentLevel];

    $.each(level.circles, function(index, circle) {
        UntangleGame.circles.push(new UntangleGame.graphics.Circle(circle.x, circle.y, 10));
    });

    // setup line data after setup the circles.
    connectCircles();
    UntangleGame.logic.updateLineIntersection(UntangleGame.lines);
}

function connectCircles() {
    "use strict";
     
    // setup all lines based on the circles relationship
    var level = UntangleGame.levels[UntangleGame.currentLevel];
    UntangleGame.lines.length = 0;
    
    $.each(level.relationships, function (i) {
        var connectedPoints = level.relationships[i].connectedPoints;
        var startPoint = UntangleGame.circles[i];

        $.each(connectedPoints, function(j) {
            var endPoint = UntangleGame.circles[connectedPoints[j]];
            UntangleGame.lines.push(new UntangleGame.graphics.Line(startPoint, endPoint));
        });
    });
}

function updateLevelProgress() {
    "use strict";
    
    // check the untangle progress of the level
    var progress = 0;
    $.each(UntangleGame.lines, function(index, line) {
        if (line.thickness === UntangleGraphics.thinLineThickness) {
            progress++;
        }
    });
    
    UntangleGame.progressPercentage = Math.floor(progress / UntangleGame.lines.length * 100);
    $("#progress").html(UntangleGame.progressPercentage);
    $('#progressBar').css('width', UntangleGame.progressPercentage + '%');

    // display the current level
    $("#level").html(UntangleGame.currentLevel);
}

function gameloop() {
    "use strict";

    // clear the canvas before re-drawing.
    UntangleGame.graphics.clear();
    
    // draw background
    UntangleGame.graphics.drawBackgroundGradient();

    // draw text
    UntangleGame.graphics.drawText(UntangleGame.progressPercentage);

    // draw all remembered line
    $.each(UntangleGame.lines, function(index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        UntangleGame.graphics.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(UntangleGame.circles, function (index, circle) {
        UntangleGame.graphics.drawCircle(circle.x, circle.y);
    });
}

$(function () {
    "use strict";
    
    setupCurrentLevel();
    connectCircles();
    UntangleGame.logic.updateLineIntersection(UntangleGame.lines);
    
    // clear the canvas before re-drawing.
    UntangleGame.graphics.clear();
    
    // draw a splash screen when loading the game background
    UntangleGame.graphics.drawBackgroundGradient();

    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle
    // and set that circle as target dragging circle.
    $("#game").mousedown(function (e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        $.each(UntangleGame.circles, function(index, circle) {
            if (Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2) < Math.pow(UntangleGame.graphics.circleRadius, 2)) {
                UntangleGame.targetCircle = index;
                return;
            }
        });
    });

    // we move the target dragging circle when the mouse is moving
    $("#game").mousemove(function (e) {
        if (UntangleGame.targetCircle !== undefined) {
            var mouseX = e.offsetX || 0;
            var mouseY = e.offsetY || 0;
            UntangleGame.circles[UntangleGame.targetCircle] = new UntangleGame.graphics.Circle(mouseX, mouseY, UntangleGame.graphics.circleRadius);
        }
        connectCircles();
        UntangleGame.logic.updateLineIntersection(UntangleGame.lines);
        updateLevelProgress();
    });

    // We clear the dragging circle data when mouse is up
    $("#game").mouseup(function () {
        UntangleGame.targetCircle = undefined;
        
        // on every mouse up, check if the untangle puzzle is solved.
        checkLevelCompleteness();
    });

    //setup an interval to loop the game loop
    setInterval(gameloop, 30);
});

function checkLevelCompleteness() {
    "use strict";
    
    if (UntangleGame.progressPercentage === 100) {
        if (UntangleGame.currentLevel + 1 < UntangleGame.levels.length) {
            UntangleGame.currentLevel++;
        }
        setupCurrentLevel();
    }
}
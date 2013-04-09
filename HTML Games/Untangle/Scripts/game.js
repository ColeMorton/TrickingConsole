var UntangleGame = {};

UntangleGame.Levels = Levels;
UntangleGame.Graphics = Graphics;
UntangleGame.Logic = Logic;
UntangleGame.circles = [];
UntangleGame.lines = [];
UntangleGame.currentLevel = 0;
UntangleGame.progressPercentage = 0;

$(function () {
    "use strict";

    UntangleGame.SetupCurrentLevel();
    //UntangleGame.ConnectCircles();
    UntangleGame.Logic.UpdateLineIntersection(UntangleGame.lines);

    // clear the canvas before re-drawing.
    UntangleGame.Graphics.clear();

    // draw a splash screen when loading the game background
    UntangleGame.Graphics.drawBackgroundGradient();

    //setup an interval to loop the game loop
    setInterval(UntangleGame.GameLoop, 30);
});

UntangleGame.SetupCurrentLevel = function() {
    "use strict";

    UntangleGame.circles = [];
    var level = UntangleGame.Levels[UntangleGame.currentLevel];

    $.each(level.circles, function (index, circle) {
        UntangleGame.circles.push(new UntangleGame.Graphics.Circle(circle.x, circle.y, 10));
    });

    // setup line data after setup the circles.
    UntangleGame.ConnectCircles();
    UntangleGame.Logic.UpdateLineIntersection(UntangleGame.lines);
};

UntangleGame.ConnectCircles = function() {
    "use strict";

    // setup all lines based on the circles relationship
    var level = UntangleGame.Levels[UntangleGame.currentLevel];
    UntangleGame.lines.length = 0;

    $.each(level.relationships, function (i) {
        var connectedPoints = level.relationships[i].connectedPoints;
        var startPoint = UntangleGame.circles[i];

        $.each(connectedPoints, function (j) {
            var endPoint = UntangleGame.circles[connectedPoints[j]];
            UntangleGame.lines.push(new UntangleGame.Graphics.Line(startPoint, endPoint));
        });
    });
};

UntangleGame.UpdateLevelProgress = function() {
    "use strict";

    // check the untangle progress of the level
    var progress = 0;
    $.each(UntangleGame.lines, function (index, line) {
        if (line.thickness === UntangleGame.Graphics.thinLineThickness) {
            progress++;
        }
    });

    UntangleGame.progressPercentage = Math.floor(progress / UntangleGame.lines.length * 100);
    $("#progress").html(UntangleGame.progressPercentage);
    $('#progressBar').css('width', UntangleGame.progressPercentage + '%');

    // display the current level
    $("#level").html(UntangleGame.currentLevel);
};

UntangleGame.GameLoop = function() {
    "use strict";

    // clear the canvas before re-drawing.
    UntangleGame.Graphics.clear();

    // draw background
    UntangleGame.Graphics.drawBackgroundGradient();

    // draw text
    UntangleGame.Graphics.drawText(UntangleGame.progressPercentage);

    // draw all remembered line
    $.each(UntangleGame.lines, function (index, line) {
        var startPoint = line.startPoint;
        var endPoint = line.endPoint;
        var thickness = line.thickness;
        UntangleGame.Graphics.drawLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y, thickness);
    });

    // draw all remembered circles
    $.each(UntangleGame.circles, function (index, circle) {
        UntangleGame.Graphics.drawCircle(circle.x, circle.y);
    });
};

UntangleGame.CheckLevelCompleteness = function() {
    "use strict";

    if (UntangleGame.progressPercentage === 100) {
        if (UntangleGame.currentLevel + 1 < UntangleGame.Levels.length) {
            UntangleGame.currentLevel++;
        }
        UntangleGame.SetupCurrentLevel();
    }
};
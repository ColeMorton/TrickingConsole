var Events = {};

Events.UntangleGame = UntangleGame;
Events.Graphics = Graphics;
Events.Logic = Logic;

$(function () {
    "use strict";
    
    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle
    // and set that circle as target dragging circle.
    $("#game").mousedown(function (e) {
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        $.each(Events.UntangleGame.circles, function (index, circle) {
            if (Math.pow(mouseX - circle.x, 2) + Math.pow(mouseY - circle.y, 2) < Math.pow(Events.Graphics.circleRadius, 2)) {
                Events.UntangleGame.targetCircle = index;
                return;
            }
        });
    });

    // we move the target dragging circle when the mouse is moving
    $("#game").mousemove(function (e) {
        if (Events.UntangleGame.targetCircle !== undefined) {
            var mouseX = e.offsetX || 0;
            var mouseY = e.offsetY || 0;
            Events.UntangleGame.circles[UntangleGame.targetCircle] = new Events.Graphics.Circle(mouseX, mouseY, Events.Graphics.circleRadius);
        }
        Events.UntangleGame.ConnectCircles();
        Events.Logic.UpdateLineIntersection(Events.UntangleGame.lines);
        Events.UntangleGame.UpdateLevelProgress();
    });

    // We clear the dragging circle data when mouse is up
    $("#game").mouseup(function () {
        Events.UntangleGame.targetCircle = undefined;

        // on every mouse up, check if the untangle puzzle is solved.
        Events.UntangleGame.CheckLevelCompleteness();
    });
});
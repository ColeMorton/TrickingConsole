$(function () {
    
    $("#xCoordinate").val("Test!");

    // Add Mouse Event Listener to canvas
    // we find if the mouse down position is on any circle
    // and set that circle as target dragging circle.
    $("#worldMapCanvas").mousedown(function (e) {
        var canvasPosition = $(this).offset();
        var mouseX = e.offsetX || 0;
        var mouseY = e.offsetY || 0;

        //for (var i = 0; i < untangleGame.circles.length; i++) {
        //    var circleX = untangleGame.circles[i].x;
        //    var circleY = untangleGame.circles[i].y;
        //    var radius = untangleGame.circles[i].radius;

        //    if (Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2) < Math.pow(radius, 2)) {
        //        untangleGame.targetCircle = i;
        //        break;
        //    }
        //}
    });
    
    // we move the target dragging circle when the mouse is moving
    $("#worldMapCanvas").mousemove(function (e) {

        

        //if (untangleGame.targetCircle != undefined) {
        //    var canvasPosition = $(this).offset();
        //    var mouseX = e.offsetX || 0;
        //    var mouseY = e.offsetY || 0;
        //    var radius = untangleGame.circles[untangleGame.targetCircle].radius;
        //    untangleGame.circles[untangleGame.targetCircle] = new Circle(mouseX, mouseY, radius);
        //}
        //connectCircles();
    });

    // We clear the dragging circle data when mouse is up
    $("#worldMapCanvas").mouseup(function (e) {
        //untangleGame.targetCircle = undefined;
    });

})
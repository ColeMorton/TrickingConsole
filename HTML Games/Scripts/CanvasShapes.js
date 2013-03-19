﻿function writeMessage(messageLayer, message) {
    var context = messageLayer.getContext();
    messageLayer.clear();
    context.font = '18pt Calibri';
    context.fillStyle = 'black';
    context.fillText(message, 10, 25);
}
var stage = new Kinetic.Stage({
    container: 'container',
    width: 578,
    height: 200
});

var shapesLayer = new Kinetic.Layer();
var messageLayer = new Kinetic.Layer();

var triangle = new Kinetic.RegularPolygon({
    x: 190,
    y: 120,
    sides: 3,
    radius: 80,
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4
});

triangle.on('mouseout', function () {
    writeMessage(messageLayer, 'Mouseout triangle');
});

triangle.on('mousemove', function () {
    var mousePos = stage.getMousePosition();
    var x = mousePos.x - 190;
    var y = mousePos.y - 40;
    writeMessage(messageLayer, 'x: ' + x + ', y: ' + y);
});

shapesLayer.add(triangle);

var circle = new Kinetic.Circle({
    x: 380,
    y: stage.getHeight() / 2,
    radius: 70,
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4
});

circle.on('mouseover', function () {
    writeMessage(messageLayer, 'Mouseover circle');
});
circle.on('mouseout', function () {
    writeMessage(messageLayer, 'Mouseout circle');
});
circle.on('mousedown', function () {
    writeMessage(messageLayer, 'Mousedown circle');
});
circle.on('mouseup', function () {
    writeMessage(messageLayer, 'Mouseup circle');
});

shapesLayer.add(circle);
stage.add(shapesLayer);
stage.add(messageLayer);
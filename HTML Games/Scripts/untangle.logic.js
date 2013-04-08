UntangleLogic = {};

UntangleLogic.graphics = UntangleGraphics;
UntangleLogic.boldLineThickness = 5;

UntangleLogic.isIntersect = function (line1, line2) {
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
        var x = (b2 * c1 - b1 * c2) / d;
        var y = (a1 * c2 - a2 * c1) / d;

        // check if intersection line is on both line segments
        if ((this.isInBetween(line1.startPoint.x, x, line1.endPoint.x) ||
                this.isInBetween(line1.startPoint.y, y, line1.endPoint.y)) &&
            (this.isInBetween(line2.startPoint.x, x, line2.endPoint.x) ||
                this.isInBetween(line2.startPoint.y, y, line2.endPoint.y))) {
            return true;
        }
        return false;
    }
};

UntangleLogic.isInBetween = function (a, b, c) {
    "use strict";

    // return false if b is almost equal to a or c
    // this is to eliminate some floating point when
    // tow value is equal to but different with 0.00000...0001
    if (Math.abs(a - b) < 0.000001 || Math.abs(b - c) < 0.000001) {
        return false;
    }

    //true when b is in between a and c
    return (a < b && b < c) || (c < b && b < a);
};

UntangleLogic.updateLineIntersection = function (lines) {
    "use strict";

    // checking lines intersection and bold those lines.
    $.each(lines, function (index) {
        for (var j = 0; j < index; j++) {
            var line1 = lines[index];
            var line2 = lines[j];

            // we check if two lines are intersected,
            // and bold the line if they are.
            if (UntangleLogic.isIntersect(line1, line2)) {
                UntangleLogic.graphics.lineIsBold(line1);
                UntangleLogic.graphics.lineIsBold(line2);
            }
        }
    });
};
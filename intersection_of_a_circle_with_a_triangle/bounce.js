function bounceOfBallFromBrick(x1, y1, x2, y2, x, y, r) {
    let result;
    let total = {};

    let x0 = x1 + (x2 - x1) / 2;
    let y0 = y1 + (y2 - y1) / 2;

    let topTriangle = {
        a: {x: x1, y: y1},
        b: {x: x2, y: y1},
        c: {x: x0, y: y0},
    };
    let rightTriangle = {
        a: {x: x0, y: y0},
        b: {x: x2, y: y1},
        c: {x: x2, y: y2},
    };
    let bottomTriangle = {
        a: {x: x1, y: y2},
        b: {x: x0, y: y0},
        c: {x: x2, y: y2},
    };
    let leftTriangle = {
        a: {x: x1, y: y2},
        b: {x: x1, y: y1},
        c: {x: x0, y: y0},
    };

    let points = {
        topTriangle: {x: x, y: y + y * (Math.sqrt(2) / 2)},//bottom
        rightTriangle: {x: x - x * (Math.sqrt(2) / 2), y: y,},//left
        bottomTriangle: {x: x, y: y - y * (Math.sqrt(2) / 2),},//top
        leftTriangle: {x: x + x * (Math.sqrt(2) / 2), y: y,},//right
    };

    total.topTriangle    = checkPointInTriangle(
        topTriangle.a.x, topTriangle.a.y, topTriangle.b.x, topTriangle.b.y, topTriangle.c.x, topTriangle.c.y,
        points.topTriangle.x, points.topTriangle.y, r);
    total.rightTriangle  = checkPointInTriangle(
        rightTriangle.a.x, rightTriangle.a.y, rightTriangle.b.x, rightTriangle.b.y, rightTriangle.c.x, rightTriangle.c.y,
        points.rightTriangle.x, points.rightTriangle.y, r);
    total.bottomTriangle = checkPointInTriangle(
        bottomTriangle.a.x, bottomTriangle.a.y, bottomTriangle.b.x, bottomTriangle.b.y, bottomTriangle.c.x, bottomTriangle.c.y,
        points.bottomTriangle.x, points.bottomTriangle.y, r);
    total.leftTriangle   = checkPointInTriangle(
        leftTriangle.a.x, leftTriangle.a.y, leftTriangle.b.x, leftTriangle.b.y, leftTriangle.c.x, leftTriangle.c.y,
        points.leftTriangle.x, points.leftTriangle.y, r);

    total.left_top = checkIntersectionOfDotWithCorner(x1, y1, x, y, r);
    total.top_right = checkIntersectionOfDotWithCorner(x2, y1, x, y, r);
    total.right_bottom = checkIntersectionOfDotWithCorner(x2, y2, x, y, r);
    total.bottom_left = checkIntersectionOfDotWithCorner(x1, y2, x, y, r);

    total.total = false;

    for (let key in total) {
        total.total = (total.total || total.key);
    }

    result = total;

    return result;
}

function checkPointInTriangle(xa, ya, xb, yb, xc, yc, x, y, r) {
    let result;
    let equation = [
        Math.round((xa - x) * (yb - ya) - (xb - xa) * (ya - y)),
        Math.round((xb - x) * (yc - yb) - (xc - xb) * (yb - y)),
        Math.round((xc - x) * (ya - yc) - (xa - xc) * (yc - y)),
    ];
    let total = {
        dotIn: ((equation[0] >= 0 && equation[1] >= 0 && equation[2] >= 0) || (equation[0] <= 0 && equation[1] <= 0 && equation[2] <= 0)),
        dotOn: (equation[0] === 0 && equation[3] === 0 && equation[3] === 0),
    };
    if (total.dotIn || total.dotOn) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

function checkIntersectionOfDotWithCorner(x_dot, y_dot, x, y, r) {
    let result;
    let infelicity = 1;
    let total = Math.sqrt((x_dot - x) * (x_dot - x) + (y_dot - y) * (y_dot - y));
    if (total <= (r + infelicity)) {
        result = true;
    } else {
        result = false;
    }
    return result;
}

let canvas = document.getElementById("canvas_kap");
let context = canvas.getContext("2d");



let brick = {x1: 410, y1: 170, x2: 490, y2: 190};
let circle = {x: 402, y: 180,  r: 12,};

let bounce = bounceOfBallFromBrick(brick.x1, brick.y1, brick.x2, brick.y2, circle.x, circle.y, circle.r);
console.log(bounce);

context.fill();
context.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
context.rect(brick.x1, brick.y1, brick.x2 - brick.x1, brick.y2 - brick.y1);
context.strokeStyle = '#000000';
context.stroke();
context.closePath();
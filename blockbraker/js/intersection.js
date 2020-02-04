/**
 *
 * @param brick
 * @param circle
 * @returns {'top', 'right', 'left', 'bottom', 'top_right', 'right_bottom', 'bottom_left', 'left_top'}
 * }
 */

function bounceTheBallFromTheBrick(
    brick = {
        a: {x: 0, y: 0},
        b: {x: 0, y: 0},
        c: {x: 0, y: 0},
        d: {x: 0, y: 0}
    },
    circle = {x: 0, y: 0, r: 0},
) {

    let result = [];

    let bounce = {
        from_top_edge: false,
        from_top_right_edge: false,
        from_right_edge: false,
        from_right_bottom_edge: false,
        from_bottom_edge: false,
        from_bottom_left_edge: false,
        from_left_edge: false,
        from_left_top_edge: false,
    };

    let xa = brick.a.x;
    let ya = brick.a.y;

    let xb = brick.b.x;
    let yb = brick.b.y;

    let xc = brick.c.x;
    let yc = brick.c.y;

    let xd = brick.d.x;
    let yd = brick.d.y;

    let xo = xa + (xb - xa) / 2;
    let yo = ya + (yd - ya) / 2;

    let xf = circle.x;
    let yf = circle.y;
    let r = circle.r;

    //divide the rectangle into triangles

    let topTriangle = {
        a: {x: xa, y: ya},
        b: {x: xb, y: yb},
        o: {x: xo, y: yo},
    };
    let rightTriangle = {
        b: {x: xb, y: yb},
        o: {x: xo, y: yo},
        c: {x: xc, y: yc},
    };
    let bottomTriangle = {
        d: {x: xd, y: yd},
        o: {x: xo, y: yo},
        c: {x: xc, y: yc},
    };
    let leftTriangle = {
        d: {x: xd, y: yd},
        a: {x: xa, y: ya},
        o: {x: xo, y: yo},
    };

    result['top'] = checkIntersectionOfDotWithTriangle({x: xf, y: yf - r}, bottomTriangle.d, bottomTriangle.o, bottomTriangle.c);
    result['right'] = checkIntersectionOfDotWithTriangle({x: xf + r, y: yf}, leftTriangle.d, leftTriangle.a, leftTriangle.o);
    result['bottom'] = checkIntersectionOfDotWithTriangle({x: xf, y: yf + r}, topTriangle.a, topTriangle.b, topTriangle.c);
    result['left'] = checkIntersectionOfDotWithTriangle({x: xf - r, y: yf}, rightTriangle.o, rightTriangle.b, rightTriangle.c);

    result['top_right'] = checkIntersectionOfDotWithCorner(circle, {x: xd, y: yd});
    result['right_bottom'] = checkIntersectionOfDotWithCorner(circle, {x: xa, y: ya});
    result['bottom_left'] = checkIntersectionOfDotWithCorner(circle, {x: xb, y: yb});
    result['left_top'] = checkIntersectionOfDotWithCorner(circle, {x: xc, y: yc});

    return result;

    /**
     * If all three values are of the same sign, then the point inside the triangle,
     if the value is zero, then the point lies on the side of the triangle
     Otherwise (if the values are different in sign), the point is outside the triangle.
     * @param dot
     * @param triangle
     * @returns {boolean}
     */
    function checkIntersectionOfDotWithTriangle(
        dot = {x: 0, y: 0},
        d = {x: 0, y: 0},
        o = {x: 0, y: 0},
        c = {x: 0, y: 0}
    ) {

        let result;
        let xf = dot.x;
        let yf = dot.y;

        let xd = d.x;
        let yd = d.y;

        let xo = o.x;
        let yo = o.y;

        let xc = c.x;
        let yc = c.y;

        let value_1 = Math.round((xd - xf) * (yo - yd) - (xo - xd) * (yd - yf));
        let value_2 = Math.round((xo - xf) * (yc - yo) - (xc - xo) * (yo - yf));
        let value_3 = Math.round((xc - xf) * (yd - yc) - (xd - xc) * (yc - yf));

        let count = {
            dotIn: ((value_1 >= 0 && value_2 >= 0 && value_3 >= 0) || (value_1 <= 0 && value_2 <= 0 && value_3 <= 0)),
            dotOn: (value_1 === 0 && value_2 === 0 && value_3 === 0),
        };

        if (count.dotIn || count.dotOn) {
            result = true;
        } else {
            result = false;
        }

        return result;
    }

    function checkIntersectionOfDotWithCorner(ball = {x: 0, y: 0, r: 0}, corner = {x: 0, y: 0}) {
        let result;

        let infelicity = 1;
        let xf = ball.x;
        let yf = ball.y;
        let r = ball.r;
        let x = corner.x;
        let y = corner.y;

        result = Math.sqrt((x - xf)*(x - xf)  + (y - yf)*(y - yf)) <= (r + infelicity);

        return result;
    }
}
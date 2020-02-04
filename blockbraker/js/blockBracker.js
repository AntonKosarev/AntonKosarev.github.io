let canvas = document.getElementById("canvas_kap");
let context = canvas.getContext("2d");

let blockBreaker = {

    init: function () {
        this.wall.collection = this.wall.build();
        this.animate();
        document.addEventListener("mousedown", this.eventCallbacks.mouseDownHandler, false);
        document.addEventListener("mousemove", this.eventCallbacks.mouseMoveHandler, false);
        document.addEventListener("keydown", this.eventCallbacks.keyDownHandler, false);
        document.addEventListener("keyup", this.eventCallbacks.keyUpHandler, false);
    },

    isPaused: false,
    isStopped: false,
    streamId: null,

    paddle: {
        color: "#0095DD",
        height: 10,
        width: 150,
        position: {
            x: null,
        },
        speed: 0,
        control: {
            rightPressed: false,
            leftPressed: false,
            deltaPosition: 7,
        },
        drawPaddle: function () {
            if (this.position.x === null) {
                this.position.x = canvas.width - this.width / 2;
            }
            context.beginPath();
            context.rect(this.position.x, canvas.height - this.height, this.width, this.height);
            context.fillStyle = this.color;
            context.fill();
            context.closePath();
        },
        animatePaddle: function () {
            if (this.control.rightPressed && this.position.x < canvas.width - this.width) {
                //set speed of paddle
                this.position.x += blockBreaker.paddle.control.deltaPosition;
            } else if (this.control.leftPressed && this.position.x > 0) {
                //set speed of paddle
                blockBreaker.paddle.speed = -blockBreaker.paddle.control.deltaPosition;
                this.position.x -= this.control.deltaPosition;
            }
        },
    },

    ball: {
        color: "#0095DD",
        color_rect: "#393b42",
        radius: 12,
        position: {
            x: canvas.width / 2,
            y: canvas.height - 30,
            dx: 4,
            dy: -4,
            isPastAPaddle: false,
        },
        spin: 0,
        corner: 0,
        drawBall: function () {
            context.beginPath();
            context.arc(this.position.x, this.position.y, this.radius, this.corner, Math.PI + this.corner);
            context.fillStyle = this.color;
            context.fill();
            context.arc(this.position.x, this.position.y, this.radius, Math.PI + this.corner, Math.PI * 2 + this.corner);
            context.strokeStyle = this.color_rect;
            context.stroke();
            context.closePath();
        },
        animateBall: function () {
            // fix position status
            this.position.isPastAPaddle = false;
            //rebound from the bottom
            if ((this.position.y + this.radius) >= canvas.height - blockBreaker.paddle.height && (this.position.y + this.radius) < canvas.height) {
                // if ball rebound from the paddle
                if ((this.position.x + this.radius) >= blockBreaker.paddle.position.x && (this.position.x - this.radius) < (blockBreaker.paddle.position.x + blockBreaker.paddle.width)) {
                    blockBreaker.ball.spin = blockBreaker.ball.spin + blockBreaker.eventCallbacks.paddleSpeed.speed;
                    if (blockBreaker.ball.spin > 2) {
                        blockBreaker.ball.spin = 2;
                    }
                    if (blockBreaker.ball.spin < -2) {
                        blockBreaker.ball.spin = -2;
                    }
                    this.position.dy = -this.position.dy;
                    // }
                }
            }
            // if the ball flies past a paddle
            if (this.position.y + this.radius >= canvas.height) {
                this.position.isPastAPaddle = true;
            } else {
                this.position.isPastAPaddle = false;
            }
            //rebound from the top wall
            if (this.position.y + this.position.dy < this.radius) {
                this.position.dy = -this.position.dy;
            }
            //rebound from the left and right walls
            if ((this.position.x + this.radius) >= (canvas.width)) {
                if (this.position.dx > 0) {
                    this.position.dx = -this.position.dx;
                }
            } else if ((this.position.x - this.radius) <= 0) {
                if (this.position.dx < 0) {
                    this.position.dx = -this.position.dx;
                }
            }
            // rebound from the bricks and change broken value of the brick
            for (let column = 0; column < blockBreaker.wall.columns; column++) {
                for (let row = 0; row < blockBreaker.wall.rows; row++) {
                    let brick = blockBreaker.wall.collection[column][row];

                    function checkCatch(x1, y1, x2, y2, x, y, r) {
                        let top = true, bottom = true, left = true, right = true;
                        let rebound = {
                            catched: true,
                            to: {dx: 1, dy: -1,},
                            from: null,
                        };
                        if (y + r < y1) {  // if the ball is on top
                            top = false;
                            rebound.to.dy = -1;
                        }
                        if (y - r > y2) {  //  if the ball is on bottom
                            rebound.to.dy = -1;
                            bottom = false;
                        }
                        if (x + r < x1) {  //  if the ball is on left
                            left = false;
                            rebound.to.dx = -1;
                        }
                        if (x - r > x2) { //  if the ball is on right
                            right = false;
                            rebound.to.dx = -1;
                        }
                        rebound.catched = (top && bottom && left && right);
                        return rebound;
                    }

                    let ballCatchedInBrick = checkCatch(
                        brick.position.x,
                        brick.position.y,
                        brick.position.x + brick.width,
                        brick.position.y + brick.height,
                        this.position.x,
                        this.position.y,
                        this.radius
                    );


                    // check intersection.js
                    let lr;
                    if (brick.broken === false) {
                        let rectangle = {
                            a: {x: brick.position.brick.a.x, y: brick.position.brick.a.y},
                            b: {x: brick.position.brick.b.x, y: brick.position.brick.b.y},
                            c: {x: brick.position.brick.c.x, y: brick.position.brick.c.y},
                            d: {x: brick.position.brick.d.x, y: brick.position.brick.d.y}
                        };
                        let circle = {x: this.position.x, y: this.position.y, r: this.radius};
                        let collision = bounceTheBallFromTheBrick(rectangle, circle);

                        if (collision.left || collision.right) {
                            lr = true;
                        }
                    }

                    if (ballCatchedInBrick.catched && brick.broken === false) {
                        if (lr) {
                            this.position.dx = -this.position.dx;
                            this.position.dy = this.position.dy;
                            lr = false;
                        } else {
                            this.position.dx = ballCatchedInBrick.to.dx * this.position.dx;
                            this.position.dy = ballCatchedInBrick.to.dy * this.position.dy;
                        }
                        //parameter for bang
                        blockBreaker.wall.collection[column][row].broken = 'catch';
                    }
                }
            }


            // change ball position every request
            this.position.x = this.position.x + this.position.dx - 0.1 * blockBreaker.ball.spin;
            this.position.y = this.position.y + this.position.dy;
            this.corner = this.corner - blockBreaker.ball.spin * 0.05;
        },
    },

    brick: {
        constract: function () {
            this.color = "#0095DD";
            this.width = 80;
            this.height = 20;
            this.position = {
                x: 0,//define in draw
                y: 0,//define in draw
                brick: {
                    a: {x: 0, y: 0},
                    b: {x: 0, y: 0},
                    c: {x: 0, y: 0},
                    d: {x: 0, y: 0},
                },
            };
            this.broken = false;
            this.bang = {
                animation: null,
                imageLink: 'images/bang.png',
                domElement: document.getElementById("bang"),
                position: {
                    onImage: {
                        x: 0,
                        y: 0,
                        width: 130,
                        height: 130,

                    },
                    onCanvas: {
                        x: 0,//define in draw
                        y: 0,//define in draw
                        width: 60,
                        height: 60,
                    },
                },
                happened: false,
                animateBang: function () {
                    let bang = this;
                    this.animation = setInterval(function () {
                        // while (!bang.happened) {
                        bang.position.onImage.x += 130;
                        if (bang.position.onImage.x === 650) {
                            bang.position.onImage.x = 0;
                            bang.position.onImage.y += 130;
                        }
                        if (bang.position.onImage.y === 520 && bang.position.onImage.x === 520) {
                            bang.position.onImage.x = 0;
                            bang.position.onImage.y = 0;
                            bang.happened = true;
                        }
                        // }
                    }, 35);
                    setTimeout(function () {
                        clearInterval(this.animation);
                        return;
                    }, 875);
                },
            };
            this.drawBrick = function () {
                // if isn`t broken then draw brick
                if (this.broken === false) {
                    context.beginPath();
                    context.rect(this.position.x, this.position.y, this.width, this.height);
                    context.fillStyle = this.color;
                    context.fill();
                    context.closePath();
                    // if ball catch to brick then start bang animate
                }
                if (this.broken === 'catch') {
                    this.broken = 'bang';
                    this.bang.animateBang();
                    // draw bang with starting setinterval change image position
                }
                if (this.broken === 'bang') {
                    if (this.bang.happened) {
                        this.broken = true;
                        blockBreaker.score.add();
                    } else {
                        context.drawImage(
                            this.bang.domElement,
                            this.bang.position.onImage.x,
                            this.bang.position.onImage.y,
                            this.bang.position.onImage.width,
                            this.bang.position.onImage.height,
                            this.bang.position.onCanvas.x,
                            this.bang.position.onCanvas.y,
                            this.bang.position.onCanvas.width,
                            this.bang.position.onCanvas.height,
                        );
                    }
                }
            };
        },
        color: '#0095DD',
        width: 80,
        height: 20,
        position: {},
        broken: false,
        bang: {},
        drawBrick: function () {
        },
    },

    wall: {
        topPadding: 50,
        margin: 20,
        rows: 4,
        columns: 8,
        build: function () {
            // this.columns = Math.floor(canvas.width/(blockBreaker.brick.width + 2*this.margin));
            let collection = [];
            let x = 0;
            let dx = canvas.width / this.columns;
            let y = this.topPadding;
            let dy = blockBreaker.brick.height + this.margin;
            for (let column = 0; column < this.columns; column++) {
                collection[column] = [];
                for (let row = 0; row < this.rows; row++) {
                    collection[column][row] = new blockBreaker.brick.constract();
                    collection[column][row].position.x = this.margin / 2 + column * dx;
                    collection[column][row].position.y = y + row * dy;
                    collection[column][row].bang.position.onCanvas.x = collection[column][row].position.x + 8;
                    collection[column][row].bang.position.onCanvas.y = collection[column][row].position.y - 24;

                    collection[column][row].position.brick.a.x = collection[column][row].position.x;
                    collection[column][row].position.brick.a.y = collection[column][row].position.y;

                    collection[column][row].position.brick.b.x = collection[column][row].position.x + collection[column][row].width;
                    collection[column][row].position.brick.b.y = collection[column][row].position.y;

                    collection[column][row].position.brick.c.x = collection[column][row].position.x + collection[column][row].width;
                    collection[column][row].position.brick.c.y = collection[column][row].position.y + collection[column][row].height;

                    collection[column][row].position.brick.d.x = collection[column][row].position.x;
                    collection[column][row].position.brick.d.y = collection[column][row].position.y + collection[column][row].height;
                }
            }
            return collection;
        },
        collection: null,
    },

    score: {
        color: "#0095DD",
        font: "20px Arial",
        value: 0,
        add: function () {
            this.value += 1;
        },
        drawScore: function () {
            context.fillStyle = this.color;
            context.font = this.font;
            context.fillText("Score: " + this.value, 10, 30);
        },
    },

    lives: {
        color: "#0095DD",
        font: "20px Arial",
        width: 20,
        height: 20,
        getDiameter: function () {
            return Math.min(this.width, this.height);
        },
        ratio: {
            x: canvas.width - 60,
            y: 13,
        },
        value: 3,
        add: function () {
            this.value -= 1;
        },
        drawLives: function () {
            let d = this.getDiameter();
            let kx = this.ratio.x;
            let ky = this.ratio.y;
            context.beginPath();
            context.moveTo(kx, ky + d / 4);
            context.quadraticCurveTo(kx, ky, kx + d / 4, ky);
            context.quadraticCurveTo(kx + d / 2, ky, kx + d / 2, ky + d / 4);
            context.quadraticCurveTo(kx + d / 2, ky, kx + d * 3 / 4, ky);
            context.quadraticCurveTo(kx + d, ky, kx + d, ky + d / 4);
            context.quadraticCurveTo(kx + d, ky + d / 2, kx + d * 3 / 4, ky + d * 3 / 4);
            context.lineTo(kx + d / 2, ky + d);
            context.lineTo(kx + d / 4, ky + d * 3 / 4);
            context.quadraticCurveTo(kx, ky + d / 2, kx, ky + d / 4);
            context.fillStyle = this.color;
            context.fill();

            context.font = this.font;
            context.fillStyle = this.color;
            context.fillText(this.value, canvas.width - 30, 30);
            context.closePath();
        },
    },

    eventCallbacks: {
        mouseDownHandler: function (event) {
            if (event.target.id === 'canvas_kap') {
                blockBreaker.isPaused = !blockBreaker.isPaused;
                if (!blockBreaker.isPaused) {
                    blockBreaker.animate();
                }
            }
        },

        paddleSpeed: {
            timeStamp_1: 0,
            timeStamp_2: 0,
            offsetX_1: 0,
            offsetX_2: 0,
            speed: 0,
            flag: 1,
        },

        mouseMoveHandler: function (event) {
            if (event.target.id === 'canvas_kap') {
                if (event.offsetX >= (canvas.width - blockBreaker.paddle.width / 2)) {
                    blockBreaker.paddle.position.x = canvas.width - blockBreaker.paddle.width;
                } else if (event.offsetX <= blockBreaker.paddle.width / 2) {
                    blockBreaker.paddle.position.x = 0;
                } else {
                    blockBreaker.paddle.position.x = event.offsetX - blockBreaker.paddle.width / 2;
                }
                if (blockBreaker.eventCallbacks.paddleSpeed.flag === 2) {
                    blockBreaker.eventCallbacks.paddleSpeed.flag = 3;
                } else if (blockBreaker.eventCallbacks.paddleSpeed.flag === 1) {
                    blockBreaker.eventCallbacks.paddleSpeed.offsetX_1 = event.offsetX;
                    blockBreaker.eventCallbacks.paddleSpeed.timeStamp_1 = event.timeStamp;
                    blockBreaker.eventCallbacks.paddleSpeed.flag = 2;
                }
                if (blockBreaker.eventCallbacks.paddleSpeed.flag === 3) {
                    blockBreaker.eventCallbacks.paddleSpeed.offsetX_2 = event.offsetX;
                    blockBreaker.eventCallbacks.paddleSpeed.timeStamp_2 = event.timeStamp;
                    blockBreaker.eventCallbacks.paddleSpeed.speed = (blockBreaker.eventCallbacks.paddleSpeed.offsetX_2 - blockBreaker.eventCallbacks.paddleSpeed.offsetX_1) / (blockBreaker.eventCallbacks.paddleSpeed.timeStamp_2 - blockBreaker.eventCallbacks.paddleSpeed.timeStamp_1);
                    blockBreaker.eventCallbacks.paddleSpeed.flag = 1;
                }
            }
            if (event.offsetX > canvas.width || event.offsetX < 0 || event.offsetY > canvas.height || event.offsetY < 0) {
                blockBreaker.isPaused = true;
            }
        },

        keyDownHandler: function (event) {
            if (event.key === 'ArrowRight') {
                blockBreaker.paddle.control.rightPressed = true;
            } else if (event.key === 'ArrowLeft') {
                blockBreaker.paddle.control.leftPressed = true;
            }

            if (blockBreaker.eventCallbacks.paddleSpeed.flag === 2) {
                blockBreaker.eventCallbacks.paddleSpeed.flag = 3;
            } else if (blockBreaker.eventCallbacks.paddleSpeed.flag === 1) {
                blockBreaker.eventCallbacks.paddleSpeed.offsetX_1 = blockBreaker.paddle.position.x;
                blockBreaker.eventCallbacks.paddleSpeed.timeStamp_1 = event.timeStamp;
                blockBreaker.eventCallbacks.paddleSpeed.flag = 2;
            }
            if (blockBreaker.eventCallbacks.paddleSpeed.flag === 3) {
                blockBreaker.eventCallbacks.paddleSpeed.offsetX_2 = blockBreaker.paddle.position.x;
                blockBreaker.eventCallbacks.paddleSpeed.timeStamp_2 = event.timeStamp;
                blockBreaker.eventCallbacks.paddleSpeed.speed = (blockBreaker.eventCallbacks.paddleSpeed.offsetX_2 - blockBreaker.eventCallbacks.paddleSpeed.offsetX_1) / (blockBreaker.eventCallbacks.paddleSpeed.timeStamp_2 - blockBreaker.eventCallbacks.paddleSpeed.timeStamp_1);
                blockBreaker.eventCallbacks.paddleSpeed.flag = 1;
            }

        },

        keyUpHandler: function (event) {
            if (event.key === 'ArrowRight') {
                blockBreaker.paddle.control.rightPressed = false;
            } else if (event.key === 'ArrowLeft') {
                blockBreaker.paddle.control.leftPressed = false;
            }
        },
    },

    animate: function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        blockBreaker.ball.drawBall();
        blockBreaker.paddle.drawPaddle();
        for (let column = 0; column < blockBreaker.wall.columns; column++) {
            for (let row = 0; row < blockBreaker.wall.rows; row++) {
                blockBreaker.wall.collection[column][row].drawBrick();

            }
        }
        blockBreaker.score.drawScore();
        blockBreaker.lives.drawLives();
        blockBreaker.ball.animateBall();
        blockBreaker.paddle.animatePaddle();

        // if ball fell down
        if (blockBreaker.ball.position.isPastAPaddle) {
            blockBreaker.lives.add();
            if (blockBreaker.lives.value <= -1) {
                blockBreaker.isStopped = true;
                cancelAnimationFrame(blockBreaker.streamId);
                alert("GAME OVER");
                document.location.reload();
            } else {
                blockBreaker.ball.position.x = canvas.width / 2;
                blockBreaker.ball.position.y = canvas.height - 50;
                blockBreaker.ball.position.dy = -blockBreaker.ball.position.dy;
                blockBreaker.paddle.position.x = (canvas.width - blockBreaker.paddle.width) / 2;
                cancelAnimationFrame(blockBreaker.streamId);
                alert("You lost one life!");
            }
        }

        // all bricks brocken
        if (blockBreaker.score.value === blockBreaker.wall.rows * blockBreaker.wall.columns) {
            blockBreaker.isStopped = true;
            cancelAnimationFrame(blockBreaker.streamId);
            document.removeEventListener('mousedown', blockBreaker.eventCallbacks.mouseDownHandler);
            alert("YOU WIN, CONGRATULATIONS!");
            // document.location.reload();
        }
        if (!blockBreaker.isPaused) {
            if (!blockBreaker.isStopped) {
                blockBreaker.isStopped = false;
                blockBreaker.streamId = requestAnimationFrame(blockBreaker.animate);
            } else {
                blockBreaker.isStopped = false;
                cancelAnimationFrame(blockBreaker.streamId);
            }
        }
    }
};
blockBreaker.init();
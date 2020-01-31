let canvas = document.getElementById("canvas_kap");
let context = canvas.getContext("2d");

let blockBreaker = {

    init: function () {
        this.bricks.getCollection();
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
            dx: 3,
            dy: -2,
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
            if (this.position.y + this.position.dy > (canvas.height - this.radius - blockBreaker.paddle.height)) {
                // if ball rebound from the paddle
                if (this.position.x > (blockBreaker.paddle.position.x - this.radius) && this.position.x < (blockBreaker.paddle.position.x + blockBreaker.paddle.width + this.radius)) {
                    blockBreaker.ball.spin = blockBreaker.ball.spin + blockBreaker.eventCallbacks.paddleSpeed.speed;
                    if (blockBreaker.ball.spin > 3) {
                        blockBreaker.ball.spin = 3;
                    }
                    if (blockBreaker.ball.spin < -4) {
                        blockBreaker.ball.spin = -4;
                    }
                    this.position.dy = -this.position.dy;
                }
            }
            // if the ball flies past a paddle
            if (this.position.y + this.position.dy > canvas.height) {
                this.position.isPastAPaddle = true;
            }
            //rebound from the top wall
            if (this.position.y + this.position.dy < this.radius) {
                this.position.dy = -this.position.dy;
            }
            //rebound from the left and right walls
            if ((this.position.x) > (canvas.width - this.radius) || (this.position.x) < this.radius) {
                this.position.dx = -this.position.dx;
            }
            // change ball position every request
            this.position.x += this.position.dx + this.position.dx * 0.1 * blockBreaker.ball.spin;
            this.position.y += this.position.dy;
            this.corner = this.corner - blockBreaker.ball.spin * 0.1;

        },
    },

    brick: {
        bang: {
            imageLink: 'images/bang.png',
            domElement: document.getElementById("bang"),
            position: {
                imageX: 0,
                imageY: 0,
                imageWidth: 130,
                imageHeight: 130,
                canvasX: null,
                canvasY: null,
                onCanvasWidth: 60,
                onCanvasHeight: 60,
            },
        },
    },

    bricks: {
        // ratio for blocks padding
        ratio: 0.90,
        rows: 4,
        columns: 8,
        getCount: function () {
            return canvas.width / this.columns;
        },
        color: "#0095DD",
        height: 20,
        collection: [],
        bangTime: null,
        bang: {
            imageLink: 'images/bang.png',
            domElement: document.getElementById("bang"),
            position: {
                imageX: 0,
                imageY: 0,
                imageWidth: 130,
                imageHeight: 130,
                canvasX: null,
                canvasY: null,
                onCanvasWidth: 60,
                onCanvasHeight: 60,
            },
        },
        getWidth: function () {
            return this.getCount() * this.ratio;
        },
        getPadding: function () {
            return this.getCount() * (1 - this.ratio);
        },
        getOffsets: function () {
            let top = 50;
            let left = this.getCount() * (1 - this.ratio);
            return {top: top, left: left};
        },
        getCollection: function () {
            for (let column = 0; column < this.columns; column++) {
                this.collection[column] = [];
                for (let row = 0; row < this.rows; row++) {
                    this.collection[column][row] = {};
                    this.collection[column][row].x = 0;
                    this.collection[column][row].y = 0;
                    this.collection[column][row].broken = false;
                }
            }
        },
        drawBricks: function () {
            for (let column = 0; column < this.columns; column++) {
                for (let row = 0; row < this.rows; row++) {
                    let brickX = (column * (this.getWidth() + this.getPadding())) + this.getOffsets().left;
                    let brickY = (row * (this.height + this.getPadding())) + this.getOffsets().top;
                    this.collection[column][row].x = brickX;
                    this.collection[column][row].y = brickY;
                    this.collection[column][row].bang = this.bang;
                    this.collection[column][row].bang.flag = 0;
                    this.collection[column][row].bang.animateBang = function () {
                        let brickOne = this;
                        // let start = Date.now(); // запомнить время начала
                        let timer = setInterval(function () {
                            console.log(brickOne);
                            // сколько времени прошло с начала анимации?
                            // отрисовать анимацию на момент timePassed, прошедший с начала анимации
                            console.log('cadr(' + timer + '): [', blockBreaker.bricks.collection[column][row].bang.position.imageX + ', '
                                + blockBreaker.bricks.collection[column][row].bang.position.imageY + '], flag: ' +  blockBreaker.bricks.collection[column][row].bang.flag);
                            brickOne.position.imageX = brickOne.position.imageX + 130;
                            brickOne.flag++;
                            if (brickOne.position.imageX >= 649) {
                                brickOne.position.imageX = 0;
                                brickOne.position.imageY = brickOne.position.imageY + 130;
                            }
                            if (brickOne.position.imageY > 520) {
                                brickOne.position.imageX = 0;
                                brickOne.position.imageY = 0;
                            }

                        }, 50);
                        setTimeout(function () {
                            clearInterval(timer); // закончить анимацию через 2 секунды
                            blockBreaker.bricks.collection[column][row].broken = true;
                            brickOne.position.imageX = 0;
                            brickOne.position.imageY = 0;
                            return;
                        }, 1250);
                    };

                    let domElement = this.collection[column][row].bang.domElement;
                    // position on img
                    let sx = this.collection[column][row].bang.position.imageX;
                    let sy = this.collection[column][row].bang.position.imageY;
                    // size on img
                    let sw = 130;
                    let sh = 130;
                    //position on canvas
                    let dx = this.collection[column][row].x + 8;
                    let dy = this.collection[column][row].y - 24;
                    // size on canvas
                    let dw = 60;
                    let dh = 60;

                    if (!this.collection[column][row].broken) {
                        context.beginPath();
                        context.rect(brickX, brickY, this.getWidth(), this.height);
                        context.fillStyle = this.color;
                        context.fill();
                        context.closePath();
                    } else if (this.collection[column][row].broken === 'bum') {
                        context.drawImage(domElement, sx, sy, sw, sh, dx, dy, dw, dh,);
                        this.collection[column][row].bang.animateBang();
                        this.collection[column][row].broken = 'animate'
                    } else if (this.collection[column][row].broken === 'animate') {
                        context.drawImage(domElement, sx, sy, sw, sh, dx, dy, dw, dh,);
                    }
                }
            }
        },
        animateBricks: function () {
            for (let column = 0; column < this.columns; column++) {
                for (let row = 0; row < this.rows; row++) {
                    let b = this.collection[column][row];
                    let condition = [
                        blockBreaker.ball.position.x > b.x,
                        blockBreaker.ball.position.x < b.x + this.getWidth(),
                        blockBreaker.ball.position.y > (b.y - blockBreaker.ball.radius),
                        blockBreaker.ball.position.y < b.y + this.height + blockBreaker.ball.radius,
                        !this.collection[column][row].broken,
                    ];
                    if (condition[0] && condition[1] && condition[2] && condition[3] && condition[4]) {
                        blockBreaker.ball.position.dy = -blockBreaker.ball.position.dy;
                        //parameter for bang
                        this.collection[column][row].broken = 'bum';
                        console.log(this.collection[column][row]);
                        blockBreaker.score.add();
                    }
                }
            }
        },
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
            if (event.offsetX > blockBreaker.pauseBatton.position.x && event.offsetX < blockBreaker.pauseBatton.position.x + blockBreaker.pauseBatton.width) {
                if (event.offsetY > blockBreaker.pauseBatton.position.y && event.offsetY < blockBreaker.pauseBatton.position.y + blockBreaker.pauseBatton.height) {
                    blockBreaker.isPaused = !blockBreaker.isPaused;
                    if (!blockBreaker.isPaused) {
                        blockBreaker.animate();
                    }
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

    pauseBatton: {
        isPaused: false,
        color: "#0095DD",
        font: "20px Arial",
        height: 30,
        width: 80,
        position: {
            x: 100,
            y: 5,
        },
        drawPause: function () {
            context.beginPath();
            context.rect(this.position.x, this.position.y, this.width, this.height);
            context.strokeStyle = this.color;
            context.stroke();
            context.closePath();

            context.fillStyle = this.color;
            context.font = this.font;
            context.fillText("PAUSE", this.position.x + 7, this.position.y + 22);
        },
        Start: function () {
            if (this.isPaused) {
                this.Update();
            }
            requestAnimationFrame(blockBreaker.pause.Start);
        }

    },

    draw: function () {
        blockBreaker.ball.drawBall();
        blockBreaker.paddle.drawPaddle();
        blockBreaker.bricks.drawBricks();

        blockBreaker.score.drawScore();
        blockBreaker.lives.drawLives();
        blockBreaker.pauseBatton.drawPause();
    },

    move: function () {
        blockBreaker.ball.animateBall();
        blockBreaker.paddle.animatePaddle();
        blockBreaker.bricks.animateBricks();
    },

    animate: function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        blockBreaker.draw();
        blockBreaker.move();

        if (blockBreaker.ball.position.isPastAPaddle) {
            blockBreaker.lives.add();
            if (blockBreaker.lives.value <= -1) {
                blockBreaker.isStopped = true;
                alert("GAME OVER");
            } else {
                blockBreaker.ball.position.x = canvas.width / 2;
                blockBreaker.ball.position.y = canvas.height - 50;
                blockBreaker.ball.position.dy = -blockBreaker.ball.position.dy;
                blockBreaker.paddle.position.x = (canvas.width - blockBreaker.paddle.width) / 2;
                alert("You lost one life!");
            }
        }

        if (blockBreaker.score.value === blockBreaker.bricks.rows * blockBreaker.bricks.columns) {
            blockBreaker.isStopped = true;
            alert("YOU WIN, CONGRATULATIONS!");
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
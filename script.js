var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var road1 = new Image();
var road2 = new Image();
var car1 = new Image();
var car2 = new Image();
var car3 = new Image();
var auto = new Image();


road1.src = "img/road.jpg";
road2.src = "img/road.jpg";
car1.src = "img/car1.png";
car2.src = "img/car2.png";
car3.src = "img/car3.png";
auto.src = "img/auto.png";


road1.onload = function () {
    road2.y = road1.y + road1.height;
};

//Создание других машинок
var cars = [
    {
        x: randomInteger(0, 400),
        y: randomInteger(0, 300)
    },
    {
        x: randomInteger(0, 400),
        y: randomInteger(0, 300)
    },
    {
        x: randomInteger(0, 400),
        y: randomInteger(0, 300)
    }
];

var carImage = [car1, car2, car3];


var x = 0;
var y = 0;
//Position of auto
var xPos = 200;
var yPos = 500;
var startSpeed = 0;
//Move auto
document.addEventListener("keydown", moveAuto);
document.addEventListener("keyup", stopAuto);

function moveAuto(e) {
    switch (e.keyCode) {
        case 37: //left
            xPos -= 20;
            break;
        case 38: //top
            startSpeed = 8;
            break;
        case 39: //right
            xPos += 20;
            break;
        case 40: //bottom
            // yPos += 20;
            startSpeed = 0;
            break;
    }
}

function stopAuto(e) {
    if (e.keyCode === 38) {
        startSpeed = 0;
    }
}

function carsDraw() {
    console.log(cars);
    for (var i = 0; i < cars.length; i++) {
        for (var j = 0; j < carImage.length; j++) {
            ctx.drawImage(carImage[i], cars[i].x, cars[i].y, 30, 50);
        }
        // cars[i].y ++;
    }
}


//Draw canvas, cars and road
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(road1, x, y);
    ctx.drawImage(road2, x, road1.y - (road1.height - y));
    carsDraw();
    y += startSpeed;
    ctx.drawImage(auto, xPos, yPos, 30, 50);
    if (road1.height - y < 0) {
        y = road1.y - (road1.height - y);

    }
    requestAnimationFrame(draw);
};

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};


auto.onload = draw;
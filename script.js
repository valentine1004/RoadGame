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

function startGame(){
    alert("To start game press OK and run button!");
    draw();
}
var time = 60;
var total = 0;
var x = 0;
var y = 0;
//Position of auto
var xPos = 200;
var yPos = 500;
var startSpeed = 0;
//Move auto
document.addEventListener("keydown", moveAuto);
document.addEventListener("keyup", stopAuto);
let speed = document.getElementById("speed");
document.getElementById("total").childNodes[0].nodeValue=`Total: ${yPos - 500}`;

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
    for (var i = 0; i < cars.length; i++) {
        for (var j = 0; j < carImage.length; j++) {
            ctx.drawImage(carImage[i], cars[i].x, cars[i].y, 30, 50);
        }
        cars[i].y++;
    }
}

function reverseCar(){
    for (var i = 0; i < cars.length; i++) {
        for (var j = 0; j < carImage.length; j++) {
            cars[i].y--;
        }
    }
}

function deleteCar(){
    for (var i = 0; i < cars.length; i++) {
        for (var j = 0; j < carImage.length; j++) {
            if((cars[i].y === (yPos - 50) && ((cars[i].x > (xPos - 15)) && (cars[i].x < (xPos + 45))))){
                startSpeed = 0;
            }
        }
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
        carImage.push(carImage[randomInteger(0,3)]);
        cars.push({
            x: randomInteger(0, 500),
            y: -50
        })
    }
    if(xPos === 0){
        xPos = 20;
        startSpeed = 0;
    }
    if(xPos === 580){
        xPos = 50;
        startSpeed = 0;
    }
    if(startSpeed === 0){
        reverseCar();
    }
    if(y === 600){
        total += 600;
    }
    deleteCar();
    document.getElementById("total").childNodes[0].nodeValue=`Total: ${total}`;
    document.getElementById("speed").childNodes[0].nodeValue=`Cruising speed: ${startSpeed * 12} km/h`;
    document.getElementById("time").childNodes[0].nodeValue=`Time: ${time}`;
    requestAnimationFrame(draw);
};

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

setInterval(() => {
    time = time - 1;
    if(time === 0){
        alert(`Your total result: ${total}`);
        window.location.reload();
    }
},1000)

// window.onload = startGame; 

auto.onload = draw;